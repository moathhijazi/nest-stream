import React from 'react'
import { Button } from '../../components/ui/button'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/use-auth';

export default function HomePage() {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className="w-[25%] bg-[#3d3d41] rounded-xs p-4">
        <h1 className='font-bold text-2xl text-center'>Welcome Again To <span className='text-[#f1455f]'>Nest Stream</span> </h1>

        <div className="w-full flex justify-between items-center my-4">
          <span>Id</span>
          <span className='text-[#f1455f]'>{user.id}</span>
        </div>
        <div className="w-full flex justify-between items-center my-4">
          <span>Username</span>
          <span className='text-[#f1455f]'>{user.username}</span>
        </div>
        <div className="w-full flex justify-between items-center my-4">
          <span>Email</span>
          <span className='text-[#f1455f]'>{user.email}</span>
        </div>
        <div className="w-full flex justify-between items-center my-4">
         <Button variant={'nest'} size={"lg"} onClick={() => logout()}>
          <LogOut />
          <span>Log out</span>
         </Button>
        </div>
      </div>
    </div>
  )
}
