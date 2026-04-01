import {
  BarChart3,
  Settings,
  Upload,
  MessageSquare,
  Database,
  Users,
  FileText,
  Activity
} from 'lucide-react'
const Navigation = [
  {
    icon: BarChart3,
    label: 'Dashboard',
    id: 'dashboard',
    path: '/',
    description: 'Overview & Analytics'
  },
  {
    icon: Settings,
    label: 'AI Configuration',
    id: 'ai-config',
    path: '/ai-config',
    description: 'Model Settings'
  },
  {
    icon: Upload,
    label: 'Data Upload',
    id: 'upload',
    path: '/data-upload',
    description: 'File Management'
  },
  {
    icon: Database,
    label: 'Vector Management',
    id: 'vectors',
    path: '/vectors',
    description: 'Build & Manage Vectors'
  },
  {
    icon: MessageSquare,
    label: 'Chat Testing',
    id: 'chat-test',
    path: '/chat-test',
    description: 'Test AI Responses'
  },
  {
    icon: FileText,
    label: 'Prompt Editor',
    id: 'prompt-editor',
    path: '/prompt-editor',
    description: 'Edit AI Prompts'
  },
  {
    icon: Users,
    label: 'User Management',
    id: 'users',
    path: '/users',
    description: 'Admin & Staff'
  },
  {
    icon: Activity,
    label: 'Performance',
    id: 'performance',
    path: '/performance',
    description: 'System Metrics'
  }
]
export default Navigation
