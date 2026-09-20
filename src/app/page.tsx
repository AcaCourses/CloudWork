'use client';

import { AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import GoogleLogin from '@/components/GoogleLogin';
import InboxSidebar from '@/components/InboxSidebar';
import InboxHeader from '@/components/InboxHeader';
import EmailList from '@/components/EmailList';
import EmailView from '@/components/EmailView';
import NewEmailNotification from '@/components/NewEmailNotification';

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
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Sidebar */}
          <div className="inbox-sidebar">
            <InboxSidebar />
          </div>

          {/* Main area */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
          }}>
            <InboxHeader />

            <AnimatePresence mode="wait">
              {currentView === 'inbox' ? (
                <EmailList key="email-list" />
              ) : (
                <EmailView key="email-view" />
              )}
            </AnimatePresence>
          </div>

          {/* Notification toast */}
          <NewEmailNotification />
        </div>
      )}
    </AnimatePresence>
  );
}
