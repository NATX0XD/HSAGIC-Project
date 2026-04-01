'use client'
import React, { useRef, useState } from 'react'
import SectionChatView from './SectionChatView'
import SectionMessageInput from './SectionMessageInput'

const ChatWithAI = () => {
  const [chatMessages] = useState([
    {
      id: 1,
      type: 'user',
      content:
        'Hi! I need help classifying this electronic device for customs.',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'assistant',
      content:
        "Hello! I'd be happy to help you classify your electronic device for customs purposes. To provide you with the most accurate HS code classification, could you please:\n\n1. Tell me more about the specific electronic device\n2. Share any product images if available\n3. Provide technical specifications or product description\n\nThis information will help me determine the correct Harmonized System (HS) code and applicable duty rates.",
      timestamp: '10:30 AM'
    },
    {
      id: 3,
      type: 'user',
      content:
        "It's a wireless Bluetooth speaker with built-in battery and LED lights.",
      timestamp: '10:32 AM',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      type: 'assistant',
      content:
        "Based on your description of a wireless Bluetooth speaker with built-in battery and LED lights, this product would typically fall under:\n\n**HS Code: 8518.22.00**\n- Description: Loudspeakers, whether or not mounted in their enclosures\n- Specific classification: Multiple loudspeakers, mounted in the same enclosure\n\n**Key Details:**\n- Duty Rate: Varies by country (typically 0-15%)\n- Additional considerations: The LED lights are considered an accessory feature\n- Battery inclusion doesn't change the primary classification\n\n**Required Documentation:**\n- Commercial invoice\n- Technical specifications\n- Country of origin certificate\n- FCC compliance (if applicable)\n\nWould you like me to provide more specific information about import requirements for your destination country?",
      timestamp: '10:33 AM'
    }
  ])
  const [message, setMessage] = useState('')

  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleSendMessage = () => {
    if (message.trim() || selectedFile) {
      // Handle sending message
      console.log('Sending message:', message, selectedFile)
      setMessage('')
      setSelectedFile(null)
    }
  }

  const handleFileSelect = event => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  return (
    <>
      <SectionChatView chatMessages={chatMessages} />
      <SectionMessageInput
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        handleFileSelect={handleFileSelect}
        handleKeyPress={handleKeyPress}
        fileInputRef={fileInputRef}
      />
    </>
  )
}

export default ChatWithAI
