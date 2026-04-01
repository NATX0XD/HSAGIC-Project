'use client'
import React, { useEffect, useState } from 'react'
import {
  Bot,
  Settings,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Zap,
  Brain,
  MessageSquare,
  Sliders
} from 'lucide-react'
import { usePageTitle } from '@/context/PageTitleContext'
const AIConfigurationPage = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-4')
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [responseStyle, setResponseStyle] = useState('professional')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle('AI Configuration')
  }, [setTitle])

  const aiModels = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description:
        'Most capable model, best for complex HS code classification',
      cost: 'High',
      accuracy: '95%',
      speed: 'Medium'
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: 'Faster and more cost-effective for standard queries',
      cost: 'Medium',
      accuracy: '89%',
      speed: 'Fast'
    },
    {
      id: 'claude-3',
      name: 'Claude-3',
      description: 'Excellent reasoning for complex trade classifications',
      cost: 'High',
      accuracy: '93%',
      speed: 'Medium'
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      description: 'Good balance of performance and cost',
      cost: 'Medium',
      accuracy: '91%',
      speed: 'Fast'
    }
  ]

  const responseStyles = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Formal business language'
    },
    {
      id: 'friendly',
      name: 'Friendly',
      description: 'Conversational and approachable'
    },
    {
      id: 'technical',
      name: 'Technical',
      description: 'Detailed technical explanations'
    },
    {
      id: 'concise',
      name: 'Concise',
      description: 'Brief and to-the-point responses'
    }
  ]

  const handleSave = async () => {
    setSaving(true)
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className='w-full space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold flex items-center space-x-2'>
            <Settings className='text-blue-500' size={28} />
            <span>AI Configuration</span>
          </h1>
          <p className='text-gray-500 dark:text-gray-400 mt-1'>
            Configure AI models and response settings for HS code classification
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className='flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors'
        >
          {saving ? (
            <RefreshCw className='animate-spin' size={16} />
          ) : saved ? (
            <CheckCircle size={16} />
          ) : (
            <Save size={16} />
          )}
          <span>
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </span>
        </button>
      </div>

      {/* Model Selection */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700'>
        <h3 className='text-lg font-semibold mb-4 flex items-center space-x-2'>
          <Bot className='text-purple-500' size={20} />
          <span>AI Model Selection</span>
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {aiModels.map(model => (
            <div
              key={model.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedModel === model.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              onClick={() => setSelectedModel(model.id)}
            >
              <div className='flex items-center justify-between mb-2'>
                <h4 className='font-medium'>{model.name}</h4>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedModel === model.id
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {selectedModel === model.id && (
                    <div className='w-2 h-2 bg-white rounded-full m-0.5'></div>
                  )}
                </div>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                {model.description}
              </p>
              <div className='flex justify-between text-xs'>
                <span className='text-gray-500'>
                  Cost: <span className='font-medium'>{model.cost}</span>
                </span>
                <span className='text-gray-500'>
                  Accuracy:{' '}
                  <span className='font-medium'>{model.accuracy}</span>
                </span>
                <span className='text-gray-500'>
                  Speed: <span className='font-medium'>{model.speed}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Parameters */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700'>
        <h3 className='text-lg font-semibold mb-4 flex items-center space-x-2'>
          <Sliders className='text-green-500' size={20} />
          <span>Model Parameters</span>
        </h3>

        <div className='space-y-6'>
          {/* Temperature */}
          <div>
            <label className='block text-sm font-medium mb-2'>
              Temperature: {temperature}
            </label>
            <input
              type='range'
              min='0'
              max='1'
              step='0.1'
              value={temperature}
              onChange={e => setTemperature(parseFloat(e.target.value))}
              className='w-full'
            />
            <div className='flex justify-between text-xs text-gray-500 mt-1'>
              <span>Conservative (0.0)</span>
              <span>Creative (1.0)</span>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
              Lower values make responses more focused and deterministic
            </p>
          </div>

          {/* Max Tokens */}
          <div>
            <label className='block text-sm font-medium mb-2'>
              Max Tokens: {maxTokens}
            </label>
            <input
              type='range'
              min='512'
              max='4096'
              step='256'
              value={maxTokens}
              onChange={e => setMaxTokens(parseInt(e.target.value))}
              className='w-full'
            />
            <div className='flex justify-between text-xs text-gray-500 mt-1'>
              <span>Short (512)</span>
              <span>Long (4096)</span>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
              Maximum number of tokens in the AI response
            </p>
          </div>
        </div>
      </div>

      {/* Response Style */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700'>
        <h3 className='text-lg font-semibold mb-4 flex items-center space-x-2'>
          <MessageSquare className='text-orange-500' size={20} />
          <span>Response Style</span>
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {responseStyles.map(style => (
            <div
              key={style.id}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                responseStyle === style.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              onClick={() => setResponseStyle(style.id)}
            >
              <div className='flex items-center space-x-2'>
                <div
                  className={`w-3 h-3 rounded-full ${
                    responseStyle === style.id
                      ? 'bg-blue-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                ></div>
                <div>
                  <h4 className='font-medium'>{style.name}</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {style.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700'>
        <h3 className='text-lg font-semibold mb-4 flex items-center space-x-2'>
          <Zap className='text-yellow-500' size={20} />
          <span>Current Performance</span>
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
            <Brain className='mx-auto mb-2 text-green-500' size={32} />
            <div className='text-2xl font-bold'>94.2%</div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Accuracy Rate
            </div>
          </div>
          <div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
            <Zap className='mx-auto mb-2 text-blue-500' size={32} />
            <div className='text-2xl font-bold'>1.2s</div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Avg Response Time
            </div>
          </div>
          <div className='text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
            <AlertCircle className='mx-auto mb-2 text-purple-500' size={32} />
            <div className='text-2xl font-bold'>2.1%</div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Error Rate
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIConfigurationPage
