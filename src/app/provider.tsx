"use client"
import { useEffect } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from "react-hot-toast";





export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(()=>{
    AOS.init({
      once:true,
      duration:800
    });
  },[]);

  return (
        <Provider store={store}>
<PersistGate loading={false} persistor={persistor}>
<Toaster position="top-right" reverseOrder={false} />
        {children}
</PersistGate>

        </Provider>
  );
}
