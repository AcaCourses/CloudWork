'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { EMAILS, Email } from '@/lib/data';

export type ClientId = 'lucia' | 'diego' | 'ana' | 'roberto' | 'carla';

type ViewMode = 'login' | 'inbox' | 'reading';

// ── LocalStorage keys ────────────────────────────────────────────────────────
const LS_KEY_USERNAME        = 'cw_userName';
const LS_KEY_LOGGED_IN       = 'cw_loggedIn';
const LS_KEY_VISIBLE_EMAILS  = 'cw_visibleEmailIds';
const LS_KEY_READ_EMAILS     = 'cw_readEmailIds';

function lsGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try { return localStorage.getItem(key); } catch { return null; }
}
function lsSet(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}

interface AppState {
  userName: string;
  currentView: ViewMode;
  visibleEmailIds: string[];
  selectedEmail: Email | null;
  readEmailIds: Set<string>;
  allEmailsLoaded: boolean;
  latestEmailId: string | null;
  setUserName: (name: string) => void;
  login: () => void;
  selectEmail: (email: Email) => void;
  goBackToInbox: () => void;
  dismissNotification: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // ── Initialise from localStorage on first render ───────────────────────────
  const [userName, setUserNameState] = useState<string>(() => lsGet(LS_KEY_USERNAME) ?? '');
  const [loggedIn, setLoggedIn]      = useState<boolean>(() => lsGet(LS_KEY_LOGGED_IN) === 'true');
  const [currentView, setCurrentView] = useState<ViewMode>(() =>
    lsGet(LS_KEY_LOGGED_IN) === 'true' ? 'inbox' : 'login'
  );
  const [visibleEmailIds, setVisibleEmailIds] = useState<string[]>(() => {
    const raw = lsGet(LS_KEY_VISIBLE_EMAILS);
    try { return raw ? JSON.parse(raw) : []; } catch { return []; }
  });
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [readEmailIds, setReadEmailIds] = useState<Set<string>>(() => {
    const raw = lsGet(LS_KEY_READ_EMAILS);
    try { return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>(); } catch { return new Set<string>(); }
  });
  const [allEmailsLoaded, setAllEmailsLoaded] = useState(false);
  const [latestEmailId, setLatestEmailId] = useState<string | null>(null);
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Persist changes to localStorage ───────────────────────────────────────
  const setUserName = useCallback((name: string) => {
    setUserNameState(name);
    lsSet(LS_KEY_USERNAME, name);
  }, []);

  useEffect(() => { lsSet(LS_KEY_LOGGED_IN, loggedIn ? 'true' : 'false'); }, [loggedIn]);
  useEffect(() => { lsSet(LS_KEY_VISIBLE_EMAILS, JSON.stringify(visibleEmailIds)); }, [visibleEmailIds]);
  useEffect(() => { lsSet(LS_KEY_READ_EMAILS, JSON.stringify([...readEmailIds])); }, [readEmailIds]);

  const login = useCallback(() => {
    setCurrentView('inbox');
    setLoggedIn(true);
  }, []);

  // ── Progressive email arrival: next email only after current is read ──
  useEffect(() => {
    if (!loggedIn) return;

    // First email: arrive 1.5s after login
    if (visibleEmailIds.length === 0) {
      const timer = setTimeout(() => {
        const firstEmail = EMAILS[0];
        setVisibleEmailIds([firstEmail.id]);
        setLatestEmailId(firstEmail.id);
        setTimeout(() => {
          setLatestEmailId(prev => prev === firstEmail.id ? null : prev);
        }, 4500);
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Subsequent emails: only arrive after the last visible email is read
    const lastVisibleId = visibleEmailIds[visibleEmailIds.length - 1];
    const nextIndex = visibleEmailIds.length;

    if (!readEmailIds.has(lastVisibleId) || nextIndex >= EMAILS.length) {
      // Not read yet or all emails loaded — do nothing
      if (nextIndex >= EMAILS.length && !allEmailsLoaded) {
        setAllEmailsLoaded(true);
      }
      return;
    }

    // Clear any existing pending timer
    if (pendingTimerRef.current) {
      clearTimeout(pendingTimerRef.current);
    }

    // Schedule next email with random delay (5-8 seconds)
    const delay = 5000 + Math.random() * 3000;
    const nextEmail = EMAILS[nextIndex];

    pendingTimerRef.current = setTimeout(() => {
      setVisibleEmailIds(prev => {
        if (prev.includes(nextEmail.id)) return prev;
        return [...prev, nextEmail.id];
      });
      setLatestEmailId(nextEmail.id);
      setTimeout(() => {
        setLatestEmailId(prev => prev === nextEmail.id ? null : prev);
      }, 4500);
      pendingTimerRef.current = null;
    }, delay);

    return () => {
      if (pendingTimerRef.current) {
        clearTimeout(pendingTimerRef.current);
        pendingTimerRef.current = null;
      }
    };
  }, [loggedIn, visibleEmailIds, readEmailIds, allEmailsLoaded]);

  const selectEmail = useCallback((email: Email) => {
    setSelectedEmail(email);
    setCurrentView('reading');
    setReadEmailIds(prev => {
      const next = new Set(prev);
      next.add(email.id);
      return next;
    });
  }, []);

  const goBackToInbox = useCallback(() => {
    setSelectedEmail(null);
    setCurrentView('inbox');
  }, []);

  const dismissNotification = useCallback(() => {
    setLatestEmailId(null);
  }, []);

  return (
    <AppContext.Provider value={{
      userName, currentView, visibleEmailIds, selectedEmail,
      readEmailIds, allEmailsLoaded, latestEmailId,
      setUserName, login, selectEmail, goBackToInbox, dismissNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
