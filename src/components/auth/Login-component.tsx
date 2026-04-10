import { EyeIcon } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 ">
      <h2 className="mb-6 text-2xl font-bold text-[#334155]">Sign In</h2>
      <Card className="w-full max-w-xl border ring-0 border-[#E5E7EB] bg-[#FFFFFF]  rounded-2xl">
        <CardHeader className="space-y-1">
        </CardHeader>
        <CardContent className="grid gap-6 p-8">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-600">
              Email/ User ID
            </Label>
            <Input 
              id="email" 
              type="text" 
              placeholder="Enter your email/User ID" 
              className="h-12 border-[#D1D5DB] border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password text-sm font-medium text-slate-600">
              Password
            </Label>
            <div className="relative">
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                 className="h-12 border-[#D1D5DB] border pr-12"
              />
              <button className="absolute right-3 top-3 text-slate-400">
                <EyeIcon size={18} />
              </button>
            </div>
            <div className="flex justify-end">
              <button className="text-xs text-[#334155] font-medium  hover:underline">
                Forget Password?
              </button>
            </div>
          </div>
          <Button className="h-12 w-full bg-[#6633FF] text-white mt-4 hover:bg-[#5229d1] rounded-2xl text-lg font-medium">
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm