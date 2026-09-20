'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Email, Client, RubricItem, SignatureData } from '@/lib/data';
import {
  ArrowLeft, Star, Reply, Forward, MoreHorizontal,
  ExternalLink, BookOpen, Server, Cloud, Layers,
  Monitor, Box, Zap, Globe, Lock, GitBranch,
  Calendar, CheckSquare, Square
} from 'lucide-react';
import { useState } from 'react';

/* ── Helper ──────────────────────────────────────────────────── */
function personalize(text: string, name: string): string {
  return text.replace(/\{name\}/g, name);
}

/* ── Google Cloud Signature ──────────────────────────────────── */
function GoogleSignature({ sig }: { sig: SignatureData }) {
  return (
    <div style={{
      marginTop: 36, paddingTop: 20,
      borderTop: '1px solid rgba(48,54,61,0.3)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        {/* Google colored bar */}
        <div style={{
          width: 4, borderRadius: 2, minHeight: 56,
          background: 'linear-gradient(180deg, #4285f4 0%, #ea4335 33%, #fbbc04 66%, #34a853 100%)',
          flexShrink: 0,
        }} />
        <div>
          <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#e6edf3', marginBottom: 2 }}>
            {sig.name}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#8b949e', marginBottom: 4, lineHeight: 1.5 }}>
            {sig.role}
          </p>
          {sig.phone && (
            <p style={{ fontSize: '0.72rem', color: '#484f58', marginBottom: 4 }}>
              📞 {sig.phone}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            {/* Google Cloud logo mini */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {['#4285f4', '#ea4335', '#fbbc04', '#34a853'].map((c, i) => (
                <div key={i} style={{
                  width: 5, height: 5, borderRadius: '50%', background: c,
                }} />
              ))}
            </div>
            <span style={{ fontSize: '0.68rem', color: '#484f58', fontWeight: 500, letterSpacing: '0.02em' }}>
              Google Cloud Consulting
            </span>
          </div>
          <p style={{ fontSize: '0.62rem', color: '#30363d', marginTop: 6, lineHeight: 1.5, maxWidth: 400 }}>
            Este correo es confidencial. Si no eres el destinatario, por favor notifica al remitente y elimínalo.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Agendar Reunión Button (Gem Link) ───────────────────────── */
function ScheduleMeetingButton({ client }: { client: Client }) {
  return (
    <a
      href={client.gemLink}
      target="_blank"
      rel="noopener noreferrer"
      id={`gem-link-${client.id}`}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 20px', borderRadius: 8,
        background: `linear-gradient(135deg, ${client.colorFrom}, ${client.colorTo})`,
        color: '#fff', textDecoration: 'none',
        fontSize: '0.85rem', fontWeight: 700,
        boxShadow: `0 4px 16px ${client.colorFrom}33`,
        transition: 'transform 0.15s, box-shadow 0.15s',
        marginTop: 12,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = `0 6px 24px ${client.colorFrom}44`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = `0 4px 16px ${client.colorFrom}33`;
      }}
    >
      <Calendar size={16} />
      Agendar reunión con {client.name.split(' ')[0]}
      <ExternalLink size={14} style={{ opacity: 0.7 }} />
    </a>
  );
}

/* ── Sub-components for each email type ──────────────────────── */

function WelcomeBody({ email, userName }: { email: Email; userName: string }) {
  if (email.body.type !== 'welcome') return null;
  const c = email.body.content;
  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#e6edf3', marginBottom: 20, lineHeight: 1.4 }}>
        {personalize(c.greeting, userName)}
      </h2>
      {c.paragraphs.map((p, i) => (
        <p key={i} style={{ fontSize: '0.9rem', color: '#c9d1d9', lineHeight: 1.8, marginBottom: 16 }}>
          {personalize(p, userName)}
        </p>
      ))}
    </div>
  );
}

function InstructionsBody({ email, userName }: { email: Email; userName: string }) {
  if (email.body.type !== 'instructions') return null;
  const c = email.body.content;
  return (
    <div>
      <p style={{ fontSize: '0.9rem', color: '#c9d1d9', lineHeight: 1.8, marginBottom: 24 }}>
        {personalize(c.intro, userName)}
      </p>
      <div style={{
        padding: 24, borderRadius: 12,
        background: 'rgba(26,115,232,0.06)',
        border: '1px solid rgba(26,115,232,0.15)',
        marginBottom: 24,
      }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4285f4', marginBottom: 16 }}>
          🎯 Qué se espera de ti
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {c.expectations.map((exp, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 2 }}>{exp.emoji}</span>
              <p style={{ fontSize: '0.88rem', color: '#c9d1d9', lineHeight: 1.7 }}>{exp.text}</p>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: '0.9rem', color: '#8b949e', lineHeight: 1.8, fontStyle: 'italic' }}>
        {personalize(c.closing, userName)}
      </p>
    </div>
  );
}

function ConceptsBody({ email, userName }: { email: Email; userName: string }) {
  if (email.body.type !== 'concepts') return null;
  const c = email.body.content;
  const modelIcons = [Server, Layers, Cloud];
  const deployIcons = [Globe, Lock, GitBranch];

  return (
    <div>
      <p style={{ fontSize: '0.9rem', color: '#c9d1d9', lineHeight: 1.8, marginBottom: 28 }}>
        {personalize(c.intro, userName)}
      </p>

      {/* Service Models */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4285f4', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={14} /> Modelos de Servicio
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {c.serviceModels.map((model, i) => {
            const Icon = modelIcons[i];
            const colors = ['#1a73e8', '#ea4335', '#34a853'];
            return (
              <div key={i} style={{ padding: 18, borderRadius: 10, background: `${colors[i]}08`, border: `1px solid ${colors[i]}20`, display: 'flex', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${colors[i]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color={colors[i]} />
                </div>
                <div>
                  <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#e6edf3', marginBottom: 4 }}>{model.name}</p>
                  <p style={{ fontSize: '0.82rem', color: '#c9d1d9', lineHeight: 1.65, marginBottom: 6 }}>{model.desc}</p>
                  <p style={{ fontSize: '0.78rem', color: '#8b949e' }}><strong style={{ color: '#c9d1d9' }}>Ejemplo:</strong> {model.example}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deployment Models */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#34a853', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Globe size={14} /> Modelos de Despliegue
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {c.deploymentModels.map((model, i) => {
            const Icon = deployIcons[i];
            const colors = ['#4285f4', '#ea4335', '#fbbc04'];
            return (
              <div key={i} style={{ padding: 16, borderRadius: 10, background: 'rgba(22,27,34,0.6)', border: '1px solid rgba(48,54,61,0.5)', textAlign: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${colors[i]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                  <Icon size={16} color={colors[i]} />
                </div>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e6edf3', marginBottom: 6 }}>{model.name}</p>
                <p style={{ fontSize: '0.78rem', color: '#8b949e', lineHeight: 1.55 }}>{model.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compute Definitions */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fbbc04', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Monitor size={14} /> Definiciones de Cómputo
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {c.computeDefinitions.map((def, i) => (
            <div key={i} style={{ padding: 16, borderRadius: 10, background: 'rgba(251,188,4,0.05)', border: '1px solid rgba(251,188,4,0.15)' }}>
              <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#e6edf3', marginBottom: 6 }}>{def.name}</p>
              <p style={{ fontSize: '0.82rem', color: '#c9d1d9', lineHeight: 1.6 }}>{def.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compute Options Table */}
      <div>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fbbc04', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={14} /> Comparativa de Cómputo
        </h3>
        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(48,54,61,0.5)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.5fr', background: 'rgba(22,27,34,0.8)', padding: '10px 16px', borderBottom: '1px solid rgba(48,54,61,0.5)' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Opción</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Control</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cuándo conviene</span>
          </div>
          {c.computeOptions.map((opt, i) => {
            const icons = [Monitor, Layers, Box, Cloud, Zap];
            const RowIcon = icons[i];
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.5fr', padding: '12px 16px', borderBottom: i < c.computeOptions.length - 1 ? '1px solid rgba(48,54,61,0.3)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(22,27,34,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <RowIcon size={14} color="#fbbc04" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e6edf3' }}>{opt.option}</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#c9d1d9' }}>{opt.control}</span>
                <span style={{ fontSize: '0.8rem', color: '#8b949e', lineHeight: 1.5 }}>{opt.when}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepsBody({ email, userName }: { email: Email; userName: string }) {
  if (email.body.type !== 'steps') return null;
  const c = email.body.content;
  const stepColors = ['#4285f4', '#34a853', '#fbbc04', '#ea4335'];

  return (
    <div>
      <p style={{ fontSize: '0.9rem', color: '#c9d1d9', lineHeight: 1.8, marginBottom: 28 }}>
        {personalize(c.intro, userName)}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {c.steps.map((step, i) => (
          <div key={i} style={{ padding: 20, borderRadius: 12, background: 'rgba(22,27,34,0.6)', border: `1px solid ${stepColors[i]}25`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: stepColors[i] }} />
            <div style={{ paddingLeft: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: stepColors[i], background: `${stepColors[i]}15`, padding: '3px 10px', borderRadius: 6 }}>
                  {step.step}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#484f58' }}>⏱ {step.duration}</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e6edf3', marginBottom: 6 }}>{step.title}</h4>
              <p style={{ fontSize: '0.85rem', color: '#8b949e', marginBottom: 12, lineHeight: 1.6 }}>{step.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {step.details.map((detail, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: '#c9d1d9', lineHeight: 1.6 }}>
                    <span style={{ color: stepColors[i], fontWeight: 700, marginTop: 2, flexShrink: 0 }}>•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Example Interview */}
      <div style={{ padding: 20, borderRadius: 12, background: 'rgba(26,115,232,0.05)', border: '1px solid rgba(26,115,232,0.15)' }}>
        <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4285f4', marginBottom: 16 }}>
          💬 Ejemplo de cómo podría verse una entrevista
        </h4>
        <div style={{ fontFamily: "'Fira Code', 'Cascadia Code', monospace", fontSize: '0.78rem', color: '#c9d1d9', lineHeight: 1.8, whiteSpace: 'pre-wrap', background: 'rgba(13,17,23,0.5)', padding: 16, borderRadius: 8, maxHeight: 400, overflowY: 'auto' }}>
          {c.exampleInterview}
        </div>
      </div>
    </div>
  );
}

function ClientCard({ client }: { client: Client }) {
  return (
    <div style={{
      padding: 20, borderRadius: 12,
      background: 'rgba(22,27,34,0.6)',
      border: `1px solid ${client.colorFrom}30`,
      transition: 'border-color 0.2s, transform 0.2s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${client.colorFrom}60`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${client.colorFrom}30`;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12,
          background: `linear-gradient(135deg, ${client.colorFrom}, ${client.colorTo})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', flexShrink: 0,
          boxShadow: `0 4px 16px ${client.colorFrom}33`,
        }}>
          {client.emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e6edf3' }}>{client.name}</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: `${client.colorFrom}20`, color: client.colorFrom }}>
              {client.role}
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#8b949e', marginBottom: 6 }}>{client.company}</p>
          <p style={{ fontSize: '0.85rem', color: '#c9d1d9', lineHeight: 1.6 }}>{client.caseSummary}</p>
          <p style={{ fontSize: '0.72rem', color: '#484f58', marginTop: 8 }}>
            Nombre sugerido en Gemini: <strong style={{ color: '#8b949e' }}>{client.gemName}</strong>
          </p>
        </div>
      </div>
      {/* Agendar Reunión button */}
      <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${client.colorFrom}15` }}>
        <ScheduleMeetingButton client={client} />
      </div>
    </div>
  );
}

function ClientsBody({ email, userName }: { email: Email; userName: string }) {
  if (email.body.type !== 'clients') return null;
  const c = email.body.content;
  return (
    <div>
      <p style={{ fontSize: '0.9rem', color: '#c9d1d9', lineHeight: 1.8, marginBottom: 16 }}>
        {personalize(c.intro, userName)}
      </p>
      {c.backstory && (
        <div style={{
          padding: 16, borderRadius: 10,
          background: 'rgba(251,188,4,0.06)',
          border: '1px solid rgba(251,188,4,0.2)',
          marginBottom: 20,
        }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#fbbc04', marginBottom: 8, letterSpacing: '0.06em' }}>
            ⚡ Contexto del caso
          </p>
          <p style={{ fontSize: '0.88rem', color: '#c9d1d9', lineHeight: 1.7 }}>
            {personalize(c.backstory, userName)}
          </p>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {c.clients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

function RubricBody({ email, userName }: { email: Email; userName: string }) {
  if (email.body.type !== 'rubric') return null;
  const c = email.body.content;
  return (
    <div>
      <p style={{ fontSize: '0.9rem', color: '#c9d1d9', lineHeight: 1.8, marginBottom: 24 }}>
        {personalize(c.intro, userName)}
      </p>

      {/* Deliverables */}
      <div style={{ padding: 20, borderRadius: 12, background: 'rgba(52,168,83,0.06)', border: '1px solid rgba(52,168,83,0.15)', marginBottom: 28 }}>
        <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#34a853', marginBottom: 14 }}>
          📦 Entregables Totales
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {c.deliverables.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 12, borderRadius: 8, background: 'rgba(13,17,23,0.4)' }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{d.emoji}</span>
              <p style={{ fontSize: '0.88rem', color: '#c9d1d9', lineHeight: 1.6 }}>{d.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rubric */}
      <div>
        <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fbbc04', marginBottom: 16 }}>
          📊 Rúbrica de Evaluación
        </h4>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(48,54,61,0.5)' }}>
          {c.rubric.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'stretch', borderBottom: i < c.rubric.length - 1 ? '1px solid rgba(48,54,61,0.3)' : 'none' }}>
              <div style={{ width: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: `${item.color}10`, borderRight: `3px solid ${item.color}` }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: item.color }}>{item.weight}</span>
              </div>
              <div style={{ flex: 1, padding: '14px 16px' }}>
                <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#e6edf3', marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: '0.8rem', color: '#8b949e', lineHeight: 1.55 }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Weight visualization */}
        <div style={{ marginTop: 16, padding: 14, borderRadius: 10, background: 'rgba(22,27,34,0.6)', border: '1px solid rgba(48,54,61,0.3)' }}>
          <p style={{ fontSize: '0.72rem', color: '#484f58', marginBottom: 8 }}>Distribución de peso:</p>
          <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', gap: 2 }}>
            {c.rubric.map((item, i) => (
              <div key={i} style={{ width: `${item.weightNum}%`, background: item.color, borderRadius: 2 }} title={`${item.title}: ${item.weight}`} />
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 10 }}>
            {c.rubric.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                <span style={{ fontSize: '0.68rem', color: '#8b949e' }}>{item.title.split(' ').slice(0, 2).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing */}
      <div style={{ marginTop: 28, padding: 20, borderRadius: 12, background: 'linear-gradient(135deg, rgba(26,115,232,0.06), rgba(52,168,83,0.06))', border: '1px solid rgba(66,133,244,0.15)', textAlign: 'center' }}>
        <p style={{ fontSize: '1rem', color: '#e6edf3', fontWeight: 600, lineHeight: 1.6 }}>
          {personalize(c.closing, userName)}
        </p>
      </div>
    </div>
  );
}

function ChecklistBody({ email, userName }: { email: Email; userName: string }) {
  if (email.body.type !== 'checklist') return null;
  const c = email.body.content;
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div>
      <p style={{ fontSize: '0.9rem', color: '#c9d1d9', lineHeight: 1.8, marginBottom: 24 }}>
        {personalize(c.intro, userName)}
      </p>

      <div style={{
        borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(48,54,61,0.5)',
      }}>
        <div style={{
          padding: '12px 16px',
          background: 'rgba(22,27,34,0.8)',
          borderBottom: '1px solid rgba(48,54,61,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e6edf3' }}>
            📋 Checklist de Entrega
          </span>
          <span style={{ fontSize: '0.72rem', color: '#484f58' }}>
            {checked.size} de {c.items.length} completados
          </span>
        </div>

        {c.items.map((item, i) => {
          const isDone = checked.has(i);
          return (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '14px 16px',
                borderBottom: i < c.items.length - 1 ? '1px solid rgba(48,54,61,0.2)' : 'none',
                cursor: 'pointer',
                background: isDone ? 'rgba(52,168,83,0.04)' : 'transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (!isDone) e.currentTarget.style.background = 'rgba(26,115,232,0.04)'; }}
              onMouseLeave={e => { if (!isDone) e.currentTarget.style.background = 'transparent'; else e.currentTarget.style.background = 'rgba(52,168,83,0.04)'; }}
            >
              {isDone
                ? <CheckSquare size={18} color="#34a853" style={{ flexShrink: 0, marginTop: 2 }} />
                : <Square size={18} color="#484f58" style={{ flexShrink: 0, marginTop: 2 }} />
              }
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: '1rem' }}>{item.emoji}</span>
                  <span style={{
                    fontSize: '0.85rem', fontWeight: 600,
                    color: isDone ? '#8b949e' : '#e6edf3',
                    textDecoration: isDone ? 'line-through' : 'none',
                    transition: 'color 0.15s',
                  }}>
                    {item.label}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#484f58', lineHeight: 1.5, marginLeft: 28 }}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 16 }}>
        <div style={{ height: 6, borderRadius: 3, background: 'rgba(48,54,61,0.4)', overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, #34a853, #57bb8a)', borderRadius: 3 }}
            animate={{ width: `${(checked.size / c.items.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      <p style={{ fontSize: '0.88rem', color: '#8b949e', lineHeight: 1.7, marginTop: 20, fontStyle: 'italic' }}>
        {personalize(c.closing, userName)}
      </p>
    </div>
  );
}

/* ── Main EmailView Component ────────────────────────────────── */
export default function EmailView() {
  const { selectedEmail, goBackToInbox, userName } = useApp();
  if (!selectedEmail) return null;

  const email = selectedEmail;

  const renderBody = () => {
    switch (email.body.type) {
      case 'welcome': return <WelcomeBody email={email} userName={userName} />;
      case 'instructions': return <InstructionsBody email={email} userName={userName} />;
      case 'concepts': return <ConceptsBody email={email} userName={userName} />;
      case 'steps': return <StepsBody email={email} userName={userName} />;
      case 'clients': return <ClientsBody email={email} userName={userName} />;
      case 'rubric': return <RubricBody email={email} userName={userName} />;
      case 'checklist': return <ChecklistBody email={email} userName={userName} />;
    }
  };

  return (
    <motion.div
      style={{ flex: 1, overflowY: 'auto', background: '#0d1117' }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Top toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 20px',
        borderBottom: '1px solid rgba(48,54,61,0.4)',
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(13,17,23,0.9)',
        backdropFilter: 'blur(10px)',
      }}>
        <button id="back-to-inbox-btn" onClick={goBackToInbox} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 6,
          background: 'rgba(48,54,61,0.3)',
          border: '1px solid rgba(48,54,61,0.5)',
          color: '#c9d1d9', fontSize: '0.8rem', fontWeight: 500,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          <ArrowLeft size={16} />
          Volver a Recibidos
        </button>
        <div style={{ flex: 1 }} />
        {[Reply, Forward, MoreHorizontal].map((Icon, i) => (
          <button key={i} style={{
            width: 34, height: 34, borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: 'none', cursor: 'default',
          }}>
            <Icon size={16} color="#8b949e" />
          </button>
        ))}
      </div>

      {/* Email content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 32px 60px' }}>
        {/* Subject */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 24 }}>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#e6edf3', flex: 1, lineHeight: 1.4 }}>
            {email.subject}
          </h1>
          <Star size={20} color={email.starred ? '#fbbc04' : '#30363d'} fill={email.starred ? '#fbbc04' : 'none'} style={{ flexShrink: 0, marginTop: 6 }} />
        </div>

        {/* Sender info */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '16px 0',
          borderBottom: '1px solid rgba(48,54,61,0.3)',
          marginBottom: 28,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: `linear-gradient(135deg, ${email.fromColor}, ${email.fromColor}cc)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.78rem', fontWeight: 700, color: '#fff',
            flexShrink: 0,
            boxShadow: `0 2px 10px ${email.fromColor}33`,
          }}>
            {email.fromAvatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#e6edf3' }}>{email.from}</span>
              <span style={{ fontSize: '0.72rem', color: '#484f58' }}>&lt;{email.from.toLowerCase().replace(/\s/g, '.')}@google.com&gt;</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: 2 }}>
              para <strong style={{ color: '#c9d1d9' }}>{userName || 'mí'}</strong> · {email.time}
            </p>
          </div>
        </div>

        {/* Body content */}
        {renderBody()}

        {/* Google Cloud Signature */}
        <GoogleSignature sig={email.signature} />
      </div>
    </motion.div>
  );
}
