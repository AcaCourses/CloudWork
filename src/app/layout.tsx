import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Tu Primer Trabajo TI | Simulador Cloud Architect',
  description:
    'Experiencia inmersiva de simulación: tu primer día como consultor(a) junior de arquitectura en la nube. Habla con 5 clientes reales, diagnostica sus problemas y propón soluciones cloud.',
  keywords: ['cloud', 'arquitectura', 'simulador', 'consultor', 'IaaS', 'PaaS', 'SaaS', 'educación'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
