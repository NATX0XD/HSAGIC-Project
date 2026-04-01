'use client'
import React, { useEffect, useState } from 'react'
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Shield,
  ShieldCheck,
  Eye,
  EyeOff,
  Activity,
  CheckCircle,
  Clock,
  Settings,
  Download
} from 'lucide-react'
import { usePageTitle } from '@/context/PageTitleContext'

const UserManagementPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Anderson',
      email: 'john.anderson@company.com',
      phone: '+66 2 123 4567',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2024-08-18 14:30',
      joinDate: '2024-01-15',
      permissions: ['all'],
      avatar: null,
      department: 'IT Administration'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      phone: '+66 2 234 5678',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-08-18 10:15',
      joinDate: '2024-02-20',
      permissions: ['user_management', 'ai_config', 'data_upload'],
      avatar: null,
      department: 'Operations'
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      email: 'mike.rodriguez@company.com',
      phone: '+66 2 345 6789',
      role: 'Operator',
      status: 'active',
      lastLogin: '2024-08-17 16:45',
      joinDate: '2024-03-10',
      permissions: ['chat_test', 'data_upload'],
      avatar: null,
      department: 'Customer Support'
    },
    {
      id: 4,
      name: 'Emma Thompson',
      email: 'emma.thompson@company.com',
      phone: '+66 2 456 7890',
      role: 'Analyst',
      status: 'inactive',
      lastLogin: '2024-08-15 09:20',
      joinDate: '2024-04-05',
      permissions: ['performance', 'analytics'],
      avatar: null,
      department: 'Data Analytics'
    },
    {
      id: 5,
      name: 'David Kim',
      email: 'david.kim@company.com',
      phone: '+66 2 567 8901',
      role: 'Editor',
      status: 'pending',
      lastLogin: null,
      joinDate: '2024-08-18',
      permissions: ['prompt_editor', 'vector_management'],
      avatar: null,
      department: 'AI Development'
    }
  ])
  const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle('User Management')
  }, [setTitle])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const roles = ['All', 'Super Admin', 'Admin', 'Operator', 'Analyst', 'Editor']
  const statuses = ['All', 'active', 'inactive', 'pending']
  const departments = [
    'IT Administration',
    'Operations',
    'Customer Support',
    'Data Analytics',
    'AI Development'
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'All' || user.role === selectedRole
    const matchesStatus =
      selectedStatus === 'All' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'inactive':
        return 'bg-red-100 text-red-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getRoleIcon = role => {
    switch (role) {
      case 'Super Admin':
        return <ShieldCheck className='text-red-500' size={16} />
      case 'Admin':
        return <Shield className='text-blue-500' size={16} />
      case 'Operator':
        return <Settings className='text-green-500' size={16} />
      case 'Analyst':
        return <Activity className='text-purple-500' size={16} />
      case 'Editor':
        return <Edit className='text-orange-500' size={16} />
      default:
        return <Shield className='text-gray-500' size={16} />
    }
  }

  const getUserInitials = name => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  const handleStatusToggle = userId => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'active' ? 'inactive' : 'active'
            }
          : user
      )
    )
  }

  const handleDeleteUser = userId => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId))
    }
  }

  const handleEditUser = user => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const exportUsers = () => {
    const csvContent = [
      [
        'Name',
        'Email',
        'Role',
        'Status',
        'Department',
        'Join Date',
        'Last Login'
      ],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        user.department,
        user.joinDate,
        user.lastLogin || 'Never'
      ])
    ]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    // <MainLayout currentPage='User Management'>
    <div className='space-y-6'>
      {/* Header with Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Total Users</p>
              <p className='text-2xl font-bold'>{users.length}</p>
            </div>
            <Users className='text-blue-500' size={32} />
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Active Users</p>
              <p className='text-2xl font-bold'>
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <CheckCircle className='text-green-500' size={32} />
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Pending</p>
              <p className='text-2xl font-bold'>
                {users.filter(u => u.status === 'pending').length}
              </p>
            </div>
            <Clock className='text-yellow-500' size={32} />
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Departments</p>
              <p className='text-2xl font-bold'>
                {new Set(users.map(u => u.department)).size}
              </p>
            </div>
            <Settings className='text-purple-500' size={32} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className='bg-white p-6 rounded-lg shadow-sm border'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0'>
          <div className='flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4'>
            {/* Search */}
            <div className='relative'>
              <Search
                size={16}
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              />
              <input
                type='text'
                placeholder='Search users...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64'
              />
            </div>

            {/* Filters */}
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className='px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className='px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'All'
                    ? 'All Status'
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className='flex items-center space-x-3'>
            <button
              onClick={exportUsers}
              className='flex items-center space-x-2 px-4 py-2 border hover:bg-gray-50 rounded-lg transition-colors'
            >
              <Download size={16} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className='flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'
            >
              <Plus size={16} />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b'>
              <tr>
                <th className='text-left p-4 font-medium'>User</th>
                <th className='text-left p-4 font-medium'>Role</th>
                <th className='text-left p-4 font-medium'>Department</th>
                <th className='text-left p-4 font-medium'>Status</th>
                <th className='text-left p-4 font-medium'>Last Login</th>
                <th className='text-left p-4 font-medium'>Join Date</th>
                <th className='text-left p-4 font-medium'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y'>
              {filteredUsers.map(user => (
                <tr key={user.id} className='hover:bg-gray-50'>
                  <td className='p-4'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                        <span className='text-sm font-medium'>
                          {getUserInitials(user.name)}
                        </span>
                      </div>
                      <div>
                        <div className='font-medium'>{user.name}</div>
                        <div className='text-sm text-gray-500'>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className='flex items-center space-x-2'>
                      {getRoleIcon(user.role)}
                      <span className='text-sm'>{user.role}</span>
                    </div>
                  </td>
                  <td className='p-4'>
                    <span className='text-sm'>{user.department}</span>
                  </td>
                  <td className='p-4'>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </td>
                  <td className='p-4'>
                    <span className='text-sm text-gray-600'>
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : 'Never'}
                    </span>
                  </td>
                  <td className='p-4'>
                    <span className='text-sm text-gray-600'>
                      {formatDate(user.joinDate)}
                    </span>
                  </td>
                  <td className='p-4'>
                    <div className='flex items-center space-x-2'>
                      <button
                        onClick={() => handleEditUser(user)}
                        className='p-1 text-gray-400 hover:text-blue-500 transition-colors'
                        title='Edit user'
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleStatusToggle(user.id)}
                        className={`p-1 transition-colors ${
                          user.status === 'active'
                            ? 'text-gray-400 hover:text-red-500'
                            : 'text-gray-400 hover:text-green-500'
                        }`}
                        title={
                          user.status === 'active' ? 'Deactivate' : 'Activate'
                        }
                      >
                        {user.status === 'active' ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className='p-1 text-gray-400 hover:text-red-500 transition-colors'
                        title='Delete user'
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Info */}
      <div className='flex items-center justify-between text-sm text-gray-500'>
        <span>
          Showing {filteredUsers.length} of {users.length} users
        </span>
        <span>Page 1 of 1</span>
      </div>
    </div>
    // </MainLayout>
  )
}

export default UserManagementPage
