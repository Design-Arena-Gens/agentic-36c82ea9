'use client'

import { useState, useRef, useEffect } from 'react'
import { Download, Play, Pause } from 'lucide-react'
import html2canvas from 'html2canvas'

type VideoStyle = 'promo' | 'story' | 'announcement' | 'quote'
type AnimationType = 'fade' | 'slide' | 'zoom' | 'bounce'

export default function VideoGenerator() {
  const [title, setTitle] = useState('عنوان الفيديو')
  const [subtitle, setSubtitle] = useState('النص الفرعي أو الوصف')
  const [videoStyle, setVideoStyle] = useState<VideoStyle>('promo')
  const [animation, setAnimation] = useState<AnimationType>('fade')
  const [bgColor, setBgColor] = useState('#667eea')
  const [accentColor, setAccentColor] = useState('#764ba2')
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const videoRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getAnimationClass = () => {
    if (!isAnimating) return ''

    switch (animation) {
      case 'fade':
        return 'animate-fade-in'
      case 'slide':
        return 'animate-slide-in'
      case 'zoom':
        return 'animate-zoom-in'
      case 'bounce':
        return 'animate-bounce-in'
      default:
        return ''
    }
  }

  const getVideoStyle = () => {
    switch (videoStyle) {
      case 'promo':
        return {
          background: `linear-gradient(135deg, ${bgColor}, ${accentColor})`,
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          textAlign: 'center' as const
        }
      case 'story':
        return {
          background: `radial-gradient(circle at center, ${accentColor}, ${bgColor})`,
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'flex-end',
          padding: '60px',
          paddingBottom: '100px'
        }
      case 'announcement':
        return {
          background: bgColor,
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '60px',
          borderRight: `15px solid ${accentColor}`
        }
      case 'quote':
        return {
          background: `linear-gradient(to bottom right, ${bgColor}, ${accentColor})`,
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          textAlign: 'center' as const,
          position: 'relative' as const
        }
    }
  }

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
    if (!isAnimating) {
      setCurrentFrame(0)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentFrame(prev => {
          if (prev >= 100) {
            setIsAnimating(false)
            return 0
          }
          return prev + 1
        })
      }, 30)
    }
    return () => clearInterval(interval)
  }, [isAnimating])

  const handleDownloadFrame = async () => {
    if (videoRef.current) {
      const canvas = await html2canvas(videoRef.current, {
        scale: 2,
        backgroundColor: null,
        width: 1080,
        height: 1920
      })

      const link = document.createElement('a')
      link.download = `video-frame-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const handleDownloadSequence = async () => {
    alert('سيتم تحميل إطار واحد. يمكنك استخدام برنامج تحرير فيديو مثل CapCut أو Adobe Premiere لإنشاء فيديو متحرك من عدة إطارات.')
    handleDownloadFrame()
  }

  const styles = getVideoStyle()
  const opacity = isAnimating ? Math.min(currentFrame / 30, 1) : 1
  const scale = isAnimating && animation === 'zoom' ? 0.5 + (currentFrame / 100) * 0.5 : 1
  const translateX = isAnimating && animation === 'slide' ? `${100 - currentFrame}%` : '0'

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">إعدادات الفيديو</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع الفيديو</label>
            <div className="grid grid-cols-2 gap-2">
              {(['promo', 'story', 'announcement', 'quote'] as VideoStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => setVideoStyle(style)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    videoStyle === style
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {style === 'promo' && 'ترويجي'}
                  {style === 'story' && 'ستوري'}
                  {style === 'announcement' && 'إعلان'}
                  {style === 'quote' && 'اقتباس'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع الحركة</label>
            <div className="grid grid-cols-2 gap-2">
              {(['fade', 'slide', 'zoom', 'bounce'] as AnimationType[]).map((anim) => (
                <button
                  key={anim}
                  onClick={() => setAnimation(anim)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    animation === anim
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {anim === 'fade' && 'تلاشي'}
                  {anim === 'slide' && 'انزلاق'}
                  {anim === 'zoom' && 'تكبير'}
                  {anim === 'bounce' && 'قفز'}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">النص</label>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-right"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
            onClick={toggleAnimation}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isAnimating ? 'إيقاف المعاينة' : 'تشغيل المعاينة'}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadFrame}
              className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <Download className="w-4 h-4" />
              تحميل إطار
            </button>
            <button
              onClick={handleDownloadSequence}
              className="bg-pink-600 text-white px-4 py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <Download className="w-4 h-4" />
              تصدير فيديو
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>نصيحة:</strong> بعد تحميل الإطارات، يمكنك استخدام أي برنامج تحرير فيديو مثل CapCut أو Adobe Premiere لدمج الإطارات في فيديو متحرك كامل.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
        <div className="relative" style={{ maxWidth: '100%', overflow: 'hidden' }}>
          <div
            ref={videoRef}
            style={{
              width: '1080px',
              height: '1920px',
              transform: 'scale(0.25)',
              transformOrigin: 'top center',
              ...styles
            }}
          >
            {videoStyle === 'quote' && (
              <>
                <div style={{
                  position: 'absolute',
                  top: '80px',
                  right: '80px',
                  fontSize: '200px',
                  color: '#ffffff',
                  opacity: 0.2,
                  fontWeight: 'bold'
                }}>"</div>
                <div style={{
                  position: 'absolute',
                  bottom: '80px',
                  left: '80px',
                  fontSize: '200px',
                  color: '#ffffff',
                  opacity: 0.2,
                  fontWeight: 'bold'
                }}>"</div>
              </>
            )}

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                opacity,
                transform: `scale(${scale}) translateX(${translateX})`,
                transition: isAnimating ? 'none' : 'all 0.3s ease'
              }}
            >
              <h2 style={{
                fontSize: videoStyle === 'story' ? '100px' : '120px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '40px',
                textAlign: videoStyle === 'announcement' ? 'right' : 'center',
                lineHeight: 1.2,
                textShadow: '0 4px 30px rgba(0,0,0,0.4)'
              }}>
                {title}
              </h2>

              <p style={{
                fontSize: '52px',
                color: '#ffffff',
                opacity: 0.95,
                textAlign: videoStyle === 'announcement' ? 'right' : 'center',
                lineHeight: 1.6,
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                maxWidth: videoStyle === 'announcement' ? '80%' : '100%'
              }}>
                {subtitle}
              </p>

              {videoStyle === 'promo' && (
                <div style={{
                  marginTop: '80px',
                  padding: '30px 60px',
                  background: '#ffffff',
                  color: bgColor,
                  borderRadius: '60px',
                  fontSize: '48px',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}>
                  ابدأ الآن
                </div>
              )}
            </div>

            {isAnimating && (
              <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '40px',
                right: '40px',
                height: '8px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${currentFrame}%`,
                  height: '100%',
                  background: '#ffffff',
                  transition: 'width 0.03s linear'
                }} />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes zoomIn {
          from { transform: scale(0.5); }
          to { transform: scale(1); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        .animate-slide-in { animation: slideIn 1s ease-out; }
        .animate-zoom-in { animation: zoomIn 1s ease-out; }
        .animate-bounce-in { animation: bounceIn 1s ease-out; }
      `}</style>
    </div>
  )
}
