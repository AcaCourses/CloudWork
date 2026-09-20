'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { EMAILS, Email } from '@/lib/data';

export type ClientId = 'lucia' | 'diego' | 'ana' | 'roberto' | 'carla';

type ViewMode = 'login' | 'inbox' | 'reading';

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
  const [userName, setUserName] = useState('');
  const [currentView, setCurrentView] = useState<ViewMode>('login');
  const [visibleEmailIds, setVisibleEmailIds] = useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [readEmailIds, setReadEmailIds] = useState<Set<string>>(new Set());
  const [allEmailsLoaded, setAllEmailsLoaded] = useState(false);
  const [latestEmailId, setLatestEmailId] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
