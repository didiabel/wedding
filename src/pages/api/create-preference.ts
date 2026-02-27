/* eslint-disable no-console, consistent-return */
import { MercadoPagoConfig, Preference } from 'mercadopago';
import type { NextApiRequest, NextApiResponse } from 'next';

import { guardarEnSheet } from '../../utils/googleSheets';

const MP_ACCESS_TOKEN =
  'APP_USR-2240138789257429-022715-9befae9a8d8cda7566751364cfc93e67-458192513';

const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { amount, motivo, email, telefono } = req.body;
  const fecha = new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
  });

  console.log('1. Nuevo intento de donación recibido.');

  // PASO 1: GUARDAR EL INTENTO
  try {
    await guardarEnSheet({
      fecha,
      email,
      telefono: telefono || '-',
      monto: amount,
      motivo,
      estado: 'INTENTO_INICIADO',
    });
  } catch (error) {
    console.error('Error saving to sheet (continuing anyway):', error);
  }

  // PASO 2: CREAR PREFERENCIA EN MERCADO PAGO
  try {
    const preference = new Preference(client);

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const result = await preference.create({
      body: {
        items: [
          {
            id: 'donacion-01',
            title: `Donación: ${motivo}`,
            quantity: 1,
            unit_price: Number(amount),
            currency_id: 'ARS',
          },
        ],
        payer: {
          email,
        },
        metadata: {
          motivo_donacion: motivo,
          email_donante: email,
          telefono_donante: telefono,
        },
        back_urls: {
          success: `${baseUrl}/payment-success`,
          failure: `${baseUrl}/payment-failure`,
          pending: `${baseUrl}/payment-pending`,
        },
        auto_return: 'approved',
      },
    });

    res.status(200).json({ init_point: result.init_point });
  } catch (error) {
    console.error('❌ Error MP:', error);
    res.status(500).json({ error: 'Error al generar el pago' });
  }
}
