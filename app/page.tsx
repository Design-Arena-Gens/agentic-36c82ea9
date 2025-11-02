'use client'

import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import DesignGenerator from './components/DesignGenerator'
import LogoGenerator from './components/LogoGenerator'
import VideoGenerator from './components/VideoGenerator'
import { Sparkles, MessageCircle, Image, Palette, Video } from 'lucide-react'

type Tab = 'chat' | 'social' | 'logo' | 'video'

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('chat')
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Creative AI Agent
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            مساعدك الذكي للتصميم الاحترافي - تصميمات سوشيال ميديا، شعارات، هوية بصرية، وفيديوهات
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              المحادثة
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'social'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Image className="w-5 h-5" />
              تصميمات سوشيال ميديا
            </button>
            <button
              onClick={() => setActiveTab('logo')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'logo'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Palette className="w-5 h-5" />
              شعارات وهوية بصرية
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'video'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Video className="w-5 h-5" />
              الفيديوهات
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'chat' && <ChatInterface messages={messages} setMessages={setMessages} />}
            {activeTab === 'social' && <DesignGenerator />}
            {activeTab === 'logo' && <LogoGenerator />}
            {activeTab === 'video' && <VideoGenerator />}
          </div>
        </div>

        <footer className="text-center py-8 text-gray-600">
          <p>مدعوم بالذكاء الاصطناعي | جميع الحقوق محفوظة © 2024</p>
        </footer>
      </div>
    </main>
  )
}
