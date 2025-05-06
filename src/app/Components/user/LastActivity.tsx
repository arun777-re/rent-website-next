"use client"
import { getInteraction } from '@/redux/slices/userSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { Button, Card } from '@radix-ui/themes'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const LastActivity = () => {
const [lastActivity,setLastActivity] = useState<[]>([]);
const dispatch = useDispatch<AppDispatch>();

useEffect(()=>{
  dispatch(getInteraction()).unwrap().then((res)=>{
    if(res?.data){
      setLastActivity(res?.data);
    }
  });
},[dispatch]);

const handleRedirect = (slug:string)=>{
  const router = useRouter();
  router.push(`/property-detail/${slug}`)
}


if(lastActivity.length === 0){
return (
  <div className='text-center h-[90vh]'><h3>No Interactions Yet</h3></div>
)
}

  return (
    <section className="max-w-screen-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2  className="text-xl font-semibold text-gray-800 mb-4 animate-pulse">Recent User Activity</h2>
    <ul className="space-y-4">
      {lastActivity && lastActivity.length > 0 && lastActivity.map((activity: any, index: number) =>(
        <Card className='flex flex-row items-center justify-between bg-gray-50 rounded-md shadow-sm
         hover:bg-gray-100 transition p-4 w-full'
        key={index}
        >
        <li
          className=" "
        >
          <div className="text-sm text-gray-700">
            <strong>Action:</strong> {activity.type || "N/A"}
          </div>
          <div className="text-sm text-gray-700">
            <strong>Property:</strong> {activity.propertyId.title || "Unknown"}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {dayjs(activity.timestamp).toLocaleString() || "No timestamp"}
          </div>
        </li>
        <Button onClick={()=>handleRedirect(activity?.propertyId?.slug)} className='underline text-first hover:text-green-700 cursor-pointer'>View</Button>
        </Card>

      ))}
    </ul>
  </section>
  )
}

export default LastActivity