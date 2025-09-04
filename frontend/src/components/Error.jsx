import { AlertCircle } from 'lucide-react'
import React from 'react'

const Error = ({message}) => {
  return (
    <div className='w-full rounded-xl bg-red-600 p-2 gap-2 flex items-center '>
        <AlertCircle className='' color='white'/>
        <span className='text-white'>{message}</span>
        </div>
  )
}

export default Error