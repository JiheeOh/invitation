'use client';

import React, { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          background: '#B8756B',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}
