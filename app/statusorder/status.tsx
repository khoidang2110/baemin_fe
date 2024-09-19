'use client'
import { useEffect, useState } from "react";
import { IStatusItem } from '../../interfaces/interface';
import { productService } from "@/service/service";



export default function Status() {

    const [orderId, setOrderId] = useState<string | undefined>();
    const [status, setStatus] = useState<IStatusItem[]>([]);
   // const [orderDetails, setOrderDetails] = useState<any>(null); // Adjust type according to your API response

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const storedOrderId = localStorage.getItem('order_id');
                if (storedOrderId) {
                    setOrderId(storedOrderId);
                    const response = await productService.getTracking(storedOrderId);
                    console.log('response', response);
                    const sortedStatus = response.data.sort((a: IStatusItem, b: IStatusItem) => a.tracking_id - b.tracking_id);
                    setStatus(sortedStatus);
                  //  setOrderDetails(response.data); // Assuming response.data contains your order details
                }
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            }
        };

        fetchOrderDetails();
    }, []);

   


   

    useEffect(() => {
        const storedOrderId = localStorage.getItem('order_id');
        if (storedOrderId) {
            setOrderId(storedOrderId);
        }
    }, []);

    const handleClick = async (tracking_id: number) => {
        if (!orderId) {
            console.error("Order ID is not set.");
            return;
        }
    
        try {
            const result = await productService.updateTracking(orderId, tracking_id);
            console.log("Update successful:", result);
    
            // Fetch updated tracking status
            const response = await productService.getTracking(orderId);
            console.log('response', response);
            const sortedStatus = response.data.sort((a: IStatusItem, b: IStatusItem) => a.tracking_id - b.tracking_id);
            setStatus(sortedStatus);
        } catch (err) {
            console.error("Error updating tracking:", err);
        }
    };
    

    return (
        <div className="mt-2 flex flex-col gap-3 relative">
            {status.map((item, index) => (
                <div key={item.tracking_id}>
                    <div onClick={() => handleClick(item.tracking_id)} className="flex flex-row gap-3 items-center cursor-pointer">
                        <div className={`${item.active ? "border-beamin" : ""} w-10 h-10 rounded-full border border-solid flex justify-center items-center`}>
                            <span className={`${item.active ? "text-beamin" : "text-gray-600"}`}>
                                {item.tracking_id}
                            </span>
                        </div>
                        <div className={`text-wrap text-[14px] ${item.active ? "text-beamin" : "text-gray-600"}`}>
                            {item.tracking_status}
                        </div>
                    </div>
                    {status.length - 1 !== index && (
                        <div className="relative flex flex-col left-4 bottom-5 text-xl font-bold gap-1">
                            <span className="pt-1"></span>
                            <span className={`${item.active ? "text-beamin" : "text-gray-600"}`}>.</span>
                            <span className={`${item.active ? "text-beamin" : "text-gray-600"}`}>.</span>
                            <span className={`${item.active ? "text-beamin" : "text-gray-600"}`}>.</span>
                           
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
