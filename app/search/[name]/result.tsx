'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IItemResult } from '../../../interfaces/interface';
import { NO_IMAGE } from '@/constant';


interface IProduct {
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


export default function ResultFood({ items }: { items:  IProduct[] }) {
    const router = useRouter();
    const handleNavigate = (item:IProduct) => {
       
        router.push(`/detailFood/${item?.product_id}`); 
      
    };
    return (
        <>
            <div className='mt-3 flex flex-row flex-wrap gap-3 '>
                {items.map((item:IProduct)=>(
                <div onClick={()=>handleNavigate(item)} key={item?.product_id} className='group w-[19%] h-56 bg-white flex flex-col cursor-pointer'>
                    <div className='group-hover:brightness-105 w-full h-[60%] relative'>
                        <Image layout="fill" objectFit="cover" src={NO_IMAGE} alt={""}></Image>
                    </div>
                    <div className='group-hover:bg-slate-50 w-full h-[40%] pr-3  border border-solid'>
                        <div className="ml-3  w-full truncate text-base h-[30%] ">
                            <span className='font-bold text-[#252525]'> {item?.product_name} </span>
                        </div>
                        <div className="ml-3 w-full truncate text-sm  h-[30%]" style={{ color: '#959595' }}>
                            <span>{item?.store?.store_address}</span>
                        </div>
                        <div className=" flex items-center w-full text-sm border-t  border-beamin-50  h-[30%]">
                            <span className="ml-3 ">{item?.category?.category_name}</span>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </>

    )

}