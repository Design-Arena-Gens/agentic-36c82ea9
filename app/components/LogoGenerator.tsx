'use client'

import { useState, useRef } from 'react'
import { Download, Zap, Heart, Star, Circle, Square, Triangle } from 'lucide-react'
import html2canvas from 'html2canvas'

type LogoStyle = 'minimal' | 'modern' | 'abstract' | 'geometric'
type IconType = 'zap' | 'heart' | 'star' | 'circle' | 'square' | 'triangle'

export default function LogoGenerator() {
  const [companyName, setCompanyName] = useState('شركتك')
  const [tagline, setTagline] = useState('شعارك هنا')
  const [logoStyle, setLogoStyle] = useState<LogoStyle>('minimal')
  const [iconType, setIconType] = useState<IconType>('zap')
  const [primaryColor, setPrimaryColor] = useState('#667eea')
  const [secondaryColor, setSecondaryColor] = useState('#764ba2')
  const [showIcon, setShowIcon] = useState(true)
  const logoRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const renderIcon = (size: number = 100) => {
    const props = { width: size, height: size, strokeWidth: 2 }
    const style = { color: primaryColor }

    switch (iconType) {
      case 'zap': return <Zap {...props} style={style} />
      case 'heart': return <Heart {...props} style={style} fill={primaryColor} />
      case 'star': return <Star {...props} style={style} fill={primaryColor} />
      case 'circle': return <Circle {...props} style={style} />
      case 'square': return <Square {...props} style={style} />
      case 'triangle': return <Triangle {...props} style={style} />
    }
  }

  const getLogoLayout = () => {
    switch (logoStyle) {
      case 'minimal':
        return {
          container: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            gap: '20px',
            padding: '40px',
            background: '#ffffff'
          },
          name: {
            fontSize: '48px',
            fontWeight: '300',
            color: '#333',
            letterSpacing: '2px'
          },
          tagline: {
            fontSize: '16px',
            color: '#666',
            letterSpacing: '3px',
            textTransform: 'uppercase' as const
          }
        }
      case 'modern':
        return {
          container: {
            display: 'flex',
            flexDirection: 'row' as const,
            alignItems: 'center',
            gap: '30px',
            padding: '40px',
            background: '#ffffff'
          },
          name: {
            fontSize: '52px',
            fontWeight: 'bold',
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          },
          tagline: {
            fontSize: '14px',
            color: '#888',
            marginTop: '5px'
          }
        }
      case 'abstract':
        return {
          container: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            gap: '25px',
            padding: '40px',
            background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
            borderRadius: '20px'
          },
          name: {
            fontSize: '56px',
            fontWeight: 'bold',
            color: primaryColor
          },
          tagline: {
            fontSize: '18px',
            color: '#555',
            fontStyle: 'italic'
          }
        }
      case 'geometric':
        return {
          container: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'flex-start',
            gap: '15px',
            padding: '40px',
            background: '#ffffff',
            borderLeft: `8px solid ${primaryColor}`
          },
          name: {
            fontSize: '50px',
            fontWeight: 'bold',
            color: '#222'
          },
          tagline: {
            fontSize: '16px',
            color: secondaryColor,
            fontWeight: '600'
          }
        }
    }
  }

  const handleDownloadLogo = async () => {
    if (logoRef.current) {
      const canvas = await html2canvas(logoRef.current, {
        scale: 3,
        backgroundColor: logoStyle === 'abstract' ? null : '#ffffff'
      })

      const link = document.createElement('a')
      link.download = `logo-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const handleDownloadBusinessCard = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: '#ffffff'
      })

      const link = document.createElement('a')
      link.download = `business-card-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const styles = getLogoLayout()

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">إعدادات الشعار</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشركة</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-right"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الشعار</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-right"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نمط الشعار</label>
              <div className="grid grid-cols-2 gap-2">
                {(['minimal', 'modern', 'abstract', 'geometric'] as LogoStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => setLogoStyle(style)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      logoStyle === style
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {style === 'minimal' && 'بسيط'}
                    {style === 'modern' && 'عصري'}
                    {style === 'abstract' && 'تجريدي'}
                    {style === 'geometric' && 'هندسي'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={showIcon}
                  onChange={(e) => setShowIcon(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-600"
                />
                <span className="text-sm font-medium text-gray-700">إظهار الأيقونة</span>
              </label>

              {showIcon && (
                <div className="grid grid-cols-3 gap-2">
                  {(['zap', 'heart', 'star', 'circle', 'square', 'triangle'] as IconType[]).map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setIconType(icon)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        iconType === icon
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {icon === 'zap' && <Zap className="w-6 h-6 mx-auto" />}
                      {icon === 'heart' && <Heart className="w-6 h-6 mx-auto" />}
                      {icon === 'star' && <Star className="w-6 h-6 mx-auto" />}
                      {icon === 'circle' && <Circle className="w-6 h-6 mx-auto" />}
                      {icon === 'square' && <Square className="w-6 h-6 mx-auto" />}
                      {icon === 'triangle' && <Triangle className="w-6 h-6 mx-auto" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللون الأساسي</label>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللون الثانوي</label>
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadLogo}
                className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <Download className="w-4 h-4" />
                تحميل الشعار
              </button>
              <button
                onClick={handleDownloadBusinessCard}
                className="bg-pink-600 text-white px-4 py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <Download className="w-4 h-4" />
                بطاقة أعمال
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
            <div ref={logoRef} style={styles.container}>
              {showIcon && logoStyle !== 'geometric' && (
                <div>{renderIcon(logoStyle === 'minimal' ? 60 : 80)}</div>
              )}
              <div style={{ textAlign: logoStyle === 'geometric' ? 'right' : 'center' }}>
                <div style={styles.name}>{companyName}</div>
                {logoStyle === 'modern' && showIcon && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {renderIcon(30)}
                  </div>
                )}
                <div style={styles.tagline}>{tagline}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-8">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">معاينة بطاقة الأعمال</h4>
            <div
              ref={cardRef}
              style={{
                width: '500px',
                height: '300px',
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                borderRadius: '15px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#ffffff',
                transform: 'scale(0.8)',
                transformOrigin: 'top right'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                  {showIcon && renderIcon(40)}
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{companyName}</div>
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>{tagline}</div>
              </div>

              <div style={{ fontSize: '14px', lineHeight: 1.8 }}>
                <div>جون دو</div>
                <div>المدير التنفيذي</div>
                <div style={{ marginTop: '10px' }}>
                  <div>info@company.com</div>
                  <div>+966 50 123 4567</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
