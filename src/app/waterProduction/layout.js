'use client'
import React from 'react'
import MainLayout from '@/components/WaterProductLayout/MainLayout';
import { StrictMode } from 'react';
export default function layout({children}) {
  return (
    <div suppressHydrationWarning={true}>
       <StrictMode> <MainLayout>{children}</MainLayout></StrictMode>
  
   
    </div>
  )
}
