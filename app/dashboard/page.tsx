'use client';
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import ScrollStore from "@/components/scrollStore";
import { productService } from "@/service/service";
import React, { useEffect, useState } from "react";

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

export default function DashBoard() {
  const banneritems = [
    {
      id: '1',
      name: 'anh 1',
      url: '/images/map1.png',
    },
    {
      id: '2',
      name: 'anh 2',
      url: '/images/map2.png',
    },
    {
      id: '3',
      name: 'anh 32',
      url: '/images/map3.png',
    },
    {
      id: '4',
      name: 'anh 32',
      url: '/images/map4.png',
    }
  ];

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService
      .getAllProduct()
      .then((res) => {
        setProducts(res.data);
        console.log('Products:', res.data); 
        
        // Log products after fetching
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
      });
  }, []);

  // Extract unique categories
  const uniqueCategories = Array.from(new Set(products.map(product => product.category.category_name)));




  // const TodayFood = {
  //   title: 'Hôm Nay ăn gì',
  //   items: products // Use fetched products
  // };
    // Get the first product for each unique store
    const uniqueStoreProducts = products.reduce<Product[]>((acc, product) => {
      const storeExists = acc.find(p => p.store.store_name === product.store.store_name);
      if (!storeExists) {
        acc.push(product); // Add the product if the store hasn't been added yet
      }
      return acc;
    }, []);
  
    // Data for ScrollFood
    const store = {
      title: 'Các Quán Ngon',
      items: uniqueStoreProducts // Use unique store products
    };
    const allFood = {
      title: 'Hôm Nay ăn gì',
      items: products // Use unique store products
    };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 pt-3 pl-8 pr-8 z-40">
          <div className="flex flex-col fixed bg-white w-64 rounded-2xl pl-3 pt-2 pb-5 gap-3">
            <span>Thực đơn</span>
            {uniqueCategories.map((category, index) => (
              <div key={index} className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100">
                <div className="flex flex-row items-center gap-1">
                  <span>{category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-9 w-full pt-3 pr-8 gap-3 flex flex-col">
          <ScrollBar items={banneritems} />
          <ScrollStore title={store.title} items={store.items} />
          <ScrollFood title={allFood.title} items={allFood.items} />
        </div>
      </div>
    </>
  );
}
