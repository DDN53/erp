'use client'
import React from 'react'
import MainLayout from '@/components/WaterProductLayout/MainLayout';
export default function layout({children}) {
  return (
    <div>
   <MainLayout>{children}</MainLayout>
   
    </div>
  )
}
