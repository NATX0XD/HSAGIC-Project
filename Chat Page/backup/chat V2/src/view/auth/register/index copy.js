'use client'
import React, { useState } from 'react'
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Shield,
  Sparkles,
  Search,
  Globe,
  TrendingUp
} from 'lucide-react'

export default function Register () {
  const [userType, setUserType] = useState('individual')
  const [formData, setFormData] = useState({
    // Individual fields
    firstName: '',
    lastName: '',
    citizenId: '',
    // Company fields
    companyName: '',
    companyRegNumber: '',
    taxId: '',
    // Common fields
    email: '',
    phone: '',
    address: '',
    province: '',
    postalCode: '',
    businessType: '',
    importExportLicense: ''
  })

  const handleInputChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = () => {
    // Basic validation
    if (userType === 'individual') {
      if (!formData.firstName || !formData.lastName || !formData.citizenId) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
        return
      }
    } else {
      if (
        !formData.companyName ||
        !formData.companyRegNumber ||
        !formData.taxId
      ) {
        alert('กรุณากรอกข้อมูลบริษัทให้ครบถ้วน')
        return
      }
    }

    if (
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.businessType
    ) {
      alert('กรุณากรอกข้อมูลติดต่อให้ครบถ้วน')
      return
    }

    console.log('Form submitted:', { userType, ...formData })
    alert('ลงทะเบียนสำเร็จ! เข้าสู่ระบบ AI ค้นหาพิกัดศุลกากรได้แล้ว')
  }

  return (
    <>
      {/* Animated Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      {/* Floating AI Icons */}
      <div className='absolute inset-0 pointer-events-none'>
        <Sparkles className='absolute top-20 left-1/4 text-blue-300/30 w-6 h-6 animate-bounce' />
        <Search className='absolute top-32 right-1/3 text-purple-300/30 w-8 h-8 animate-bounce delay-500' />
        <Globe className='absolute bottom-40 left-1/5 text-indigo-300/30 w-7 h-7 animate-bounce delay-1000' />
        <TrendingUp className='absolute bottom-20 right-1/4 text-blue-300/30 w-6 h-6 animate-bounce delay-1500' />
      </div>

      {/* <div className='relative z-10 container mx-auto px-4 py-8'> */}
      {/* Header */}
      <div className='text-center mb-8'>
        <div className='flex items-center justify-center mb-4'>
          <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-2xl'>
            <Sparkles className='w-8 h-8 text-white' />
          </div>
        </div>
        <h1 className='text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent'>
          ThaiCustoms AI
        </h1>
        <p className='text-xl text-blue-200 mb-1'>
          ระบบ AI ค้นหาพิกัดศุลกากรไทย
        </p>
        <p className='text-blue-300/80'>ลงทะเบียนเพื่อเข้าใช้งานระบบอัจฉริยะ</p>
      </div>

      {/* Registration Form */}
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8'>
          <div className='space-y-6'>
            {/* User Type Selection */}
            <div className='mb-8'>
              <h3 className='text-xl font-semibold text-white mb-4 flex items-center'>
                <Shield className='w-5 h-5 mr-2' />
                ประเภทผู้ใช้งาน
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                <button
                  type='button'
                  onClick={() => setUserType('individual')}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    userType === 'individual'
                      ? 'border-blue-400 bg-blue-500/20 text-white shadow-lg'
                      : 'border-white/30 bg-white/5 text-blue-200 hover:bg-white/10'
                  }`}
                >
                  <User className='w-8 h-8 mx-auto mb-2' />
                  <div className='font-semibold'>บุคคลธรรมดา</div>
                  <div className='text-sm opacity-80'>
                    สำหรับผู้ใช้งานทั่วไป
                  </div>
                </button>
                <button
                  type='button'
                  onClick={() => setUserType('company')}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    userType === 'company'
                      ? 'border-purple-400 bg-purple-500/20 text-white shadow-lg'
                      : 'border-white/30 bg-white/5 text-blue-200 hover:bg-white/10'
                  }`}
                >
                  <Building2 className='w-8 h-8 mx-auto mb-2' />
                  <div className='font-semibold'>นิติบุคคล</div>
                  <div className='text-sm opacity-80'>สำหรับบริษัท/องค์กร</div>
                </button>
              </div>
            </div>

            {/* Individual Fields */}
            {userType === 'individual' && (
              <div className='space-y-4 bg-blue-500/10 rounded-2xl p-6 border border-blue-400/30'>
                <h4 className='text-lg font-semibold text-white mb-4'>
                  ข้อมูลส่วนตัว
                </h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-blue-200 mb-2'>ชื่อ</label>
                    <input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all'
                      placeholder='กรอกชื่อ'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-blue-200 mb-2'>นามสกุล</label>
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all'
                      placeholder='กรอกนามสกุล'
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-blue-200 mb-2'>
                    เลขประจำตัวประชาชน
                  </label>
                  <input
                    type='text'
                    name='citizenId'
                    value={formData.citizenId}
                    onChange={handleInputChange}
                    className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all'
                    placeholder='X-XXXX-XXXXX-XX-X'
                    maxLength={13}
                    required
                  />
                </div>
              </div>
            )}

            {/* Company Fields */}
            {userType === 'company' && (
              <div className='space-y-4 bg-purple-500/10 rounded-2xl p-6 border border-purple-400/30'>
                <h4 className='text-lg font-semibold text-white mb-4'>
                  ข้อมูลบริษัท
                </h4>
                <div>
                  <label className='block text-purple-200 mb-2'>
                    ชื่อบริษัท
                  </label>
                  <input
                    type='text'
                    name='companyName'
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all'
                    placeholder='กรอกชื่อบริษัท'
                    required
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-purple-200 mb-2'>
                      เลขทะเบียนบริษัท
                    </label>
                    <input
                      type='text'
                      name='companyRegNumber'
                      value={formData.companyRegNumber}
                      onChange={handleInputChange}
                      className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all'
                      placeholder='เลขทะเบียนบริษัท'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-purple-200 mb-2'>
                      เลขประจำตัวผู้เสียภาษี
                    </label>
                    <input
                      type='text'
                      name='taxId'
                      value={formData.taxId}
                      onChange={handleInputChange}
                      className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all'
                      placeholder='X-XXXX-XXXXX-XX-X'
                      maxLength={13}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Common Fields */}
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold text-white'>ข้อมูลติดต่อ</h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-blue-200 mb-2 flex items-center'>
                    <Mail className='w-4 h-4 mr-2' />
                    อีเมล
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all'
                    placeholder='example@email.com'
                    required
                  />
                </div>
                <div>
                  <label className='block text-blue-200 mb-2 flex items-center'>
                    <Phone className='w-4 h-4 mr-2' />
                    หมายเลขโทรศัพท์
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all'
                    placeholder='08X-XXX-XXXX'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-blue-200 mb-2 flex items-center'>
                  <MapPin className='w-4 h-4 mr-2' />
                  ที่อยู่
                </label>
                <textarea
                  name='address'
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all'
                  placeholder='กรอกที่อยู่เต็ม'
                  required
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-blue-200 mb-2'>จังหวัด</label>
                  <input
                    type='text'
                    name='province'
                    value={formData.province}
                    onChange={handleInputChange}
                    className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all'
                    placeholder='กรอกจังหวัด'
                    required
                  />
                </div>
                <div>
                  <label className='block text-blue-200 mb-2'>
                    รหัสไปรษณีย์
                  </label>
                  <input
                    type='text'
                    name='postalCode'
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all'
                    placeholder='XXXXX'
                    maxLength={5}
                    required
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-blue-200 mb-2'>
                    ประเภทธุรกิจ
                  </label>
                  <select
                    name='businessType'
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all'
                    required
                  >
                    <option value='' className='bg-gray-800'>
                      เลือกประเภทธุรกิจ
                    </option>
                    <option value='import' className='bg-gray-800'>
                      นำเข้า
                    </option>
                    <option value='export' className='bg-gray-800'>
                      ส่งออก
                    </option>
                    <option value='both' className='bg-gray-800'>
                      นำเข้า-ส่งออก
                    </option>
                    <option value='logistics' className='bg-gray-800'>
                      โลจิสติกส์
                    </option>
                    <option value='trading' className='bg-gray-800'>
                      การค้า
                    </option>
                    <option value='other' className='bg-gray-800'>
                      อื่นๆ
                    </option>
                  </select>
                </div>
                <div>
                  <label className='block text-blue-200 mb-2 flex items-center'>
                    <FileText className='w-4 h-4 mr-2' />
                    ใบอนุญาตนำเข้า-ส่งออก
                  </label>
                  <input
                    type='text'
                    name='importExportLicense'
                    value={formData.importExportLicense}
                    onChange={handleInputChange}
                    className='w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all'
                    placeholder='หมายเลขใบอนุญาต (ถ้ามี)'
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className='pt-6'>
              <button
                type='button'
                onClick={handleSubmit}
                className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-400/50'
              >
                <div className='flex items-center justify-center'>
                  <Sparkles className='w-5 h-5 mr-2' />
                  ลงทะเบียนเข้าใช้ ThaiCustoms AI
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className='text-center pt-4'>
              <p className='text-blue-300/80 text-sm'>
                ด้วยการลงทะเบียน คุณยอมรับ
                <span className='text-blue-300 hover:text-white cursor-pointer'>
                  {' '}
                  ข้อกำหนดการใช้งาน{' '}
                </span>
                และ
                <span className='text-blue-300 hover:text-white cursor-pointer'>
                  {' '}
                  นโยบายความเป็นส่วนตัว
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className='mt-12 max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            คุณสมบัติของระบบ AI
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300'>
            <Search className='w-12 h-12 text-blue-400 mb-4 mx-auto' />
            <h3 className='text-lg font-semibold text-white mb-2 text-center'>
              ค้นหาพิกัดศุลกากร
            </h3>
            <p className='text-blue-200/80 text-center text-sm'>
              ค้นหาพิกัดศุลกากรด้วย AI อย่างรวดเร็วและแม่นยำ
            </p>
          </div>
          <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300'>
            <TrendingUp className='w-12 h-12 text-purple-400 mb-4 mx-auto' />
            <h3 className='text-lg font-semibold text-white mb-2 text-center'>
              คำนวณอัตราศุลกากร
            </h3>
            <p className='text-blue-200/80 text-center text-sm'>
              คำนวณอัตราภาษีศุลกากรแบบเรียลไทม์
            </p>
          </div>
          <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300'>
            <Globe className='w-12 h-12 text-indigo-400 mb-4 mx-auto' />
            <h3 className='text-lg font-semibold text-white mb-2 text-center'>
              ข้อมูลการค้าสากล
            </h3>
            <p className='text-blue-200/80 text-center text-sm'>
              ข้อมูลการค้าระหว่างประเทศที่ทันสมัย
            </p>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}
