import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'CV Akbar Dharma Karya'
  const description = searchParams.get('desc') || 'Cathodic Protection & Corrosion Control Specialist Indonesia'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #060B18 0%, #0a1628 50%, #0d1f3c 100%)',
          padding: '60px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,58,107,0.4) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '600px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(194,154,72,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #c29a48, #e8c97a, #c29a48)',
          }}
        />

        {/* Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              background: '#c29a48',
            }}
          />
          <span
            style={{
              color: '#c29a48',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            CV AKBAR DHARMA KARYA
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: '52px',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '800px',
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '22px',
            lineHeight: 1.5,
            maxWidth: '700px',
            marginBottom: '50px',
          }}
        >
          {description}
        </div>

        {/* Bottom info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(194,154,72,0.3)',
              borderRadius: '8px',
              padding: '10px 20px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px',
            }}
          >
            🌐 cathodic.akbardharmakarya.com
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 20px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px',
            }}
          >
            📍 DI Yogyakarta, Indonesia
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
