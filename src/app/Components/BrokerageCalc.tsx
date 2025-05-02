"use client"
import React, { useState ,useEffect} from 'react';
import AOS from "aos";



const BrokerageCalc = () => {
    const [value,setValue] = useState<number>(0);
    useEffect(() => {
        AOS.refresh(); // tells AOS to recalculate all positions
      }, []);
  return (
    <section className='relative h-auto w-full pb-20 max-w-screen'>
        <div  className="flex flex-col items-center justify-center ">
            <article className="order-0 text-center">
                <h3>Brokerage Calculator</h3>
                <p className="max-w-lg">A great plateform to buy,sell and rent your properties without any agent or commissions</p>
            </article>
            <div data-aos='zoom-in' className="p-6 max-w-2xl rounded-lg relative w-full mt-16 border-[2px] border-gray-100">
              <form action="" className=''>
                <article className="w-full flex flex-row items-center justify-between">
                    <h4>Min Rs 1000000</h4>
                    <h4>Min Rs 100000000</h4>

                </article>
                <input type="range" className='w-full outline-none border-none mt-2' 
                min={'1000000'} max={'100000000'}
                onChange={(e) => setValue(Number(e.target.value))}
                value={value}
                />
              </form>
              <article className="flex items-center justify-between py-4">
                <div>
                    <h4>Total Value (Rs)</h4>
                    <p className='text-first'>Rs&nbsp;{value}</p>
                </div>
                <div>
                    <h4>Brokerage Fee (Rs)</h4>
                    <p className='text-first'>Rs&nbsp;{value && value/100}</p>
                </div>
              </article>
            </div>
        </div>
    </section>
  )
}

export default BrokerageCalc