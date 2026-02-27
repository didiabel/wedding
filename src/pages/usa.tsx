import React, { useState } from 'react';

import Layout from '../components/Layout';

export default function UsaPage() {
  const [copied, setCopied] = useState(false);
  const email = 'abbelectronics00@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        <div
          className="card"
          style={{ textAlign: 'center', maxWidth: '400px' }}
        >
          <h2>Donate via Zelle (USA)</h2>

          <p
            style={{ color: '#555', marginBottom: '1.5rem', lineHeight: '1.5' }}
          >
            Zelle does not support direct payment links (redirection buttons).
            <br />
            Please copy the email below and paste it into your banking app to
            send your donation.
          </p>

          <div
            style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              marginBottom: '1.5rem',
            }}
          >
            <p
              style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '1rem',
                wordBreak: 'break-all',
              }}
            >
              {email}
            </p>

            <button
              type="button"
              onClick={handleCopy}
              style={{
                backgroundColor: copied ? '#28a745' : '#6a1b9a',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              {copied ? (
                <>
                  <span>✓</span> Copied!
                </>
              ) : (
                <>
                  <span>📋</span> Copy Email
                </>
              )}
            </button>
          </div>

          <div className="footer">
            <p style={{ fontSize: '0.9rem', color: '#777', margin: 0 }}>
              Please include your name and donation purpose in the Zelle memo.
            </p>
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
              Thank you for your support!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
