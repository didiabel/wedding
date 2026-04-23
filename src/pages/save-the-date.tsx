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
  const boda = new Date('2026-10-18T18:00:00');
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
          content="¡Guarden esta fecha! Los invitamos a celebrar nuestro casamiento."
        />
        <meta property="og:image" content={`${baseUrl}/api/og/`} />
        <meta property="og:image:secure_url" content={`${baseUrl}/api/og/`} />
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
          content="¡Guarden esta fecha! Los invitamos a celebrar nuestro casamiento."
        />
        <meta name="twitter:image" content={`${baseUrl}/api/og/`} />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="page">
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`petal petal-${i + 1}`} aria-hidden="true" />
        ))}

        <div className="card">
          <p className="eyebrow">— Guarden esta fecha —</p>

          <h1 className="names">
            <span>Mijal</span>
            <span className="ampersand">&amp;</span>
            <span>Didi</span>
          </h1>

          <div className="divider">
            <span className="line" />
            <span className="diamond">◆</span>
            <span className="line" />
          </div>

          <p className="date-label">18 de Octubre</p>
          <p className="year">2026</p>

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

          <p className="footer-text">Con amor, los esperamos</p>
        </div>
      </main>

      <style jsx>{`
        .page {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #fdf6f0 0%,
            #fce8e0 40%,
            #f5dce8 100%
          );
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
          background: rgba(220, 140, 160, 0.45);
        }
        .petal:nth-child(even) {
          background: rgba(240, 180, 160, 0.4);
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

        .card {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(220, 160, 170, 0.3);
          border-radius: 4px;
          padding: 3.5rem 3rem 3rem;
          max-width: 520px;
          width: 100%;
          text-align: center;
          box-shadow: 0 8px 48px rgba(180, 100, 120, 0.12),
            0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          color: #b07a8a;
          text-transform: uppercase;
          margin: 0 0 2rem;
        }

        .names {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(3rem, 14vw, 4.4rem);
          color: #6d3a4a;
          margin: 0;
          line-height: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.05em;
        }

        .ampersand {
          font-style: italic;
          font-size: 0.62em;
          color: #c07a90;
          line-height: 1;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.6rem auto;
          width: 55%;
        }
        .line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            #d4a0b0,
            transparent
          );
        }
        .diamond {
          font-size: 0.45rem;
          color: #c07a90;
        }

        .date-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1.6rem, 7vw, 2.1rem);
          color: #8a4a5a;
          margin: 0;
          letter-spacing: 0.04em;
        }

        .year {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 0.85rem;
          letter-spacing: 0.28em;
          color: #b07a8a;
          margin: 0.4rem 0 2rem;
        }

        .countdown {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin: 0 0 2rem;
          flex-wrap: nowrap;
        }

        .unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 240, 242, 0.7);
          border: 1px solid rgba(210, 150, 165, 0.25);
          border-radius: 3px;
          padding: 0.75rem 0;
          flex: 1;
          min-width: 0;
        }

        .number {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 7vw, 2.2rem);
          font-weight: 300;
          color: #6d3a4a;
          line-height: 1;
        }

        .label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: clamp(0.5rem, 2vw, 0.6rem);
          letter-spacing: 0.14em;
          color: #b07a8a;
          text-transform: uppercase;
          margin-top: 0.3rem;
        }

        .footer-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1rem;
          color: #b07a8a;
          margin: 0;
          letter-spacing: 0.06em;
        }

        @media (max-width: 480px) {
          .card {
            padding: 2.2rem 1.4rem 1.8rem;
            margin: 0.5rem;
            border-radius: 6px;
          }
          .eyebrow {
            font-size: 0.62rem;
            letter-spacing: 0.16em;
            margin-bottom: 1.5rem;
          }
          .divider {
            width: 70%;
            margin: 1.2rem auto;
          }
          .year {
            margin-bottom: 1.5rem;
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
            padding: 2rem 1rem 1.6rem;
          }
          .countdown {
            gap: 0.25rem;
          }
        }
      `}</style>
    </>
  );
}
