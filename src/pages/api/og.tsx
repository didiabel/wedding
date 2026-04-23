import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const { searchParams } = url;

  const title = searchParams.get('title') ?? 'Mijal';
  const secondName = searchParams.get('secondName') ?? 'Didi';
  const dateLine = searchParams.get('date') ?? '18 de octubre del 2026';
  const hebrewDateLine = searchParams.get('hebrewDate') ?? '7 de jeshvan 5787';
  const footer = searchParams.get('footer') ?? 'Con amor, los esperamos';

  const bgUrl = new URL('/images/bg.png', url.origin).toString();
  const frameUrl = new URL('/images/flower-frame.png', url.origin).toString();

  async function loadGoogleFontTtf(family: string, weight: number) {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family.replace(
        / /g,
        '+'
      )}:wght@${weight}&display=swap`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
        },
      }
    ).then((r) => r.text());
    const fontUrl = css.match(/url\(([^)]+)\)/)?.[1];
    if (!fontUrl) throw new Error(`Font URL not found for ${family} ${weight}`);
    return fetch(fontUrl).then((r) => r.arrayBuffer());
  }

  const [tanPearlData, libreRegularData, libreBoldData] = await Promise.all([
    fetch(new URL('/font/TAN-PEARL-Regular.otf', url.origin)).then((r) =>
      r.arrayBuffer()
    ),
    loadGoogleFontTtf('Libre Baskerville', 400),
    loadGoogleFontTtf('Libre Baskerville', 700),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fbf8f3 0%, #f7efe5 100%)',
        }}
      >
        {/* Background texture */}
        <img
          src={bgUrl}
          style={{
            position: 'absolute',
            inset: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Card */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 660,
            background: 'rgba(255, 255, 255, 0.72)',
            border: '1px solid rgba(170, 150, 120, 0.18)',
            borderRadius: 8,
            boxShadow:
              '0 8px 48px rgba(180, 100, 120, 0.12), 0 2px 12px rgba(0, 0, 0, 0.06)',
            padding: '36px 56px 28px',
          }}
        >
          {/* SAVE THE DATE eyebrow */}
          <div
            style={{
              fontFamily: 'Libre Baskerville',
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: '0.1em',
              color: '#0a244e',
              textTransform: 'uppercase',
              marginBottom: 26,
              lineHeight: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {'SAVE THE DATE'.split('').map((ch, i) => (
              <span key={i} style={{ display: 'flex' }}>
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </div>

          {/* Names */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              fontFamily: 'Tan Pearl',
              color: '#0a244e',
              lineHeight: 1,
              gap: '4px',
              marginBottom: 18,
            }}
          >
            <div
              style={{
                fontSize: 96,
                display: 'flex',
                textAlign: 'left',
                marginLeft: 24,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 96,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'baseline',
              }}
            >
              <span
                style={{ fontSize: 62, display: 'flex', marginRight: '2px' }}
              >
                &amp;
              </span>
              <span style={{ display: 'flex', marginRight: 50 }}>
                {secondName}
              </span>
            </div>
          </div>

          {/* Dates */}
          <div
            style={{
              fontFamily: 'Libre Baskerville',
              fontWeight: 400,
              fontSize: 20,
              color: '#4a5f8a',
              textAlign: 'center',
              display: 'flex',
              marginBottom: 4,
            }}
          >
            {dateLine}
          </div>
          <div
            style={{
              fontFamily: 'Libre Baskerville',
              fontWeight: 400,
              fontSize: 20,
              color: '#4a5f8a',
              textAlign: 'center',
              display: 'flex',
              marginBottom: 18,
            }}
          >
            {hebrewDateLine}
          </div>

          {/* Footer */}
          <div
            style={{
              fontFamily: 'Libre Baskerville',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 16,
              color: '#4a5f8a',
              display: 'flex',
            }}
          >
            {footer}
          </div>
        </div>

        <img
          src={frameUrl}
          width={1200}
          height={630}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <img
          src={frameUrl}
          width={1200}
          height={630}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(-1, -1)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Tan Pearl',
          data: tanPearlData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Libre Baskerville',
          data: libreRegularData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Libre Baskerville',
          data: libreBoldData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
}
