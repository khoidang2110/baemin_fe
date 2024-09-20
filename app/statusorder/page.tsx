'use client'
import { ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Status from './status';
import DetailsCheckout from '../checkout/detailsCheckout';
import {IProduct,IUserInfo } from '../../interfaces/interface'
import { authService } from '@/service/service';
const Page: React.FC = () => {
  
    const [cart, setCart] = useState<IProduct[]>([]);
    const [info, setInfo] = useState<IUserInfo | null>(null);
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('tracking');
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart);
                setCart(parsedCart);
            }
        } catch (error) {
            console.error('Failed to parse cart from localStorage:', error);
        }
        const token = localStorage.getItem('baemin_user');
        if (token) {
            authService
                .getUserInfo(token)
                .then((res) => {
                    setInfo(res.data.data);
                })
                .catch((err) => {
                    console.error('Failed to get user info:', err);
                });
        }
       
    }, []);


   

   
    return (
        <>
            <div className="flex flex-row w-full h-20 bg-white ">
                <div className="w-1/2 h-full flex flex-row  items-center gap-3">
                    <div className="ml-10 text-4xl  text-beamin font-bold" >
                        <ShoppingCartOutlined />
                    </div>
                    <div className="text-2xl  text-beamin ">
                        |
                    </div>
                    <div className="text-3xl  text-beamin font-bold">
                        Trình trạng đơn hàng
                    </div>
                </div>
                <div className="w-1/2 h-full flex   items-center gap-3">


                </div>
            </div>
            <div className='grid grid-cols-12 '>
                <div className='col-span-3  pt-3 pb-3 pl-16'>
                    <div className='w-full h-full bg-white rounded-md flex flex-col pl-4 pt-2 pb-4'>
                        <div className='font-semibold'> Trình Trạng </div>
                        {/* <Status items={status} /> */}
                        <Status/>
                    </div>
                </div>
                <div className='col-span-9 pt-3 pl-6 pr-10 flex flex-col gap-2 pb-3 h-full'>
                    <div className='w-full h-[70%] rounded-md'>
                        <div className='w-full h-full relative'>
                            <Image layout="fill" objectFit="cover" src={'/images/baemin-1.jpg'} alt=''></Image>
                        </div>

                    </div>
                    <div className='w-full  bg-white rounded-md p-4 flex flex-col'>
                        <div className='w-full flex flex-row'>
                            <div className='w-1/3 flex flex-col gap-2'>
                                <div>
                                    Đồ ăn | {cart[0]?.store?.store_name}
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    143.000đ - 1 món - Ví MoMo
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    {info?.user_name} - {info?.phone_number}
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col gap-2'>
                                <div>
                                    Giao hàng đến
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    169 Nguyễn Thị Thập, Phường Bình Thuận, Quận 7
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    thời gian hoàn thành: %%:%%
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col  gap-2 pl-5'>
                                <div className='font-medium flex flex-row justify-between '>
                                    <span> Tổng (1 món):</span>
                                    <span className='text-beamin'>164.000d</span>
                                </div>
                                <div className='text-sm flex flex-row justify-between border-t'>
                                    <span> phí giao hàng (1 km):</span>
                                    <span className='text-beamin'>16.000d</span>
                                </div>
                                <div className='text-sm flex flex-row justify-between '>
                                    <span> phí dịch vụ:</span>
                                    <span className='text-beamin'>16.000d</span>
                                </div>
                                <div className='text-sm flex flex-row justify-between '>
                                    <span> Giảm giá:</span>
                                    <span className='text-beamin'>16.000d</span>
                                </div>
                                <div className='text-beamin w-full flex flex-row items-end justify-end text-xl font-medium pr-3 pt-3'>
                                    <span>164.000d</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mt-2 border-t'>
                            <DetailsCheckout items={cart}  />
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default Page;