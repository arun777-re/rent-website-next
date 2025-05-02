import React from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { MdOutlineAddHome } from "react-icons/md";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {Bar, Line} from 'react-chartjs-2';
import { Chart as ChartJS,BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const data = {
    type:'bar',
    labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets:[
      {
        label:'Revenue Analytics',
        data:[45,20,40,50,60,50,100,300,300,100,900,300],
        backgroundColor: 'rgba(22, 163, 74, 0.8)',
        borderColor: 'rgba(22, 163, 74, 0.6)',
        borderWidth: 1,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#1f2937', // Tailwind gray-800
        },
      },
      title: {
        display: true,
        text: 'Monthly Revenue (₹)',
        color: '#1f2937',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6b7280', // Tailwind gray-500
        },
        grid: {
          color: '#e5e7eb', // Tailwind gray-200
        },
      },
      y: {
        ticks: {
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb',
        },
      },
    },
  };


  const admin = useSelector<RootState>((state)=>state.admin.admin);
  console.log(admin)

  return (
    <section className='w-full relative h-auto '>
        <article className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">
            Hello, {admin?.ownerName}
        </h2>
        <p className="text-sm text-gray-700/60 font-medium">
        Welcome back!
        </p>
        </article>
        <div className="flex flex-col items-start h-auto py-5 pb-10">
           <div className="flex flex-row items-start gap-4">
            <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
               <div className="relative">
                <p className="text-gray-700/60 text-sm font-medium pb-4">
                Total Revenue
                </p>
                <h1 className="text-xl text-gray-800 font-semibold">
                    Rs&nbsp;45,890
                </h1>
               </div>
               <FaIndianRupeeSign size={30} className='text-green-600 bg-gray-100/60  rounded'/>
            </article>
            <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
               <div className="gap-8">
                <p className="text-gray-700/60 text-sm pb-4">
                Total Visitor Come
                </p>
                <h1 className="text-xl text-gray-800 font-semibold">
                  439
                </h1>
               </div>
               <PiUsersThreeBold size={35} className='text-green-600  bg-gray-100/60 rounded'/>
            </article>
            <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
               <div className="gap-8">
                <p className="text-gray-700/60 text-sm pb-4">
                Total Properties
                </p>
                <h1 className="text-xl text-gray-800 font-semibold">
                    800
                </h1>
               </div>
               <MdOutlineMapsHomeWork size={35} className='text-green-600 bg-gray-100/60 rounded'/>
            </article>
            <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
               <div className="gap-8">
                <p className="text-gray-700/60 text-sm pb-4">
                Properties for Sell
                </p>
                <h1 className="text-xl text-gray-800 font-semibold">
                    700
                </h1>
               </div>
               <BsLightningCharge size={35} className='text-green-600 bg-gray-100/60 rounded'/>
            </article>
            <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
               <div className="gap-8">
                <p className="text-gray-700/60 text-sm pb-4">
                Properties for Rent
                </p>
                <h1 className="text-xl text-gray-800 font-semibold">
                    100
                </h1>
               </div>
               <MdOutlineAddHome size={35} className='text-green-600 bg-gray-100/60 rounded'/>
            </article>
           </div>
           <div className="rounded shadow w-[75vw] h-[60vh] mt-10 px-4 bg-white pb-10">
               <Bar data={data} options={options}/>
           </div>
        </div>
    </section>
  )
}

export default Dashboard