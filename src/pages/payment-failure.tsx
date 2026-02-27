import Link from 'next/link';

export default function PaymentFailure() {
  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginTop: '50px',
      }}
    >
      <h1 style={{ color: 'red' }}>El pago falló.</h1>
      <Link href="/">
        <a>Volver</a>
      </Link>
    </div>
  );
}
