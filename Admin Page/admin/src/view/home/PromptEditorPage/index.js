'use client'
import React, { useEffect, useState } from 'react'
import {
  FileText,
  Save,
  Plus,
  Copy,
  Trash2,
  Edit,
  Play,
  RotateCcw,
  Download,
  Zap,
  Search
} from 'lucide-react'
import { usePageTitle } from '@/context/PageTitleContext'
const PromptEditorPage = () => {
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      name: 'Primary HS Code Classification',
      description:
        'Main prompt for HS code classification with detailed reasoning',
      category: 'Classification',
      status: 'active',
      lastModified: '2024-08-15',
      useCount: 1247,
      successRate: 94.2,
      content: `You are an expert HS (Harmonized System) code classifier. Your task is to classify products into the correct HS code based on the product description provided.

**Guidelines:**
1. Analyze the product description carefully
2. Consider material composition, function, and intended use
3. Apply the General Rules for Interpretation (GRI)
4. Provide the 6-digit HS code with clear reasoning
5. Include confidence level (0-100%)

**Format your response as:**
- **HS Code:** [6-digit code]
- **Classification:** [Brief description]
- **Key factors:** [Bullet points of classification factors]
- **Confidence:** [Percentage]

**Product to classify:** {product_description}`
    },
    {
      id: 2,
      name: 'Customs Regulations Query',
      description:
        'Prompt for answering customs and trade regulation questions',
      category: 'Regulations',
      status: 'draft',
      lastModified: '2024-08-10',
      useCount: 89,
      successRate: 87.1,
      content: `You are a customs and trade regulations expert. Answer questions about import/export procedures, duty rates, and trade compliance.

**Focus areas:**
- Import/export documentation requirements
- Duty rates and tax calculations
- Trade agreement benefits
- Compliance procedures
- Prohibited/restricted items

Provide accurate, up-to-date information with relevant references where possible.

**Question:** {user_question}`
    },
    {
      id: 3,
      name: 'Product Classification Verification',
      description: 'Secondary prompt for verifying classification accuracy',
      category: 'Verification',
      status: 'testing',
      lastModified: '2024-08-18',
      useCount: 23,
      successRate: 91.3,
      content: `Review the following HS code classification for accuracy:

**Product:** {product_description}
**Proposed HS Code:** {proposed_code}
**Reasoning:** {classification_reasoning}

Verify if this classification is correct. If incorrect, provide the correct classification with detailed explanation.

**Consider:**
- General Rules for Interpretation
- Product hierarchy and exclusions
- Recent tariff updates
- Alternative classifications

**Response format:**
- **Verification:** [Correct/Incorrect]
- **If incorrect, correct code:** [6-digit code]
- **Explanation:** [Detailed reasoning]`
    },
    {
      id: 4,
      name: 'Detailed Product Analysis',
      description:
        'In-depth analysis prompt for complex product classifications',
      category: 'Classification',
      status: 'active',
      lastModified: '2024-08-12',
      useCount: 456,
      successRate: 92.8,
      content: `Perform a comprehensive analysis of the product for HS code classification.

**Analysis Framework:**
1. **Material Composition Analysis**
2. **Functional Assessment**
3. **Manufacturing Process Consideration**
4. **End-use Application**
5. **Regulatory Compliance Check**

**Product Details:** {product_description}

Provide detailed classification with supporting evidence and alternative codes if applicable.`
    }
  ])
  const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle('Prompt Editor')
  }, [setTitle])
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0])
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState(selectedPrompt.content)
  const [editName, setEditName] = useState(selectedPrompt.name)
  const [editDescription, setEditDescription] = useState(
    selectedPrompt.description
  )
  const [editCategory, setEditCategory] = useState(selectedPrompt.category)
  const [saving, setSaving] = useState(false)
  const [testInput, setTestInput] = useState(
    'Wireless Bluetooth headphones with noise cancellation'
  )
  const [testResult, setTestResult] = useState('')
  const [testing, setTesting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    'All',
    'Classification',
    'Regulations',
    'Verification',
    'Support'
  ]
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPrompts = prompts.filter(p => {
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSave = async () => {
    setSaving(true)
    // Mock save operation
    await new Promise(resolve => setTimeout(resolve, 1500))

    const updatedPrompt = {
      ...selectedPrompt,
      name: editName,
      description: editDescription,
      category: editCategory,
      content: editContent,
      lastModified: new Date().toISOString().split('T')[0]
    }

    setPrompts(prev =>
      prev.map(p => (p.id === selectedPrompt.id ? updatedPrompt : p))
    )

    setSelectedPrompt(updatedPrompt)
    setSaving(false)
    setEditMode(false)
  }

  const handleTest = async () => {
    if (!testInput.trim()) return

    setTesting(true)
    setTestResult('')

    // Mock AI response
    await new Promise(resolve => setTimeout(resolve, 2500))

    setTestResult(`**Test Result for Input:** "${testInput}"

**HS Code:** 8518.30.20

**Classification:** Headphones and earphones, whether or not combined with a microphone, and sets consisting of a microphone and one or more loudspeakers

**Key factors:**
• Electronic audio reproduction device
• Personal use consumer electronics
• Wireless connectivity (Bluetooth technology)
• Sound processing and noise cancellation features
• Portable entertainment equipment

**Additional Notes:**
- The noise cancellation feature doesn't change the primary classification
- Wireless connectivity is considered an enhancement to the basic headphone function
- Classification follows GRI Rule 1 (exact description) and Rule 6 (subheading comparison)

**Confidence:** 95%

*Generated using: ${selectedPrompt.name}*`)

    setTesting(false)
  }

  const createNewPrompt = () => {
    const newPrompt = {
      id: Date.now(),
      name: 'New Prompt',
      description: 'Enter description...',
      category: 'Classification',
      status: 'draft',
      lastModified: new Date().toISOString().split('T')[0],
      useCount: 0,
      successRate: 0,
      content:
        'Enter your prompt content here...\n\n**Guidelines:**\n1. Be specific and clear\n2. Include formatting instructions\n3. Define expected output format\n\n**Input:** {user_input}'
    }

    setPrompts(prev => [...prev, newPrompt])
    setSelectedPrompt(newPrompt)
    setEditContent(newPrompt.content)
    setEditName(newPrompt.name)
    setEditDescription(newPrompt.description)
    setEditCategory(newPrompt.category)
    setEditMode(true)
  }

  const duplicatePrompt = prompt => {
    const duplicated = {
      ...prompt,
      id: Date.now(),
      name: `${prompt.name} (Copy)`,
      status: 'draft',
      lastModified: new Date().toISOString().split('T')[0],
      useCount: 0
    }

    setPrompts(prev => [...prev, duplicated])
    setSelectedPrompt(duplicated)
    setEditContent(duplicated.content)
    setEditName(duplicated.name)
    setEditDescription(duplicated.description)
    setEditCategory(duplicated.category)
  }

  const deletePrompt = promptId => {
    setPrompts(prev => prev.filter(p => p.id !== promptId))
    if (selectedPrompt.id === promptId) {
      setSelectedPrompt(prompts[0])
      setEditContent(prompts[0].content)
      setEditName(prompts[0].name)
      setEditDescription(prompts[0].description)
      setEditCategory(prompts[0].category)
    }
  }

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'draft':
        return 'bg-yellow-100 text-yellow-700'
      case 'testing':
        return 'bg-blue-100 text-blue-700'
      case 'deprecated':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const exportPrompts = () => {
    const dataStr = JSON.stringify(prompts, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `prompts-export-${
      new Date().toISOString().split('T')[0]
    }.json`
    link.click()
  }

  return (
    // <MainLayout currentPage='Prompt Editor'>
    <div className='flex h-[calc(100vh-7rem)] space-x-6'>
      {/* Prompt Library */}
      <div className='w-96 bg-white rounded-lg shadow-sm border flex flex-col'>
        {/* Library Header */}
        <div className='p-4 border-b'>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='font-semibold'>Prompt Library</h3>
            <button
              onClick={createNewPrompt}
              className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1'
            >
              <Plus size={14} />
              <span>New</span>
            </button>
          </div>

          {/* Search */}
          <div className='relative mb-3'>
            <Search
              size={16}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            />
            <input
              type='text'
              placeholder='Search prompts...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Category Filter */}
          <div className='flex flex-wrap gap-1'>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt List */}
        <div className='flex-1 overflow-y-auto p-2'>
          <div className='space-y-2'>
            {filteredPrompts.map(prompt => (
              <div
                key={prompt.id}
                onClick={() => {
                  setSelectedPrompt(prompt)
                  setEditContent(prompt.content)
                  setEditName(prompt.name)
                  setEditDescription(prompt.description)
                  setEditCategory(prompt.category)
                  setEditMode(false)
                }}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedPrompt.id === prompt.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className='flex items-start justify-between mb-2'>
                  <h4 className='font-medium text-sm line-clamp-1'>
                    {prompt.name}
                  </h4>
                  <div className='flex items-center space-x-1'>
                    <span
                      className={`px-2 py-1 rounded text-xs ${getStatusColor(
                        prompt.status
                      )}`}
                    >
                      {prompt.status}
                    </span>
                  </div>
                </div>

                <p className='text-xs text-gray-600 mb-2 line-clamp-2'>
                  {prompt.description}
                </p>

                <div className='flex items-center justify-between text-xs text-gray-500'>
                  <span>{prompt.category}</span>
                  <div className='flex items-center space-x-2'>
                    <span>{prompt.useCount} uses</span>
                    <span>{prompt.successRate}% success</span>
                  </div>
                </div>

                <div className='flex items-center justify-between mt-2'>
                  <span className='text-xs text-gray-400'>
                    {prompt.lastModified}
                  </span>
                  <div className='flex items-center space-x-1'>
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        duplicatePrompt(prompt)
                      }}
                      className='p-1 text-gray-400 hover:text-blue-500'
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        deletePrompt(prompt.id)
                      }}
                      className='p-1 text-gray-400 hover:text-red-500'
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Library Footer */}
        <div className='p-3 border-t'>
          <button
            onClick={exportPrompts}
            className='w-full flex items-center justify-center space-x-2 p-2 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors'
          >
            <Download size={14} />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className='flex-1 bg-white rounded-lg shadow-sm border flex flex-col'>
        {/* Editor Header */}
        <div className='p-4 border-b'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <FileText className='text-blue-500' size={20} />
              <div>
                <h3 className='font-semibold'>
                  {editMode ? 'Editing' : 'Viewing'}: {selectedPrompt.name}
                </h3>
                <p className='text-sm text-gray-500'>
                  {selectedPrompt.description}
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className='flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditMode(false)
                      setEditContent(selectedPrompt.content)
                      setEditName(selectedPrompt.name)
                      setEditDescription(selectedPrompt.description)
                      setEditCategory(selectedPrompt.category)
                    }}
                    className='flex items-center space-x-2 px-3 py-2 border hover:bg-gray-50 rounded-lg transition-colors'
                  >
                    <RotateCcw size={16} />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className='flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors'
                  >
                    {saving ? (
                      <>
                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className='flex-1 flex'>
          {/* Prompt Editor */}
          <div className='flex-1 flex flex-col p-4'>
            {editMode && (
              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Prompt Name
                  </label>
                  <input
                    type='text'
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className='w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Category
                  </label>
                  <select
                    value={editCategory}
                    onChange={e => setEditCategory(e.target.value)}
                    className='w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-span-2'>
                  <label className='block text-sm font-medium mb-1'>
                    Description
                  </label>
                  <input
                    type='text'
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                    className='w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
            )}

            <div className='flex-1'>
              <label className='block text-sm font-medium mb-2'>
                Prompt Content
              </label>
              {editMode ? (
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  className='w-full h-full p-3 border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter your prompt content...'
                />
              ) : (
                <div className='h-full p-3 border rounded-lg bg-gray-50 overflow-y-auto'>
                  <pre className='whitespace-pre-wrap font-mono text-sm'>
                    {selectedPrompt.content}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Test Panel */}
          <div className='w-80 border-l p-4 bg-gray-50'>
            <h4 className='font-medium mb-3 flex items-center space-x-2'>
              <Play size={16} />
              <span>Test Prompt</span>
            </h4>

            <div className='space-y-3'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Test Input
                </label>
                <textarea
                  value={testInput}
                  onChange={e => setTestInput(e.target.value)}
                  className='w-full h-20 p-2 border rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter test input...'
                />
              </div>

              <button
                onClick={handleTest}
                disabled={testing || !testInput.trim()}
                className='w-full flex items-center justify-center space-x-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition-colors'
              >
                {testing ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    <span>Run Test</span>
                  </>
                )}
              </button>

              {testResult && (
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Test Result
                  </label>
                  <div className='h-60 p-3 border rounded bg-white overflow-y-auto'>
                    <pre className='whitespace-pre-wrap text-xs'>
                      {testResult}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // {/* </MainLayout> */}
  )
}

export default PromptEditorPage
