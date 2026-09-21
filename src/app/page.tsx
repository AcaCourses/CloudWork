'use client';

import { AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import GoogleLogin from '@/components/GoogleLogin';
import InboxSidebar from '@/components/InboxSidebar';
import InboxHeader from '@/components/InboxHeader';
import EmailList from '@/components/EmailList';
import EmailView from '@/components/EmailView';
import NewEmailNotification from '@/components/NewEmailNotification';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function Home() {
  const { currentView } = useApp();

  return (
    <AnimatePresence mode="wait">
      {currentView === 'login' ? (
        <GoogleLogin key="login" />
      ) : (
        <div
          key="inbox-shell"
          style={{
            display: 'flex',
            height: '100dvh',
            overflow: 'hidden',
          }}
        >
          {/* Sidebar — hidden on mobile via CSS */}
          <div className="inbox-sidebar">
            <InboxSidebar />
          </div>

          {/* Main area */}
          <div
            className="inbox-main"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              height: '100dvh',
              overflow: 'hidden',
            }}
          >
            <InboxHeader />

            <div className="mobile-content-pad" style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <AnimatePresence mode="wait">
                {currentView === 'inbox' ? (
                  <EmailList key="email-list" />
                ) : (
                  <EmailView key="email-view" />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile bottom navigation */}
          <MobileBottomNav />

          {/* Notification toast */}
          <NewEmailNotification />
        </div>
      )}
    </AnimatePresence>
  );
}
