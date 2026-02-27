import Link from 'next/link';

export default function PaymentPending() {
  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginTop: '50px',
      }}
    >
      <h1 style={{ color: 'orange' }}>El pago está pendiente.</h1>
      <Link href="/">
        <a>Volver</a>
      </Link>
    </div>
  );
}
