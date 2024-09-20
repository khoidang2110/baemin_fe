'use client';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NO_IMAGE } from "../constant/index";
interface Product {
    product_id:number;
    img: string;
    product_name: string;
    store: {
        store_name:string;
        store_address: string;
        img:string;
    };
    category: {
        category_name: string;
    };
}

interface ScrollFoodProps {
    title: string;
    items: Product[];
}

export default function ScrollStore({ title, items }: ScrollFoodProps) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNavigate = (id:number) => {
        router.push(`/detailFood/${id}/`);
    };

    const handleNext = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.getBoundingClientRect().width;
            if (currentIndex < items.length - 1) {
                setCurrentIndex(currentIndex + 1);
                containerRef.current.scrollBy({ left: containerWidth / 3, behavior: 'smooth' });
            }
        }
    };

    const handlePrev = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.getBoundingClientRect().width;
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
                containerRef.current.scrollBy({ left: -containerWidth / 3, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl w-full" style={{ height: '300px' }}>
            <div className="w-full h-full flex flex-col px-4 pt-4 pb-2" style={{ height: '100%' }}>
                <div className="relative ml-3 text-xl font-bold mb-2">{title}</div>
                <div className="relative w-full h-full flex items-center">
                    {currentIndex > 0 && (
                        <button 
                            onClick={handlePrev} 
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 hover:text-beamin hover:bg-slate-50 bg-white w-8 h-8 rounded-full z-20">
                            <LeftOutlined />
                        </button>
                    )}
                    <div ref={containerRef} className="scroll-container w-full h-full flex flex-row gap-3 overflow-x-auto scroll-smooth">
                        {items.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={()=>handleNavigate(item.product_id)} 
                                className="group w-48 h-full cursor-pointer flex-shrink-0">
                                <div className="w-full h-2/3 relative">
                                    <Image 
                                        layout="fill" 
                                        objectFit="cover" 
                                        src={ NO_IMAGE}
                                        alt={item.product_name} 
                                        
                                       
                                        className="group-hover:brightness-75" 
                                    />
                                </div>
                                <div className="group-hover:bg-slate-50 w-full h-1/3 flex flex-col pl-2 pr-2 border-solid border-2 border-beamin-50">
                                    <div className="w-full truncate text-base">
                                        <span>{item.store.store_name}</span>
                                    </div>
                                    <div className="w-full truncate text-sm text-gray-500">
                                        <span>{item.store.store_address}</span>
                                    </div>
                                    <div className="w-full text-sm border-t border-beamin-50 mt-2">
                                        <span>{item.category.category_name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {currentIndex < items.length - 1 && (
                        <button 
                            onClick={handleNext} 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-beamin hover:bg-slate-50 bg-white w-8 h-8 rounded-full z-20">
                            <RightOutlined />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
