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
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'CV. AKBAR DHARMA KARYA'
  const description = searchParams.get('desc') || 'CATHODIC PROTECTION & CORROSION CONTROL'

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
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 50%, #F1F5F9 100%)',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '12px',
            background: 'linear-gradient(90deg, #1E3A7A 0%, #EA621F 50%, #C29A48 100%)',
          }}
        />

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '12px',
            background: 'linear-gradient(90deg, #1E3A7A 0%, #EA621F 50%, #C29A48 100%)',
          }}
        />

        {/* Centered column (fits cleanly inside 630x630 square center crop) */}
        <div
          style={{
            width: '580px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {logoSrc && (
            <img
              src={logoSrc}
              width={340}
              height={203}
              alt="CV. Akbar Dharma Karya"
              style={{
                marginBottom: '28px',
                objectFit: 'contain',
              }}
            />
          )}

          <div
            style={{
              color: '#0F172A',
              fontSize: '40px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            {title}
          </div>

          <div
            style={{
              color: '#EA621F',
              fontSize: '21px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textAlign: 'center',
              background: 'rgba(234, 98, 31, 0.08)',
              border: '2px solid rgba(234, 98, 31, 0.25)',
              borderRadius: '999px',
              padding: '8px 24px',
            }}
          >
            {description}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
