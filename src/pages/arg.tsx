/* eslint-disable no-console, no-alert */
import React, { useState } from 'react';

import Layout from '../components/Layout';

export default function ArgPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      telefono: (form.elements.namedItem('telefono') as HTMLInputElement).value,
      amount: (form.elements.namedItem('amount') as HTMLInputElement).value,
      motivo: (form.elements.namedItem('motivo') as HTMLInputElement).value,
    };

    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Error al generar el link.');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión.');
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="card">
          <h2>Hacer una Donación (Argentina)</h2>
          <form id="donation-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Tu Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="ejemplo@correo.com"
            />

            <label htmlFor="telefono">Teléfono (Opcional)</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="Ej: 11 1234 5678"
            />

            <label htmlFor="amount">Monto a donar (ARS)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              min="10"
              defaultValue="1000"
            />

            <label htmlFor="motivo">Motivo de la donación</label>
            <input
              type="text"
              id="motivo"
              name="motivo"
              required
              placeholder="Ej: Comedor, Ayuda social..."
            />

            <button type="submit" id="btn-pay" disabled={loading}>
              {loading ? 'Registrando...' : 'Ir a Pagar con Mercado Pago'}
            </button>
          </form>
          <div className="footer">
            Se registrará tu intención de donación al hacer clic.
          </div>
        </div>
      </div>
    </Layout>
  );
}
