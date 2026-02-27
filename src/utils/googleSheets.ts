/* eslint-disable no-console */
import path from 'path';

import { google } from 'googleapis';

// --- 1. CONFIGURACIÓN ---
const SPREADSHEET_ID = '1Aqy21oAJbOdaOXGcyOfD98rICYY_ipH9w6tIQdc75SA';

// Use environment variable or fallback to local file
const KEY_FILE = path.join(process.cwd(), 'credentials.json');

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE,
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

interface DatosDonacion {
  fecha: string;
  email: string;
  telefono: string;
  monto: string | number;
  motivo: string;
  estado: string;
}

// --- 2. FUNCIÓN PARA GUARDAR EN SHEET ---
export async function guardarEnSheet(datos: DatosDonacion) {
  console.log('📝 Guardando en Sheet:', datos.email, datos.estado);
  try {
    const authClient = await auth.getClient();
    const googleSheets = google.sheets({
      version: 'v4',
      auth: authClient as any,
    });

    await googleSheets.spreadsheets.values.append({
      auth: auth as any,
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            datos.fecha,
            datos.email,
            datos.telefono,
            datos.monto,
            datos.motivo,
            datos.estado,
          ],
        ],
      },
    });
    console.log('✅ Guardado exitoso en Sheet.');
  } catch (error: any) {
    console.error('❌ Error guardando en Sheets:', error.message);
    throw error;
  }
}
