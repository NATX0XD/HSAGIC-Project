'use client'
import React from 'react'
import { Search, Plus, Filter } from 'lucide-react'

const statuses = ['All', 'active', 'building', 'draft', 'inactive', 'failed']
const envs = ['All', 'production', 'staging', 'development']

const SearchField = ({ value, onChange, className = '' }) => (
  <div className={`relative ${className}`}>
    <Search
      size={16}
      className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
    />
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder='Search vectors...'
      className='w-full pl-9 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 
                 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                 text-sm'
    />
  </div>
)

const SelectField = ({
  label,
  value,
  onChange,
  options,
  className = '',
  hideLabel = false
}) => (
  <div className={`min-w-0 ${className}`}>
    {!hideLabel && (
      <label className='block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1'>
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className='w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 
                 text-gray-900 dark:text-gray-100 text-sm'
    >
      {options.map(o => (
        <option key={o} value={o}>
          {o === 'All'
            ? label === 'Status'
              ? 'All Status'
              : 'All Environments'
            : o[0].toUpperCase() + o.slice(1)}
        </option>
      ))}
    </select>
  </div>
)

const CreateButton = ({ onClick, compact = false, className = '' }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center shrink-0 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium
                ${compact ? 'px-3 py-2.5 text-sm' : 'px-4 py-2'} ${className}`}
  >
    <Plus size={16} className={compact ? 'mr-2' : 'mr-2'} />
    <span className={`${compact ? '' : ''}`}>New Vector</span>
  </button>
)

const ControlsBar = ({
  search,
  setSearch,
  status,
  setStatus,
  env,
  setEnv,
  onCreate
}) => {
  return (
    <div className='bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-hidden'>
      <div className='hidden md:flex md:items-center md:gap-3 md:flex-wrap min-w-0'>
        <div className='flex items-center gap-3 flex-wrap min-w-0 flex-1'>
          <SearchField
            value={search}
            onChange={setSearch}
            className='min-w-[12rem] w-[clamp(14rem,28vw,20rem)]'
          />
          <div className='flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400'>
            <SelectField
              label='Status'
              value={status}
              onChange={setStatus}
              options={statuses}
              hideLabel
              className='!mt-0'
            />
            <SelectField
              label='Environment'
              value={env}
              onChange={setEnv}
              options={envs}
              hideLabel
              className='!mt-0'
            />
          </div>
        </div>
        <CreateButton onClick={onCreate} className='md:ml-auto' />
      </div>

      <div className='md:hidden space-y-4'>
        {/* Row 1: Search only */}
        <SearchField value={search} onChange={setSearch} />

        {/* Row 2: Status + Environment + New (ในแถวเดียว) */}
        <div className='space-y-3'>
          <div className='flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400'>
            <Filter size={16} />
            <span>Filters</span>
          </div>

          <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end gap-2 max-[360px]:grid-cols-2'>
            <SelectField
              label='Status'
              value={status}
              onChange={setStatus}
              options={statuses}
            />
            <SelectField
              label='Environment'
              value={env}
              onChange={setEnv}
              options={envs}
            />
            <CreateButton
              onClick={onCreate}
              compact
              className='justify-self-end max-[360px]:col-span-2'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlsBar
