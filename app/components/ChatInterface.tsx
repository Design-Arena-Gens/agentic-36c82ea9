'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatInterfaceProps {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export default function ChatInterface({ messages, setMessages }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('سوشيال ميديا') || lowerMessage.includes('تصميم') || lowerMessage.includes('منشور')) {
      return 'يمكنني مساعدتك في تصميم منشورات سوشيال ميديا احترافية! انتقل إلى تبويب "تصميمات سوشيال ميديا" لإنشاء تصميمات جذابة لـ Instagram, Facebook, Twitter والمزيد. يمكنك اختيار القالب والألوان والمحتوى حسب رغبتك.'
    }

    if (lowerMessage.includes('شعار') || lowerMessage.includes('لوجو') || lowerMessage.includes('هوية')) {
      return 'سأساعدك في إنشاء شعار وهوية بصرية كاملة لعلامتك التجارية! اذهب إلى تبويب "شعارات وهوية بصرية" حيث يمكنك تصميم شعار فريد مع بطاقات الأعمال، الأوراق الرسمية، وكل ما تحتاجه لهوية متكاملة.'
    }

    if (lowerMessage.includes('فيديو') || lowerMessage.includes('ريلز') || lowerMessage.includes('animation')) {
      return 'أستطيع مساعدتك في إنشاء فيديوهات ترويجية وريلز احترافية! توجه إلى تبويب "الفيديوهات" لإنشاء محتوى فيديو متحرك وجذاب لقنواتك على YouTube, Instagram Reels, TikTok وغيرها.'
    }

    if (lowerMessage.includes('مساعدة') || lowerMessage.includes('help') || lowerMessage.includes('كيف')) {
      return `مرحباً بك! أنا Creative AI Agent، مساعدك الذكي للتصميم. يمكنني مساعدتك في:

📱 تصميمات سوشيال ميديا احترافية (Instagram, Facebook, Twitter)
🎨 شعارات وهوية بصرية كاملة (Logo, Business Cards, Letterheads)
🎬 فيديوهات ترويجية وريلز (YouTube, Reels, TikTok)

استخدم التبويبات في الأعلى للوصول إلى الأدوات، أو أخبرني بما تحتاجه وسأرشدك!`
    }

    if (lowerMessage.includes('ألوان') || lowerMessage.includes('colors')) {
      return 'الألوان مهمة جداً في التصميم! أنصحك باختيار:\n\n🔵 الأزرق: للثقة والاحترافية\n🔴 الأحمر: للطاقة والشغف\n🟢 الأخضر: للنمو والصحة\n🟣 البنفسجي: للإبداع والفخامة\n🟡 الأصفر: للسعادة والتفاؤل\n\nيمكنك تجربة مجموعات ألوان مختلفة في أي من أدوات التصميم المتاحة!'
    }

    return `شكراً لتواصلك! أنا هنا لمساعدتك في جميع احتياجاتك الإبداعية. يمكنني:

✨ تصميم منشورات سوشيال ميديا جذابة
✨ إنشاء شعارات وهوية بصرية متكاملة
✨ تصميم فيديوهات ترويجية وريلز

اختر أي تبويب من الأعلى لبدء الإنشاء، أو اسألني عن أي استفسار تصميمي!`
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = generateResponse(input)
      const assistantMessage: Message = { role: 'assistant', content: response }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <Bot className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">مرحباً بك!</h3>
            <p>أنا مساعدك الذكي للتصميم. كيف يمكنني مساعدتك اليوم؟</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-800 shadow-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white text-gray-800 shadow-md rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="اكتب رسالتك هنا..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-right"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
