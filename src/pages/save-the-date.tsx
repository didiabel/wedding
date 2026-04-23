import { useEffect, useState } from 'react';

import type { GetServerSideProps } from 'next';
import Head from 'next/head';

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function calcularTiempoRestante(): TimeLeft {
  // Month is 0-indexed in JS Dates (0=Jan, 9=Oct)
  const boda = new Date(2026, 9, 18, 0, 0, 0);
  const ahora = new Date();
  const diferencia = boda.getTime() - ahora.getTime();

  if (diferencia <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  }

  return {
    dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diferencia / (1000 * 60)) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const proto = req.headers['x-forwarded-proto'] ?? 'https';
  const host = req.headers['x-forwarded-host'] ?? req.headers.host ?? '';
  const baseUrl = `${proto}://${host}`;
  return { props: { baseUrl } };
};

export default function SaveTheDate({ baseUrl }: { baseUrl: string }) {
  const [tiempoRestante, setTiempoRestante] = useState<TimeLeft>(
    calcularTiempoRestante()
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const intervalo = setInterval(() => {
      setTiempoRestante(calcularTiempoRestante());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const eventDetails = {
    title: 'Mijal',
    secondName: 'Didi',
    dateLabel: '18 de octubre del 2026',
    hebrewDate: '7 de jeshvan 5787',
    footer: 'Te esperamos!',
  };

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', eventDetails.title);
  ogImageUrl.searchParams.set('secondName', eventDetails.secondName);
  ogImageUrl.searchParams.set('date', '18 de octubre del 2026');
  ogImageUrl.searchParams.set('hebrewDate', '7 de jeshvan 5787');
  ogImageUrl.searchParams.set('footer', eventDetails.footer);

  // Essential for WhatsApp: Adds a dummy extension so strict parsers recognize it as an image
  const finalOgUrl = `${ogImageUrl.toString()}&ext=.png`;

  return (
    <>
      <Head>
        <title>Mijal &amp; Didi — 18 de Octubre</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content={`${baseUrl}/save-the-date/`} />
        <meta
          property="og:title"
          content="Mijal & Didi — 18 de Octubre, 2026"
        />
        <meta
          property="og:description"
          content="¡Save the date! Los invitamos a celebrar nuestro casamiento."
        />

        {/* WhatsApp-specific fixes */}
        <meta property="og:image" itemProp="image" content={finalOgUrl} />
        <meta
          property="og:image:secure_url"
          itemProp="image"
          content={finalOgUrl}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Mijal & Didi — 18 de Octubre, 2026"
        />
        <meta
          name="twitter:description"
          content="¡Save the date! Los invitamos a celebrar nuestro casamiento."
        />
        <meta name="twitter:image" content={finalOgUrl} />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Montserrat:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="page">
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`petal petal-${i + 1}`} aria-hidden="true" />
        ))}

        <div className="flyer">
          <div className="flyer-bg" aria-hidden="true" />
          <img
            className="flyer-frame flyer-frame--bottom"
            src="/images/flower-frame.png"
            alt=""
            aria-hidden="true"
          />
          <img
            className="flyer-frame flyer-frame--top"
            src="/images/flower-frame.png"
            alt=""
            aria-hidden="true"
          />

          <div className="card">
            <p className="eyebrow">SAVE THE DATE</p>

            <h1 className="names">
              <span className="name-row1">{eventDetails.title}</span>
              <span className="name-row2">
                <span className="ampersand">&amp;</span>
                {eventDetails.secondName}
              </span>
            </h1>

            <p className="date-label">{eventDetails.dateLabel}</p>
            <p className="date-hebrew">{eventDetails.hebrewDate}</p>

            {mounted && (
              <div className="countdown">
                <div className="unit">
                  <span className="number">{tiempoRestante.dias}</span>
                  <span className="label">días</span>
                </div>
                <div className="unit">
                  <span className="number">{pad(tiempoRestante.horas)}</span>
                  <span className="label">horas</span>
                </div>
                <div className="unit">
                  <span className="number">{pad(tiempoRestante.minutos)}</span>
                  <span className="label">min</span>
                </div>
                <div className="unit">
                  <span className="number">{pad(tiempoRestante.segundos)}</span>
                  <span className="label">seg</span>
                </div>
              </div>
            )}

            <p className="footer-text">{eventDetails.footer}</p>
          </div>
        </div>
      </main>

      <style jsx>{`
        @font-face {
          font-family: 'Libre Baskerville';
          src: url('/font/LibreBaskerville-VariableFont_wght.ttf')
            format('truetype');
          font-weight: 100 900;
          font-display: swap;
        }

        .page {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg, #fbf8f3 0%, #f7efe5 100%);
          padding: 1.5rem 1rem;
        }

        .petal {
          position: fixed;
          border-radius: 50% 0 50% 0;
          opacity: 0;
          animation: fall linear infinite;
          pointer-events: none;
        }
        .petal:nth-child(odd) {
          background: rgba(234, 224, 210, 0.55);
        }
        .petal:nth-child(even) {
          background: rgba(248, 244, 236, 0.6);
        }

        .petal-1 {
          left: 5%;
          width: 8px;
          height: 13px;
          animation-duration: 9s;
          animation-delay: 0s;
          top: -20px;
        }
        .petal-2 {
          left: 12%;
          width: 14px;
          height: 20px;
          animation-duration: 11s;
          animation-delay: 2s;
          top: -20px;
        }
        .petal-3 {
          left: 22%;
          width: 10px;
          height: 16px;
          animation-duration: 8s;
          animation-delay: 1s;
          top: -20px;
        }
        .petal-4 {
          left: 35%;
          width: 12px;
          height: 18px;
          animation-duration: 13s;
          animation-delay: 4s;
          top: -20px;
        }
        .petal-5 {
          left: 50%;
          width: 9px;
          height: 14px;
          animation-duration: 10s;
          animation-delay: 0.5s;
          top: -20px;
        }
        .petal-6 {
          left: 62%;
          width: 13px;
          height: 19px;
          animation-duration: 7s;
          animation-delay: 3s;
          top: -20px;
        }
        .petal-7 {
          left: 72%;
          width: 11px;
          height: 17px;
          animation-duration: 12s;
          animation-delay: 1.5s;
          top: -20px;
        }
        .petal-8 {
          left: 83%;
          width: 8px;
          height: 12px;
          animation-duration: 9s;
          animation-delay: 5s;
          top: -20px;
        }
        .petal-9 {
          left: 90%;
          width: 15px;
          height: 21px;
          animation-duration: 14s;
          animation-delay: 2.5s;
          top: -20px;
        }
        .petal-10 {
          left: 18%;
          width: 10px;
          height: 15px;
          animation-duration: 11s;
          animation-delay: 6s;
          top: -20px;
        }
        .petal-11 {
          left: 45%;
          width: 7px;
          height: 11px;
          animation-duration: 8s;
          animation-delay: 3.5s;
          top: -20px;
        }
        .petal-12 {
          left: 78%;
          width: 12px;
          height: 17px;
          animation-duration: 10s;
          animation-delay: 1s;
          top: -20px;
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(40px);
            opacity: 0;
          }
        }

        .flyer {
          position: relative;
          width: min(560px, 92vw);
          aspect-ratio: 1200 / 1890;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flyer-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          background-image: url('/images/bg.png');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          border-radius: 8px;
        }

        .flyer-frame {
          position: absolute;
          inset: 0;
          z-index: 3;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }
        .flyer-frame--bottom {
          object-position: bottom center;
        }
        .flyer-frame--top {
          object-position: bottom center;
          transform: scale(-1, -1);
        }

        .card {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(170, 150, 120, 0.18);
          border-radius: 6px;
          padding: 3.4rem 50px 2.8rem; /* Absolute boundary line */
          width: min(460px, 78%);
          text-align: center;
          box-shadow: 0 8px 48px rgba(180, 100, 120, 0.12),
            0 2px 12px rgba(0, 0, 0, 0.06);
        }

        /* ====== FIXES APPLIED BELOW ====== */

        .eyebrow {
          font-family: 'Libre Baskerville', serif;
          font-weight: 700;
          font-size: 21px;
          letter-spacing: 0.1em;
          color: #0a244e;
          text-transform: uppercase;
          margin: 0 0 1.5rem;
          line-height: 1;

          /* 3. Forces the text words to perfectly touch the left and right walls */
          width: 100%;
          text-align: center;
        }

        .names {
          font-family: 'Tan Pearl', 'Cormorant Garamond', serif;
          font-weight: normal;
          font-size: clamp(2.5rem, 13vw, 80px);
          color: #0a244e;
          margin: 0 0 2rem;
          margin-top: 4rem;
          width: 100%;
          line-height: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2em;
        }

        .name-row1 {
          display: block;
          text-align: left;
        }
        .name-row2 {
          display: block;
          text-align: right;
        }
        .ampersand {
          font-size: 0.65em;
          color: #0a244e;
          line-height: 1;
        }

        .date-label {
          font-family: 'Libre Baskerville', serif;
          font-size: 19px;
          color: #4a5f8a;
          width: 100%;
        }

        .date-hebrew {
          font-family: 'Libre Baskerville', serif;
          font-size: 19px;
          color: #4a5f8a;
          margin: 0.25rem 0 2.5rem;

          /* Forces the words of the date to occupy 100% of the horizontal space */
          width: 100%;
          text-align: center;
        }

        .countdown {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin: 0 auto 2.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: nowrap;
          width: 100%; /* Remains matched to bounding box */
        }

        .unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(10, 36, 78, 0.2);
          border-radius: 4px;
          padding: 0.8rem 0.5rem;
          flex: 1;
          min-width: 0;
        }

        .number {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 7vw, 2.4rem);
          font-weight: 400;
          color: #0a244e;
          line-height: 1;
        }

        .label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: clamp(0.6rem, 2.5vw, 0.7rem);
          letter-spacing: 0.1em;
          color: #4a5f8a;
          text-transform: uppercase;
          margin-top: 0.3rem;
        }

        .footer-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1rem, 4vw, 1.2rem);
          color: #4a5f8a;
          margin: 0;
          text-align: center;
          letter-spacing: 0.03em;
        }

        @media (max-width: 480px) {
          .page {
            padding: 0;
            align-items: stretch;
            justify-content: stretch;
          }
          .flyer {
            width: 100vw;
            height: 100vh;
            height: 100dvh;
            aspect-ratio: unset;
            border-radius: 0;
          }
          .flyer-bg,
          .flyer-frame--bottom,
          .flyer-frame--top {
            border-radius: 0;
          }
          .card {
            width: min(420px, 84%);
            padding: 2.2rem 50px 1.8rem;
            margin: 0.5rem;
            border-radius: 6px;
          }
          .names {
            margin: 0 0 2rem;
            width: 100%;
          }
          .countdown {
            gap: 0.35rem;
            margin-bottom: 1.5rem;
          }
          .unit {
            padding: 0.6rem 0;
          }
        }

        @media (max-width: 360px) {
          .card {
            padding: 2rem 50px 1.6rem;
          }
          .names {
            margin: 0 0 2rem;
            width: 100%;
          }
          .countdown {
            gap: 0.25rem;
          }
        }
      `}</style>
    </>
  );
}
