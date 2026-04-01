// ChatContainer.js
'use client'
import { useState, useCallback } from 'react'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

const ChatContainer = ({ activeChat = null, onUpdateChatHistory }) => {
  const [messages, setMessages] = useState([
    // ตัวอย่างข้อความเริ่มต้น (จะลบออกเมื่อมีข้อความจริง)
    // {
    //   id: '1',
    //   content: 'สวัสดีครับ! มีอะไรให้ช่วยเหลือไหมครับ?',
    //   sender: 'ai',
    //   type: 'text',
    //   timestamp: '14:30'
    // }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  // Handle sending message
  const handleSendMessage = useCallback(
    async messageData => {
      // เพิ่มข้อความของผู้ใช้
      setMessages(prev => [...prev, messageData])

      // แสดงสถานะกำลังพิมพ์
      setIsTyping(true)

      try {
        // จำลองการเรียก API (แทนที่ด้วย API จริง)
        const aiResponse = await simulateAIResponse(messageData)

        // เพิ่มการหน่วงเวลาเพื่อให้ดูเป็นธรรมชาติ
        await new Promise(resolve =>
          setTimeout(resolve, 1000 + Math.random() * 2000)
        )

        // เพิ่มข้อความตอบจาก AI
        setMessages(prev => [...prev, aiResponse])

        // อัพเดทประวัติการแชทใน sidebar (ถ้าต้องการ)
        if (onUpdateChatHistory && activeChat) {
          onUpdateChatHistory(activeChat.id, {
            lastMessage: aiResponse.content.substring(0, 50) + '...',
            timestamp: aiResponse.timestamp
          })
        }
      } catch (error) {
        console.error('Error sending message:', error)

        // แสดงข้อความ error
        const errorMessage = {
          id: Date.now() + '-error',
          content:
            'ขออภัยครับ เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง',
          sender: 'ai',
          type: 'error',
          timestamp: new Date().toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }

        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsTyping(false)
      }
    },
    [activeChat, onUpdateChatHistory]
  )

  // Handle quick suggestion clicks
  const handleSuggestionClick = useCallback(
    suggestionText => {
      const messageData = {
        id: Date.now().toString(),
        content: suggestionText,
        attachments: [],
        timestamp: new Date().toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        sender: 'user',
        type: 'text'
      }

      handleSendMessage(messageData)
    },
    [handleSendMessage]
  )

  // Handle voice recording
  const handleStartRecording = useCallback(() => {
    setIsRecording(true)
    // เพิ่ม logic สำหรับเริ่มบันทึกเสียง
    console.log('Start recording...')
  }, [])

  const handleStopRecording = useCallback(() => {
    setIsRecording(false)
    // เพิ่ม logic สำหรับหยุดบันทึกเสียงและแปลงเป็นข้อความ
    console.log('Stop recording...')

    // จำลองการแปลงเสียงเป็นข้อความ
    setTimeout(() => {
      const voiceMessage = {
        id: Date.now().toString(),
        content: 'ข้อความจากการบันทึกเสียง',
        attachments: [],
        timestamp: new Date().toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        sender: 'user',
        type: 'voice'
      }

      handleSendMessage(voiceMessage)
    }, 1000)
  }, [handleSendMessage])

  return (
    <div className='flex flex-col h-full'>
      <ChatMessages
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSuggestionClick}
      />

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isTyping}
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        placeholder={
          activeChat
            ? `Describe your product for ${activeChat.title}...`
            : 'Describe your product for HS code classification...'
        }
      />
    </div>
  )
}

const simulateAIResponse = async userMessage => {
  // ตัวอย่างการตอบสนองตามเนื้อหาข้อความ
  let responseContent = ''
  const userContent = userMessage.content.toLowerCase()

  if (
    userContent.includes('สวัสดี') ||
    userContent.includes('hello') ||
    userContent.includes('hi')
  ) {
    responseContent = `Hello! I'd be happy to help you classify your products for customs purposes using HS codes. 

To provide you with the most accurate HS code classification, I can assist with:
• Electronic devices and components
• Textiles and clothing
• Machinery and equipment  
• Food and agricultural products
• Chemical products
• And many other product categories

Please tell me about the product you need to classify, and if possible, share:
1. Product description and specifications
2. Images (if available)
3. Intended use or application
4. Materials used in manufacturing`
  } else if (
    userContent.includes('bluetooth') ||
    userContent.includes('speaker') ||
    userContent.includes('wireless')
  ) {
    responseContent = `Based on your description of a wireless Bluetooth speaker, this product would typically fall under:

**HS Code: 8518.22.00**
- **Description:** Loudspeakers, whether or not mounted in their enclosures
- **Specific classification:** Multiple loudspeakers, mounted in the same enclosure

**Key Details:**
• Duty Rate: Varies by country (typically 0-15%)
• The built-in battery and LED lights are considered accessory features
• Battery inclusion doesn't change the primary classification

**Required Documentation:**
• Commercial invoice with detailed product description
• Technical specifications
• Country of origin certificate  
• FCC/CE compliance certificates (if applicable)

Would you like me to provide more specific information about import requirements for your destination country?`
  } else if (
    userContent.includes('smartphone') ||
    userContent.includes('phone') ||
    userContent.includes('mobile')
  ) {
    responseContent = `For smartphones/mobile phones, the classification would be:

**HS Code: 8517.12.00**
- **Description:** Telephones for cellular networks or for other wireless networks

**Key Details:**
• Duty Rate: Varies by country (typically 0-25%)
• Includes accessories like chargers, earphones when sold together
• Different rates may apply for refurbished vs. new devices

**Additional Considerations:**
• IMEI registration requirements in many countries
• Type approval certificates needed
• Specific regulations for devices with cameras

Do you need information about specific country requirements or have questions about accessories classification?`
  } else if (
    userContent.includes('textile') ||
    userContent.includes('clothing') ||
    userContent.includes('fabric')
  ) {
    responseContent = `For textile and clothing products, classification depends on several factors:

**Common HS Codes:**
• **6109** - T-shirts, singlets (knitted)
• **6203** - Men's suits, trousers (woven)  
• **6204** - Women's suits, dresses (woven)
• **5208** - Cotton fabrics, woven

**Classification Factors:**
• Fiber composition (cotton, polyester, wool, etc.)
• Knitted vs. woven construction
• Gender and age group (men's, women's, children's)
• Specific garment type

**Required Information:**
• Detailed fiber content percentages
• Manufacturing process (knitted/woven)
• Intended use and target demographic

Could you provide more details about your specific textile product?`
  } else if (
    userContent.includes('electronic') ||
    userContent.includes('device') ||
    userContent.includes('gadget')
  ) {
    responseContent = `I'd be happy to help classify your electronic device! Electronic products have various HS code classifications depending on their primary function:

**Common Categories:**
• **8517** - Telecommunication equipment
• **8518** - Audio/sound equipment  
• **8519** - Sound recording/playback devices
• **8528** - Monitors, TVs, displays
• **8471** - Computers and components

**To provide accurate classification, please tell me:**
1. What type of electronic device is it?
2. What is its primary function?
3. Does it have wireless connectivity?
4. What are the key technical specifications?
5. Are there any additional features (camera, GPS, etc.)?

The more details you provide, the more precise the HS code classification will be!`
  } else if (
    userContent.includes('food') ||
    userContent.includes('agriculture') ||
    userContent.includes('beverage')
  ) {
    responseContent = `For food and agricultural products, HS classification is quite detailed:

**Major Categories:**
• **Chapter 02** - Meat and meat products
• **Chapter 04** - Dairy products  
• **Chapter 08** - Fruits and nuts
• **Chapter 09** - Coffee, tea, spices
• **Chapter 20** - Processed foods
• Health certificates
• Phytosanitary certificates
• FDA/food safety approvals
• Halal/kosher certifications (if applicable)

What specific food product do you need to classify?`
  } else {
    // ตอบสนองทั่วไป
    const responses = [
      `I understand. Could you provide more specific details about the product you need to classify? The more information you share, the more accurate the HS code classification will be.',
      'That's interesting! To give you the most precise HS code, could you tell me more about the product specifications, materials, or intended use?',
      'Thank you for your inquiry. For accurate customs classification, I'll need additional details about your product. What specific item are you looking to classify?',
      'I can help with that classification. Could you share more details about the product, such as its function, materials, or technical specifications?`
    ]
    responseContent = responses[Math.floor(Math.random() * responses.length)]
  }

  return {
    id: Date.now() + '-ai',
    content: responseContent,
    sender: 'ai',
    type: 'text',
    timestamp: new Date().toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

export default ChatContainer
