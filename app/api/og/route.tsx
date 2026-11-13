import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export async function GET(request: NextRequest) {
  let logoSrc: string | null = null
  try {
    const logoUrl = new URL('/logo.png', request.url)
    const res = await fetch(logoUrl)
    if (res.ok) {
      const buf = await res.arrayBuffer()
      logoSrc = `data:image/png;base64,${arrayBufferToBase64(buf)}`
    }
  } catch {
    logoSrc = null
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '800px',
          height: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFFFFF',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {logoSrc ? (
          <img
            src={logoSrc}
            width={560}
            height={335}
            alt="CV. Akbar Dharma Karya"
            style={{
              objectFit: 'contain',
            }}
          />
        ) : (
          <div
            style={{
              color: '#1E3A7A',
              fontSize: '48px',
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            CV. AKBAR DHARMA KARYA
          </div>
        )}
      </div>
    ),
    {
      width: 800,
      height: 800,
    }
  )
}
