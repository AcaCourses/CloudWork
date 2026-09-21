'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { EMAILS, Email } from '@/lib/data';
import { Star, RefreshCw } from 'lucide-react';
import { useState } from 'react';

function EmailRow({ email, index }: { email: Email; index: number }) {
  const { selectEmail, readEmailIds } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const isRead = readEmailIds.has(email.id);

  return (
    <motion.div
      id={`email-row-${email.id}`}
      initial={{ x: -40, opacity: 0, height: 0 }}
      animate={{ x: 0, opacity: 1, height: 'auto' }}
      transition={{
        x: { duration: 0.35, ease: 'easeOut' },
        opacity: { duration: 0.35 },
        height: { duration: 0.3 },
      }}
      onClick={() => selectEmail(email)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '11px 16px',
        cursor: 'pointer',
        background: isHovered
          ? 'rgba(26,115,232,0.06)'
          : isRead
            ? 'transparent'
            : 'rgba(26,115,232,0.03)',
        borderBottom: '1px solid rgba(48,54,61,0.3)',
        transition: 'background 0.15s',
        position: 'relative',
        minWidth: 0,
      }}
    >
      {/* Unread left-edge indicator */}
      {!isRead && (
        <div style={{
          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
          width: 3, height: '60%', borderRadius: '0 4px 4px 0',
          background: '#4285f4',
        }} />
      )}

      {/* Avatar */}
      <div style={{
        width: 34, height: 34, borderRadius: '50%',
        background: `linear-gradient(135deg, ${email.fromColor}, ${email.fromColor}cc)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        fontSize: '0.66rem', fontWeight: 700, color: '#fff',
        boxShadow: `0 2px 8px ${email.fromColor}33`,
      }}>
        {email.fromAvatar}
      </div>

      {/* Content — takes all remaining space, truncates properly */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Row 1: sender name + role */}
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 6,
          marginBottom: 2, minWidth: 0,
        }}>
          <span style={{
            fontSize: '0.82rem',
            fontWeight: isRead ? 400 : 700,
            color: isRead ? '#8b949e' : '#e6edf3',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flexShrink: 1,
            minWidth: 0,
          }}>
            {email.from}
          </span>
          <span className="hide-xs" style={{
            fontSize: '0.7rem', color: '#484f58',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {email.fromRole}
          </span>
        </div>

        {/* Row 2: subject + preview */}
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 4,
          minWidth: 0,
        }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: isRead ? 400 : 600,
            color: isRead ? '#8b949e' : '#e6edf3',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flexShrink: 0,
            maxWidth: '45%',
          }}>
            {email.subject}
          </span>
          <span style={{
            fontSize: '0.77rem', color: '#484f58',
            overflow: 'hidden', textOverflow: 'ellipsis',
            whiteSpace: 'nowrap', flex: 1, minWidth: 0,
          }}>
            — {email.preview}
          </span>
        </div>
      </div>

      {/* Star — hidden on very small screens */}
      <Star
        className="hide-xs"
        size={15}
        color={email.starred ? '#fbbc04' : '#30363d'}
        fill={email.starred ? '#fbbc04' : 'none'}
        style={{ flexShrink: 0 }}
      />

      {/* Time */}
      <span style={{
        fontSize: '0.7rem',
        fontWeight: isRead ? 400 : 600,
        color: isRead ? '#484f58' : '#4285f4',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        {email.time}
      </span>
    </motion.div>
  );
}

function LoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '20px',
        color: '#484f58',
        fontSize: '0.78rem',
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      >
        <RefreshCw size={14} color="#4285f4" />
      </motion.div>
      <span>Sincronizando correos nuevos...</span>
    </motion.div>
  );
}

export default function EmailList() {
  const { visibleEmailIds, allEmailsLoaded } = useApp();

  const visibleEmails = EMAILS.filter(e => visibleEmailIds.includes(e.id));
  const displayEmails = [...visibleEmails].reverse();

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      background: '#0d1117',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        borderBottom: '1px solid rgba(48,54,61,0.4)',
        gap: 8,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="checkbox" disabled style={{ accentColor: '#4285f4', cursor: 'default' }} />
          <span className="hide-xs" style={{ fontSize: '0.74rem', color: '#484f58' }}>Seleccionar todo</span>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: '0.7rem', color: '#484f58' }}>
          {visibleEmails.length} de {EMAILS.length}
        </span>
      </div>

      {/* Email rows */}
      <AnimatePresence mode="popLayout">
        {displayEmails.map((email, i) => (
          <EmailRow key={email.id} email={email} index={i} />
        ))}
      </AnimatePresence>

      {/* Loading indicator */}
      <AnimatePresence>
        {!allEmailsLoaded && <LoadingIndicator />}
      </AnimatePresence>

      {/* Empty state */}
      {visibleEmails.length === 0 && !allEmailsLoaded && (
        <motion.div
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '60px 20px', gap: 12,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <RefreshCw size={28} color="#4285f4" />
          </motion.div>
          <p style={{ color: '#8b949e', fontSize: '0.9rem', textAlign: 'center' }}>
            Conectando a tu bandeja de entrada...
          </p>
          <p style={{ color: '#484f58', fontSize: '0.75rem', textAlign: 'center' }}>
            Los correos empezarán a llegar en un momento
          </p>
        </motion.div>
      )}
    </div>
  );
}
