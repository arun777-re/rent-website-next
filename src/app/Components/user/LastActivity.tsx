"use client"
import { getInteraction } from '@/redux/slices/userSlice'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const LastActivity = () => {

const dispatch = useDispatch<AppDispatch>();

useEffect(()=>{
  dispatch(getInteraction()).unwrap();
},[dispatch])

const {interaction} = useSelector((state:RootState)=> state.user) ;

const lastActivity = interaction || [];
if(lastActivity.length === 0){
return (
  <div className='text-center'><h4>Loading...</h4></div>
)
}

  return (
    <section className="max-w-screen-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent User Activity</h2>
    <ul className="space-y-4">
      {lastActivity && lastActivity.length > 0 && lastActivity.map((activity: any, index: number) => (
        <li
          key={index}
          className="p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition"
        >
          <div className="text-sm text-gray-700">
            <strong>Action:</strong> {activity.action || "N/A"}
          </div>
          <div className="text-sm text-gray-700">
            <strong>Page:</strong> {activity.page || "Unknown"}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {new Date(activity.timestamp).toLocaleString() || "No timestamp"}
          </div>
        </li>
      ))}
    </ul>
  </section>
  )
}

export default LastActivity