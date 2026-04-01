'use client'
import React, { useState } from 'react'
import ConversationsList from './ConversationsList'
import UserProfile from './UserProfile'
import SidebarHeader from './SidebarHeader'

const SidebarChat = ({ sidebarOpen, setSidebarOpen = null }) => {
  const [conversations] = useState([
    {
      id: 1,
      title: 'Electronics Classification',
      timestamp: '2 hours ago',
      preview: 'I need help classifying a smartphone...'
    },
    {
      id: 2,
      title: 'Textile Products',
      timestamp: '1 day ago',
      preview: 'What HS code for cotton fabric?'
    },
    {
      id: 3,
      title: 'Automotive Parts',
      timestamp: '3 days ago',
      preview: 'Car brake pads classification...'
    },
    {
      id: 4,
      title: 'Food Products',
      timestamp: '1 week ago',
      preview: 'Import duties for organic honey...'
    }
  ])
  return (
    <>
      <SidebarHeader setSidebarOpen={setSidebarOpen} />
      <ConversationsList conversations={conversations} />
      <UserProfile />
    </>
  )
}

export default SidebarChat
