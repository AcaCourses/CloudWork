'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Cloud, ArrowRight, UserCircle2 } from 'lucide-react';

export default function GoogleLogin() {
  const { userName, setUserName, login } = useApp();
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedName, setSavedName] = useState<string | null>(null);

  // Read the last-used name from localStorage once (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cw_userName');
      if (stored && stored.trim()) setSavedName(stored.trim());
    } catch { /* ignore */ }
  }, []);

  const handleLogin = () => {
    if (!userName.trim()) return;
    setIsLoading(true);
    setTimeout(() => login(), 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  const applySavedName = () => {
    if (savedName) setUserName(savedName);
  };

  return (
    <motion.div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 40%, #0d1117 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated gradient orbs */}
      <motion.div
        style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,115,232,0.08) 0%, transparent 70%)',
          top: '-10%', right: '-5%', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,168,83,0.06) 0%, transparent 70%)',
          bottom: '-15%', left: '-5%', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234,67,53,0.05) 0%, transparent 70%)',
          top: '30%', left: '20%', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(26,115,232,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(26,115,232,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Login Card */}
      <motion.div
        style={{
          width: '100%',
          maxWidth: 460,
          padding: 40,
          borderRadius: 16,
          background: 'rgba(22, 27, 34, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(48, 54, 61, 0.8)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
          position: 'relative',
          zIndex: 10,
        }}
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {/* Logo */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'linear-gradient(135deg, #1a73e8, #4285f4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(26,115,232,0.3)',
          }}>
            <Cloud size={26} color="#fff" />
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8b949e' }}>
              Google Cloud
            </p>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e6edf3', lineHeight: 1.2 }}>
              Consulting
            </p>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 32 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h1 style={{
            fontSize: 'clamp(1.5rem, 3vw, 1.85rem)',
            fontWeight: 800,
            color: '#e6edf3',
            lineHeight: 1.3,
            marginBottom: 8,
          }}>
            Bienvenido a tu primer{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4285f4, #34a853, #fbbc04, #ea4335)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Trabajo TI
            </span>
          </h1>
          <p style={{ color: '#8b949e', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Simulador de Arquitecto de Soluciones en la Nube
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(48,54,61,0.8), transparent)', marginBottom: 28 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />

        {/* Saved-name quick-access chip */}
        {savedName && (
          <motion.div
            style={{ marginBottom: 16 }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p style={{ fontSize: '0.72rem', color: '#8b949e', marginBottom: 8, letterSpacing: '0.02em' }}>
              Última sesión guardada
            </p>
            <motion.button
              id="saved-name-chip"
              onClick={applySavedName}
              whileHover={{ scale: 1.02, borderColor: '#4285f4' }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 14px', borderRadius: 10,
                background: 'rgba(66,133,244,0.06)',
                border: '1.5px solid rgba(66,133,244,0.25)',
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
            >
              <UserCircle2 size={18} color="#4285f4" />
              <span style={{ color: '#e6edf3', fontSize: '0.9rem', fontWeight: 600 }}>{savedName}</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#4285f4', fontWeight: 600 }}>Usar →</span>
            </motion.button>
          </motion.div>
        )}

        {/* Input */}
        <motion.div
          style={{ marginBottom: 20 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <label style={{
            display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#8b949e',
            marginBottom: 8, letterSpacing: '0.02em',
          }}>
            Tu nombre completo
          </label>
          <div style={{
            position: 'relative',
            borderRadius: 10,
            border: `2px solid ${isFocused ? '#4285f4' : 'rgba(48,54,61,0.8)'}`,
            background: 'rgba(13, 17, 23, 0.6)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: isFocused ? '0 0 0 3px rgba(66,133,244,0.15)' : 'none',
          }}>
            <input
              id="login-name-input"
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Ej. Ana García"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#e6edf3',
                fontSize: '0.95rem',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </motion.div>

        {/* Button */}
        <motion.button
          id="login-button"
          onClick={handleLogin}
          disabled={!userName.trim() || isLoading}
          style={{
            width: '100%',
            padding: '14px 24px',
            borderRadius: 10,
            border: 'none',
            background: userName.trim()
              ? 'linear-gradient(135deg, #1a73e8, #4285f4)'
              : 'rgba(48,54,61,0.5)',
            color: userName.trim() ? '#fff' : '#484f58',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: userName.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transition: 'all 0.2s',
            boxShadow: userName.trim() ? '0 4px 16px rgba(26,115,232,0.3)' : 'none',
            fontFamily: 'inherit',
          }}
          whileHover={userName.trim() ? { scale: 1.02, boxShadow: '0 6px 24px rgba(26,115,232,0.4)' } : {}}
          whileTap={userName.trim() ? { scale: 0.98 } : {}}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          {isLoading ? (
            <motion.div
              style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          ) : (
            <>
              Iniciar sesión
              <ArrowRight size={18} />
            </>
          )}
        </motion.button>

        {/* Footer info */}
        <motion.div
          style={{ marginTop: 24, textAlign: 'center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p style={{ fontSize: '0.72rem', color: '#484f58', lineHeight: 1.6 }}>
            Esta es una simulación educativa. No se requiere una cuenta real.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom branding */}
      <motion.div
        style={{ position: 'absolute', bottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Cloud size={14} color="#484f58" />
        <span style={{ fontSize: '0.7rem', color: '#484f58', letterSpacing: '0.06em' }}>
          Cloud Architecture Simulator · Actividad Educativa
        </span>
      </motion.div>
    </motion.div>
  );
}
