'use client'

import { AccountBookOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import DetailsCheckout from "./detailsCheckout";
import { useRouter } from "next/navigation";
import { IOrder,IOrderItem, IProduct } from "../../interfaces/interface"; 
import { useEffect, useState } from "react";
import { authService, productService } from "@/service/service";


interface IUserInfo {
    user_id: number;
    email: string;
    phone_number: string;
    user_name: string;
}
export default function CheckOut() {
   
    const router = useRouter();
    
    // State for managing cart items and user info
    const [cart, setCart] = useState<IProduct[]>([]);
    const [info, setInfo] = useState<IUserInfo | null>(null);
   // const [address, setAddress] = useState('123 Example Street'); // Replace with default address
   // const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // Replace with default payment method

    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('cart');
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

    // Calculate total price and total quantity
    const totalPrice = cart.reduce((sum, product) => sum + (product.price * (product.quantity || 0)), 0);
    const totalQuantity = cart.reduce((sum, product) => sum + (product.quantity || 0), 0);

    // const handleNavigate = () => {
    //     router.push('/statusOrder');
    // };
    const submitOrder = async () => {
        const token = localStorage.getItem('baemin_user');
    
        if (!cart || !Array.isArray(cart)) {
            console.error('Cart is empty or not an array');
            return;
        }
    
        const orderItems: IOrderItem[] = cart.map(item => ({
            product_id: item.product_id, 
            quantity: item.quantity || 0
        }));
    
        const order: IOrder = {
            date: new Date().toISOString().split('T')[0], 
            store_id: cart.length > 0 ? cart[0].store.store_id : 0,
            user_id: info?.user_id || 0,
            payment: "cash",
            address: 'q3',
            note: 'Leave at the door',
            fee: 5000,
            discount: 1000,
            tracking_id: 5, 
            orderCart: orderItems
        };
    
        console.log('Order packaged:', order);
    
        try {
            if (!token) {
                throw new Error('No authentication token found');
            }
    
            const response = await productService.createOrder(order);
            
           // console.log('response',response.data.data)
            localStorage.setItem('order_id',response.data.data);
           router.push('/statusOrder');
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };
    
    // const submitOrder = async () => {
    //     const token = localStorage.getItem('baemin_user');

    //     if (!cart || !Array.isArray(cart)) {
    //         console.error('Cart is empty or not an array');
    //         return;
    //     }

    //     const orderItems: IOrderItem[] = cart.map(item => ({
    //         product_id: item.product_id, 
    //         quantity: item.quantity || 0
    //     }));

    //     const order: IOrder = {
    //         date: new Date().toISOString().split('T')[0], 
    //         store_id: cart.length > 0 ? cart[0].store.store_id : 0, // Assuming store_id is the same for all products in the cart
    //         user_id: info?.user_id || 0,
    //         payment: paymentMethod,
    //         address: address,
    //         note: 'Leave at the door',
    //         fee: 5000,
    //         discount: 1000,
    //         tracking_id: 5, 
    //         orderCart: orderItems
    //     };

    //     console.log('Order packaged:', order);

    //     try {
    //         if (!token) {
    //             throw new Error('No authentication token found');
    //         }

    //         await productService.createOrder(order)
    //         .try
    //         console.log(data)
    //         .catch; 
    //         console.log('Order submitted successfully');
    //         router.push('/statusOrder');
    //     } catch (error) {
    //         console.error('Error submitting order:', error);
    //     }
    // };
    return (
        <>
            <div className="flex flex-row w-full h-20 bg-white">
                <div className="w-1/2 h-full flex flex-row items-center gap-3">
                    <div className="ml-10 text-4xl text-beamin font-bold">
                        <ShoppingCartOutlined />
                    </div>
                    <div className="text-2xl text-beamin">|</div>
                    <div className="text-3xl text-beamin font-bold">Thanh Toán</div>
                </div>
            </div>

            <div className="px-16 flex flex-col gap-3">
                <div className="w-full h-28 flex flex-col bg-white rounded-md pl-10 pt-5">
                    <div className="flex flex-row gap-1">
                        <div className="text-xl">
                            <svg
                                version="1.1"
                                viewBox="0 0 2048 2048"
                                width="30"
                                height="30"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Your SVG content here */}
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-beamin">Địa chỉ giao hàng</span>
                    </div>
                    <div className="pl-3 flex flex-row gap-5 items-center mb-3 mt-3">
                        <span className="font-bold">{info?.user_name} - {info?.phone_number} </span>
                        <span>Địa chỉ: 123 Lê Lợi, Quận 1, TP.Hồ Chí Minh</span>
                        <div className="border border-solid border-beamin p-1 text-xs text-beamin"> Mặc định </div>
                        <span className="ml-3 text-blue-600 text-sm cursor-pointer"> Thay đổi </span>
                    </div>
                </div>

                <div className="w-full bg-white rounded-md flex flex-col pt-5">
                    <div className="ml-10">The Chicken Gang</div>

                    {/* Pass cart items to DetailsCheckout */}
                    <DetailsCheckout items={cart} />

                    <div className="border-t w-full mt-4">
                        <div className="ml-[40%] flex flex-row justify-between items-center py-2">
                            <div className="flex flex-row items-center gap-3">
                                <div className="text-beamin text-xl">
                                    <AccountBookOutlined />
                                </div>
                                <span className="text-base"> Voucher của bạn</span>
                            </div>
                            <div className="pr-10 text-blue-600 cursor-pointer">Chọn Voucher</div>
                        </div>
                    </div>

                    <div className="border-t w-full grid grid-cols-12 h-28">
                        <div className="col-span-5 border-r pt-4 pl-9 pb-10 flex flex-row items-center gap-3">
                            <span className="text-nowrap">Lời Nhắn:</span>
                            <input
                                type="text"
                                placeholder="Lưu ý cho người bán"
                                className="border-gray-300 focus-visible:border-beamin border border-solid mr-3 w-full h-8 pl-1"
                            />
                        </div>
                        <div className="col-span-7">
                            <div className="grid grid-cols-12 pt-4">
                                <div className="col-span-4 pt-3 text-sm ml-3">Phương thức vận chuyển:</div>
                                <div className="col-span-4 flex flex-col gap-1">
                                    <span className="font-bold">Vận chuyển tiết kiệm</span>
                                    <span className="text-sm">Giao hàng từ 15-30 phút</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-blue-600 text-sm cursor-pointer"> Thay đổi</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-sm">₫17.000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t w-full h-16 flex justify-end pr-5 gap-2 items-center">
                        <span>Tổng số tiền ({totalQuantity} sản phẩm):</span>
                        <span className="text-beamin font-bold">₫{totalPrice}</span>
                    </div>
                </div>

                <div className="w-full flex flex-col bg-white rounded-md pt-5 gap-3">
                    <div className="flex flex-row gap-3 pl-10 mb-4">
                        <div className="font-medium">Phương Thức Thanh toán:</div>
                        {/* Add your payment options here */}
                    </div>

                    <div className="w-full border-t flex flex-row justify-between items-center pt-4 gap-4 mb-4">
                        <div className="w-[70%] ml-8">
                            Nhấn Đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo
                            <span className="text-blue-600 text-sm cursor-pointer">Điều khoản Baemin</span>
                        </div>
                        <div className="w-[30%] pl-48">
                            <button onClick={()=>submitOrder()} className="p-1 bg-beamin text-white w-36 rounded-md h-10 hover:brightness-105">
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
