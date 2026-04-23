import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Mijal & Didi';
  const date = searchParams.get('date') ?? '18 de Octubre, 2026';
  const subtitle =
    searchParams.get('subtitle') ??
    '¡Guarden esta fecha! Los invitamos a celebrar nuestro casamiento.';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background:
            'linear-gradient(135deg, #fdf6f0 0%, #fce8e0 40%, #f5dce8 100%)',
          color: '#6d3a4a',
          padding: '72px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#b07a8a',
            marginBottom: 28,
          }}
        >
          — Guarden esta fecha —
        </div>
        <div style={{ fontSize: 92, fontWeight: 300, lineHeight: 1.1 }}>
          {title}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 40,
            fontStyle: 'italic',
            color: '#8a4a5a',
          }}
        >
          {date}
        </div>
        <div
          style={{
            marginTop: 28,
            maxWidth: 900,
            fontSize: 28,
            color: '#8a4a5a',
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'cache-control': 'public, max-age=86400, s-maxage=86400',
        'content-type': 'image/png',
      },
    }
  );
}
