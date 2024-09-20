'use client'
//import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import TypeSelector from './type';
import AreaSelector from './area';
import FilterSelector from './filter';
import ResultFood from './result';
import { usePathname } from 'next/navigation';
import { productService } from '@/service/service';



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
const Page: React.FC = () => {
    const items=[{
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
]
const [lstProduct, setLstProduct] = useState<IProduct[]>([])
const pathname = usePathname();


 console.log('pathname',pathname?.slice(8))
// const searchParams = useSearchParams()
// const nameProduct = searchParams.get("nameProduct")

useEffect(() => {

    if(pathname){
        productService
        .findProduct(pathname.slice(8))
        .then(result => {
            console.log(result.data)
            setLstProduct(result.data)
        })
    }


}, [])


    return (
        <>
            <div className='w-full flex flex-row justify-between items-center border-b border-solid'>
                <div className='flex flex-row gap-3'>
                    <AreaSelector />
                    <TypeSelector />
                </div>
                <div className='flex items-center justify-center '>
                    <FilterSelector></FilterSelector>
                </div>

            </div>
            <div className='my-3 flex flex-row'>
                Các món ăn tìm được: 
            </div>
            <ResultFood items={lstProduct} />
        </>
    )
}
export default Page;