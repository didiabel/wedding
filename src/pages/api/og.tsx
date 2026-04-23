import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = { runtime: 'experimental-edge' };

export default function handler(_req: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fdf6f0 0%, #fce8e0 40%, #f5dce8 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative circles */}
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          borderRadius: '50%', background: 'rgba(220,140,160,0.08)',
          top: '-150px', left: '-150px', display: 'flex',
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '50%', background: 'rgba(200,120,140,0.07)',
          bottom: '-100px', right: '-100px', display: 'flex',
        }} />

        {/* Card */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: 'rgba(255,255,255,0.75)',
          border: '1px solid rgba(220,160,170,0.4)',
          borderRadius: '8px',
          padding: '70px 90px',
          boxShadow: '0 8px 48px rgba(180,100,120,0.14)',
        }}>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '18px', letterSpacing: '5px', color: '#b07a8a',
            margin: '0 0 36px', textTransform: 'uppercase',
          }}>
            — Guarden esta fecha —
          </p>

          <p style={{
            fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontSize: '100px', fontWeight: 300, color: '#6d3a4a',
            margin: '0', lineHeight: 1,
          }}>
            Mijal
          </p>
          <p style={{
            fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontSize: '64px', color: '#c07a90', margin: '4px 0', lineHeight: 1,
          }}>
            &amp;
          </p>
          <p style={{
            fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontSize: '100px', fontWeight: 300, color: '#6d3a4a',
            margin: '0', lineHeight: 1,
          }}>
            Didi
          </p>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            margin: '36px 0', width: '320px',
          }}>
            <div style={{ flex: 1, height: '1px', background: '#d4a0b0' }} />
            <span style={{ fontSize: '10px', color: '#c07a90' }}>◆</span>
            <div style={{ flex: 1, height: '1px', background: '#d4a0b0' }} />
          </div>

          <p style={{
            fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontSize: '48px', color: '#8a4a5a', margin: '0',
          }}>
            18 de Octubre, 2026
          </p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
