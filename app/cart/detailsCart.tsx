'use client';
import Image from 'next/image';
import { IProduct } from '../../interfaces/interface';
import { NO_IMAGE } from '@/constant';
import { useEffect, useState } from 'react';

export default function DetailsCart({ Details }: { Details: IProduct[] }) {
    const [cart, setCart] = useState<IProduct[]>(Details);

    useEffect(() => {
        // Update cart state when Details prop changes
        setCart(Details);
    }, [Details]);

    const handleRemove = (productId: number) => {
        // Remove item from localStorage
        const updatedCart = cart.filter(item => item.product_id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // Update state to reflect the removal
        setCart(updatedCart);
    };

    return (
        <>
            <div className="w-full flex flex-col bg-white rounded-md">
                <div className="flex flex-row my-7 ml-8 items-center gap-3">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800" />
                    <span className="text-base font-normal">{Details[0]?.store.store_name}</span>
                    <div className="bg-beamin p-1 rounded-md">
                        <span className="text-sm font-normal text-white">Quán đối tác</span>
                    </div>
                </div>
                <div className="w-full border-t border-b border-solid border-gray-600 py-3">
                    {cart.map((item, index) => (
                        <div key={item.product_id || index} className={index === cart.length - 1 ? "w-full grid grid-cols-12" : "w-full grid grid-cols-12 border-b border-solid border-x-gray-300"}>
                            <div className="pl-8 col-span-4 flex items-center flex-row gap-3">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800" />
                                {item.img && (
                                    <div className="relative h-36 w-36">
                                        <Image layout="fill" objectFit="cover" src={ NO_IMAGE} alt={item.product_name} />
                                    </div>
                                )}
                                <div className="flex flex-col gap-3">
                                    <span className="text-base">{item.product_name}</span>
                                    <span className="text-sm text-gray-600">{item.description}</span>
                                </div>
                            </div>
                            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                ₫{item.price}
                            </div>
                            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                <input type="number" id="quantity" className="w-16 text-center border border-gray-300 rounded" defaultValue={item.quantity} min="1" max="100" />
                            </div>
                            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                ₫{item.price * (item.quantity ?? 1)}
                            </div>
                            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                <span
                                    className="hover:text-red-600 cursor-pointer"
                                    onClick={() => handleRemove(item.product_id)}
                                >
                                    Xóa
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
