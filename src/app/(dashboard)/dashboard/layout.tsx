import { Navbar } from '@/components/shared/Navbar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Navbar title={"Dashboard"}/>
      {children}
    </div>
  )
}

export default layout