'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Settings, Download, Trash2 } from 'lucide-react'
import { usePageTitle } from '@/context/PageTitleContext'
import { generateChatResponse, formatTime } from '@/utils/chat'
import SettingsModal from './SettingsModal'
import MessagesList from './MessagesList'
import ChatHeader from './ChatHeader'
import InputBar from './InputBar'

const ChatTestingContent = () => {
  const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle('AI Chat Testing')
  }, [setTitle])

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      content: 'What is the HS code for wireless bluetooth headphones?',
      timestamp: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
      id: 2,
      type: 'ai',
      content:
        'Based on the product description, wireless Bluetooth headphones would typically fall under:\n\n**HS Code: 8518.30.20**\n\n**Classification:** Headphones and earphones, whether or not combined with a microphone, and sets consisting of a microphone and one or more loudspeakers.\n\n**Key factors for this classification:**\n• Audio reproduction device\n• Wireless connectivity (Bluetooth)\n• Personal use headphones\n• Electronic device for sound transmission\n\n**Confidence Level:** 94%\n**Response Time:** 1.2s',
      timestamp: new Date(Date.now() - 9.5 * 60 * 1000),
      responseTime: 1.2,
      confidence: 94,
      accuracy: null,
      model: 'GPT-4',
      vector: 'HS_Codes_Vector_v2.4'
    }
  ])

  const [currentMessage, setCurrentMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedVector, setSelectedVector] = useState('HS_Codes_Vector_v2.4')
  const [selectedModel, setSelectedModel] = useState('GPT-4')
  const [temperature, setTemperature] = useState(0.7)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const vectors = [
    'HS_Codes_Vector_v2.4',
    'Customs_Rules_Vector_v1.2',
    'Trade_Classifications_v1.0'
  ]
  const models = ['GPT-4', 'GPT-3.5 Turbo', 'Claude-3', 'Gemini Pro']
  const testPrompts = [
    'What is the HS code for organic cotton t-shirts?',
    'Classify stainless steel kitchen knives',
    'HS code for electric vehicle batteries',
    'Classification for smartphone protective cases made of silicone',
    'What code applies to frozen salmon fillets?',
    'Bamboo furniture classification',
    'Solar panel HS code determination'
  ]

  // enriched messages (formatted time)
  const enriched = useMemo(
    () =>
      messages.map(m => ({ ...m, _formattedTime: formatTime(m.timestamp) })),
    [messages]
  )

  const sendMessage = (content = currentMessage) => {
    if (!content.trim()) return
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setCurrentMessage('')
    setIsTyping(true)
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateChatResponse(content),
        timestamp: new Date(),
        responseTime: (Math.random() * 2 + 0.5).toFixed(1),
        confidence: Math.floor(Math.random() * 20) + 80,
        accuracy: null,
        model: selectedModel,
        vector: selectedVector
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1200 + Math.random() * 800)
  }

  const onCopy = text => navigator.clipboard.writeText(text)
  const onAccuracy = (id, acc) =>
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, accuracy: acc } : m))
    )
  const clearChat = () => setMessages([])
  const exportChat = () => {
    const data = messages.map(m => ({
      type: m.type,
      content: m.content,
      timestamp: m.timestamp.toISOString(),
      ...(m.type === 'ai' && {
        responseTime: m.responseTime,
        confidence: m.confidence,
        accuracy: m.accuracy,
        model: m.model,
        vector: m.vector
      })
    }))
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-test-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handlePickPrompt = p => {
    setCurrentMessage(p)
    setShowSettingsModal(false)
  }
  const handleSaveSettings = () => {
    // TODO: persist to localStorage/API
    setShowSettingsModal(false)
  }

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>AI Chat Testing</h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Test AI responses and prompts in real-time
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => setShowSettingsModal(true)}
            className='flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg'
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
          <button
            onClick={exportChat}
            className='flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg'
          >
            <Download size={16} />
            <span>Export</span>
          </button>
          <button
            onClick={clearChat}
            className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg'
          >
            <Trash2 size={16} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Chat Card */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-[calc(100vh-15rem)] flex flex-col'>
        <ChatHeader model={selectedModel} vector={selectedVector} />
        <MessagesList
          messages={enriched}
          isTyping={isTyping}
          onCopy={onCopy}
          onAccuracy={onAccuracy}
        />
        <InputBar
          value={currentMessage}
          onChange={setCurrentMessage}
          onSend={() => sendMessage()}
          disabled={isTyping}
        />
      </div>

      {/* Settings Modal */}
      <SettingsModal
        open={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        models={models}
        vectors={vectors}
        testPrompts={testPrompts}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        selectedVector={selectedVector}
        setSelectedVector={setSelectedVector}
        temperature={temperature}
        setTemperature={setTemperature}
        onPickPrompt={handlePickPrompt}
        onSave={handleSaveSettings}
      />
    </div>
  )
}

export default ChatTestingContent
