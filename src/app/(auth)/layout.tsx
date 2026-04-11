import { AuthNavbar } from '@/components/auth/Auth-navbar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <AuthNavbar/>
      {children}
    </div>
  )
}

export default layout