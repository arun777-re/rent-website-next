/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import React, { useEffect, useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineMapsHomeWork, MdOutlineAddHome } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getAllProperty,
  getRentedProperties,
  getSoldProperties,
  getTotalRevenue,
} from "@/redux/slices/propertSlice";
import { getActiveUsers } from "@/redux/slices/adminSlice";

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
  const [sold, setSold] = useState<number>(0);
  const [rented, setRented] = useState<number>(0);
  const [allProperties, setAllProperties] = useState<number>(0);
  const [active, setActive] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getSoldProperties({ page: 6, limit: 10 }))
      .unwrap()
      .then((res) => {
        const items = res.dataLength ?? 0;
        setSold(items);
      });
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllProperty({ page: 1, limit: 10 }))
      .unwrap()
      .then((res) => {
        const items = res.dataLength ?? 0;
        setAllProperties(items);
      });
  }, [dispatch]);
  useEffect(() => {
    dispatch(getActiveUsers())
      .unwrap()
      .then((res) => {
        const items = res.dataLength ?? 0;
        setActive(items);
      });
  }, [dispatch]);
  useEffect(() => {
    dispatch(getRentedProperties({ page: 6, limit: 10 }))
      .unwrap()
      .then((res) => {
        const items = res.dataLength ?? 0;
        setRented(items);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotalRevenue())
      .unwrap()
      .then((res) => {
        const items = res.dataLength ?? 0;
        setRevenue(items);
      });
  }, [dispatch]);

  const data = {
    type: "bar",
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue Analytics",
        data: [45, 20, 40, 50, 60, 50, 100, 300, 300, 100, 900, 300],
        backgroundColor: "rgba(22, 163, 74, 0.8)",
        borderColor: "rgba(22, 163, 74, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#1f2937", // Tailwind gray-800
        },
      },
      title: {
        display: true,
        text: "Monthly Revenue (₹)",
        color: "#1f2937",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280", // Tailwind gray-500
        },
        grid: {
          color: "#e5e7eb", // Tailwind gray-200
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  const admindata = useSelector((state: RootState) => state.admin.admin.data);

  return (
    <section className="w-full relative h-auto ">
      <article className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">Hello, {admindata?.name}</h2>
        <p className="text-sm text-gray-700/60 font-medium">Welcome back!</p>
      </article>
      <div className="flex flex-col items-start h-auto py-5 pb-10">
        <div className="flex flex-row items-start gap-4">
          <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
            <div className="relative">
              <p className="text-gray-700/60 text-sm font-medium pb-4">
                Total Revenue
              </p>
              <h1 className="text-xl text-gray-800 font-semibold">
                Rs&nbsp;{typeof revenue === 'number' ? revenue : 0}
              </h1>
            </div>
            <FaIndianRupeeSign
              size={30}
              className="text-green-600 bg-gray-100/60  rounded"
            />
          </article>
          <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
            <div className="gap-8">
              <p className="text-gray-700/60 text-sm pb-4">
                Total Visitor Come
              </p>
              <h1 className="text-xl text-gray-800 font-semibold">{typeof active === 'number' ? active : 0}</h1>
            </div>
            <PiUsersThreeBold
              size={35}
              className="text-green-600  bg-gray-100/60 rounded"
            />
          </article>
          <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
            <div className="gap-8">
              <p className="text-gray-700/60 text-sm pb-4">Total Properties</p>
              <h1 className="text-xl text-gray-800 font-semibold">
                {typeof allProperties === 'number' ? allProperties : 0}
              </h1>
            </div>
            <MdOutlineMapsHomeWork
              size={35}
              className="text-green-600 bg-gray-100/60 rounded"
            />
          </article>
          <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
            <div className="gap-8">
              <p className="text-gray-700/60 text-sm pb-4">
                Properties for Sell
              </p>
              <h1 className="text-xl text-gray-800 font-semibold">{typeof sold === 'number' ? sold : 0}</h1>
            </div>
            <BsLightningCharge
              size={35}
              className="text-green-600 bg-gray-100/60 rounded"
            />
          </article>
          <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
            <div className="gap-8">
              <p className="text-gray-700/60 text-sm pb-4">
                Properties for Rent
              </p>
              <h1 className="text-xl text-gray-800 font-semibold">{typeof rented === 'number' ? rented : 0}</h1>
            </div>
            <MdOutlineAddHome
              size={35}
              className="text-green-600 bg-gray-100/60 rounded"
            />
          </article>
        </div>
        <div className="rounded shadow w-[75vw] h-[60vh] mt-10 px-4 bg-white pb-10">
          <Bar data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
