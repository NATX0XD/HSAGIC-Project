import React, { useState } from 'react'
import {
  Search,
  Check,
  X,
  Zap,
  Crown,
  Shield,
  Users,
  MessageCircle,
  Upload,
  Clock,
  Star,
  Sparkles,
  Bot,
  Database,
  TrendingUp,
  Lock,
  Eye,
  FileText,
  Settings,
  Headphones,
  Rocket
} from 'lucide-react'

const SubscriptionPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = {
    free: {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started with AI',
      features: [
        { name: 'Basic HS code classification', included: true, icon: Search },
        { name: 'Up to 10 queries per month', included: true, icon: Database },
        { name: 'Text-based queries only', included: true, icon: FileText },
        { name: 'Basic support', included: true, icon: Headphones },
        { name: 'Image recognition', included: false, icon: Eye },
        { name: 'Advanced AI analysis', included: false, icon: Bot },
        { name: 'Bulk processing', included: false, icon: Upload },
        { name: 'API access', included: false, icon: Settings },
        { name: 'Priority support', included: false, icon: Crown },
        { name: 'Custom integrations', included: false, icon: Zap },
        { name: 'Detailed reports', included: false, icon: TrendingUp },
        { name: 'Team collaboration', included: false, icon: Users }
      ],
      color: 'gray',
      popular: false,
      gradient: 'from-gray-600 to-gray-700'
    },
    pro: {
      name: 'Professional',
      price: { monthly: 29, yearly: 290 },
      description: 'AI-powered solution for businesses',
      features: [
        {
          name: 'Advanced HS code classification',
          included: true,
          icon: Search
        },
        { name: 'Unlimited queries', included: true, icon: Database },
        { name: 'Image recognition & analysis', included: true, icon: Eye },
        { name: 'Advanced AI analysis', included: true, icon: Bot },
        {
          name: 'Bulk processing (up to 100 items)',
          included: true,
          icon: Upload
        },
        { name: 'API access', included: true, icon: Settings },
        { name: 'Priority support', included: true, icon: Crown },
        {
          name: 'Detailed reports & analytics',
          included: true,
          icon: TrendingUp
        },
        { name: 'Custom integrations', included: false, icon: Zap },
        {
          name: 'Team collaboration (up to 5 users)',
          included: true,
          icon: Users
        },
        { name: 'Export compliance checking', included: true, icon: Shield },
        { name: 'Historical data access', included: true, icon: Clock }
      ],
      color: 'blue',
      popular: true,
      gradient: 'from-cyan-500 to-purple-500'
    },
    enterprise: {
      name: 'Enterprise',
      price: { monthly: 99, yearly: 990 },
      description: 'Ultimate AI solution for large organizations',
      features: [
        { name: 'All Professional features', included: true, icon: Crown },
        {
          name: 'Unlimited queries & processing',
          included: true,
          icon: Database
        },
        { name: 'Advanced image recognition', included: true, icon: Eye },
        { name: 'Custom AI model training', included: true, icon: Bot },
        { name: 'Unlimited bulk processing', included: true, icon: Upload },
        { name: 'Full API access', included: true, icon: Settings },
        {
          name: 'Dedicated account manager',
          included: true,
          icon: HeadphonesIcon
        },
        { name: 'Custom integrations', included: true, icon: Zap },
        { name: 'Unlimited team collaboration', included: true, icon: Users },
        { name: 'Advanced compliance tools', included: true, icon: Shield },
        { name: 'Custom reporting', included: true, icon: TrendingUp },
        { name: 'SLA guarantee', included: true, icon: Lock }
      ],
      color: 'purple',
      popular: false,
      gradient: 'from-purple-500 to-pink-500'
    }
  }

  const featureCategories = [
    {
      name: 'Core Features',
      icon: Bot,
      features: [
        {
          name: 'Monthly Queries',
          free: '10',
          pro: 'Unlimited',
          enterprise: 'Unlimited'
        },
        {
          name: 'AI Classification',
          free: 'Basic',
          pro: 'Advanced',
          enterprise: 'Custom Models'
        },
        {
          name: 'Processing Speed',
          free: 'Standard',
          pro: 'Fast',
          enterprise: 'Ultra Fast'
        },
        { name: 'Accuracy Rate', free: '90%', pro: '95%', enterprise: '99%' }
      ]
    },
    {
      name: 'Advanced Capabilities',
      icon: Sparkles,
      features: [
        { name: 'Image Recognition', free: false, pro: true, enterprise: true },
        {
          name: 'Bulk Processing',
          free: false,
          pro: 'Up to 100',
          enterprise: 'Unlimited'
        },
        { name: 'API Access', free: false, pro: true, enterprise: true },
        {
          name: 'Custom Integrations',
          free: false,
          pro: false,
          enterprise: true
        }
      ]
    },
    {
      name: 'Team & Collaboration',
      icon: Users,
      features: [
        {
          name: 'Team Members',
          free: '1',
          pro: 'Up to 5',
          enterprise: 'Unlimited'
        },
        { name: 'Shared Workspaces', free: false, pro: true, enterprise: true },
        {
          name: 'Role Management',
          free: false,
          pro: 'Basic',
          enterprise: 'Advanced'
        },
        { name: 'Audit Logs', free: false, pro: false, enterprise: true }
      ]
    },
    {
      name: 'Support & Services',
      icon: HeadphonesIcon,
      features: [
        {
          name: 'Support Level',
          free: 'Email',
          pro: 'Priority',
          enterprise: 'Dedicated Manager'
        },
        {
          name: 'Response Time',
          free: '48 hours',
          pro: '12 hours',
          enterprise: '2 hours'
        },
        {
          name: 'Training Sessions',
          free: false,
          pro: false,
          enterprise: true
        },
        { name: 'SLA Guarantee', free: false, pro: false, enterprise: '99.9%' }
      ]
    }
  ]

  return <></>
}

export default SubscriptionPage
