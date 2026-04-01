// 'use client'
// import HeaderChat from '@/components/ChatWithAI/header'
// import SidebarChat from '@/components/ChatWithAI/sidebar'
// import React, { useState } from 'react'

// const ChatLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   return (
//     <div className='h-screen bg-gray-50 flex'>
//       {/* Sidebar */}
//       <div
//         className={`${
//           sidebarOpen ? 'w-80' : 'w-0'
//         } transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}
//       >
//         <SidebarChat
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//         />
//       </div>

//       {/* Main Chat Area */}

//       <div className='flex-1 flex flex-col'>
//         <HeaderChat sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         {children}

//       </div>
//     </div>
//   )
// }

// export default ChatLayout
