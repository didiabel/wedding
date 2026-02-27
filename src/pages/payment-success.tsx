/* eslint-disable no-console, @typescript-eslint/naming-convention */
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { guardarEnSheet } from '../utils/googleSheets';

const MP_ACCESS_TOKEN =
  'APP_USR-2240138789257429-022715-9befae9a8d8cda7566751364cfc93e67-458192513';

const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });

interface PaymentSuccessProps {
  approved: boolean;
  message: string;
}

export default function PaymentSuccess({
  approved,
  message,
}: PaymentSuccessProps) {
  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginTop: '50px',
      }}
    >
      {approved ? (
        <h1 style={{ color: 'green' }}>¡Gracias! Donación Confirmada.</h1>
      ) : (
        <h1 style={{ color: 'red' }}>{message}</h1>
      )}
      <Link href="/">
        <a>Volver</a>
      </Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { payment_id, collection_status } = context.query;

  if (collection_status === 'approved') {
    try {
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: payment_id as string });

      const metadata = paymentData.metadata || {};
      const motivo = metadata.motivo_donacion;
      const email = metadata.email_donante;
      const telefono = metadata.telefono_donante;
      const monto = paymentData.transaction_amount;
      const fecha = new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
      });

      // Guardamos DE NUEVO confirmando
      await guardarEnSheet({
        fecha,
        email,
        telefono: telefono || '-',
        monto: monto || 0,
        motivo,
        estado: 'PAGO_CONFIRMADO_MP',
      });

      return {
        props: {
          approved: true,
          message: 'Donación confirmada.',
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {
          approved: true, // Still approved by MP, but sheet update failed
          message: 'Pago exitoso. Gracias.',
        },
      };
    }
  } else {
    return {
      props: {
        approved: false,
        message: 'Pago no aprobado.',
      },
    };
  }
};
