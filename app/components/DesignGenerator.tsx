'use client'

import { useState, useRef } from 'react'
import { Download, Sparkles } from 'lucide-react'
import html2canvas from 'html2canvas'

type Platform = 'instagram' | 'facebook' | 'twitter' | 'linkedin'
type Template = 'modern' | 'minimal' | 'colorful' | 'gradient'

const platformSizes = {
  instagram: { width: 1080, height: 1080, label: 'Instagram Post (1:1)' },
  facebook: { width: 1200, height: 630, label: 'Facebook Post (1.91:1)' },
  twitter: { width: 1200, height: 675, label: 'Twitter Post (16:9)' },
  linkedin: { width: 1200, height: 627, label: 'LinkedIn Post (1.91:1)' }
}

export default function DesignGenerator() {
  const [platform, setPlatform] = useState<Platform>('instagram')
  const [template, setTemplate] = useState<Template>('modern')
  const [title, setTitle] = useState('عنوان التصميم')
  const [subtitle, setSubtitle] = useState('النص الفرعي هنا')
  const [bgColor, setBgColor] = useState('#667eea')
  const [textColor, setTextColor] = useState('#ffffff')
  const [accentColor, setAccentColor] = useState('#764ba2')
  const designRef = useRef<HTMLDivElement>(null)

  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          background: `linear-gradient(135deg, ${bgColor} 0%, ${accentColor} 100%)`,
          padding: '60px',
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px'
        }
      case 'minimal':
        return {
          background: bgColor,
          padding: '60px',
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'center',
          alignItems: 'flex-start',
          borderRight: `12px solid ${accentColor}`
        }
      case 'colorful':
        return {
          background: `radial-gradient(circle at 30% 107%, ${accentColor} 0%, ${bgColor} 90%)`,
          padding: '60px',
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'space-between',
          position: 'relative' as const
        }
      case 'gradient':
        return {
          background: `linear-gradient(to right, ${bgColor}, ${accentColor}, ${bgColor})`,
          padding: '60px',
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center' as const
        }
    }
  }

  const handleDownload = async () => {
    if (designRef.current) {
      const canvas = await html2canvas(designRef.current, {
        scale: 2,
        backgroundColor: null,
        width: platformSizes[platform].width,
        height: platformSizes[platform].height
      })

      const link = document.createElement('a')
      link.download = `${platform}-design-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">إعدادات التصميم</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المنصة</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                {Object.entries(platformSizes).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">القالب</label>
              <div className="grid grid-cols-2 gap-2">
                {(['modern', 'minimal', 'colorful', 'gradient'] as Template[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      template === t
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t === 'modern' && 'عصري'}
                    {t === 'minimal' && 'بسيط'}
                    {t === 'colorful' && 'ملون'}
                    {t === 'gradient' && 'متدرج'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-right"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">النص الفرعي</label>
              <textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-right"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللون الأساسي</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">لون النص</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللون الثانوي</label>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <Download className="w-5 h-5" />
              تحميل التصميم
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
        <div className="relative" style={{ maxWidth: '100%', overflow: 'hidden' }}>
          <div
            ref={designRef}
            style={{
              width: `${platformSizes[platform].width}px`,
              height: `${platformSizes[platform].height}px`,
              transform: 'scale(0.4)',
              transformOrigin: 'top center',
              ...getTemplateStyles()
            }}
          >
            {template === 'colorful' && (
              <>
                <div style={{
                  position: 'absolute',
                  top: '30px',
                  right: '30px',
                  width: '150px',
                  height: '150px',
                  background: textColor,
                  borderRadius: '50%',
                  opacity: 0.1
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '30px',
                  width: '200px',
                  height: '200px',
                  background: textColor,
                  borderRadius: '50%',
                  opacity: 0.1
                }} />
              </>
            )}

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontSize: template === 'minimal' ? '80px' : '90px',
                fontWeight: 'bold',
                color: textColor,
                marginBottom: '30px',
                textAlign: template === 'minimal' ? 'right' : 'center',
                lineHeight: 1.2,
                textShadow: template === 'modern' ? '0 4px 20px rgba(0,0,0,0.3)' : 'none'
              }}>
                {title}
              </h2>

              <p style={{
                fontSize: '42px',
                color: textColor,
                opacity: 0.9,
                textAlign: template === 'minimal' ? 'right' : 'center',
                lineHeight: 1.6,
                maxWidth: template === 'minimal' ? '80%' : '100%'
              }}>
                {subtitle}
              </p>

              {template === 'modern' && (
                <div style={{
                  marginTop: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '15px'
                }}>
                  <Sparkles style={{ color: textColor, width: '40px', height: '40px' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
