import React, { ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { FlagARG, FlagUSA } from './Flags';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isArg = router.pathname === '/arg' || router.pathname === '/';
  const isUsa = router.pathname === '/usa';

  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/arg">
            <a
              style={{
                opacity: isArg ? 1 : 0.5,
                transition: 'opacity 0.3s',
                border: isArg ? '2px solid #009ee3' : '2px solid transparent',
                borderRadius: '50%',
                overflow: 'hidden',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Argentina"
            >
              <FlagARG width="100%" height="100%" />
            </a>
          </Link>
          <Link href="/usa">
            <a
              style={{
                opacity: isUsa ? 1 : 0.5,
                transition: 'opacity 0.3s',
                border: isUsa ? '2px solid #b22234' : '2px solid transparent',
                borderRadius: '50%',
                overflow: 'hidden',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="USA"
            >
              <FlagUSA width="100%" height="100%" />
            </a>
          </Link>
        </div>
      </header>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </div>
  );
}
