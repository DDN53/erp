'use client'
import React from 'react'
import MainLayout from '@/components/WaterQualityLayout/MainLayout';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout({children}) {
  return (
    <div>
      <MainLayout>{children}</MainLayout>
      <ToastContainer />
    </div>
  )
}
