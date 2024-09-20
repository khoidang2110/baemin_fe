import { axiosClient } from "./config";



export let productService = {

      getAllProduct:()=>{
        return axiosClient.get(`/product/get-all`)
      },
      findProduct:(name:string)=>{
return axiosClient.get(`/product/search-pagination?page=1&name=${name}`)
      },
    
      createOrder:(value:any)=>{
        return axiosClient.post(`/product/order`, value)
      },
      getTracking:(order_id:any)=>{
        return axiosClient.get(`/product/tracking/${order_id}`)
      },
      updateTracking: ( order_id: string, tracking_id: number ) => {
        return axiosClient.post(`/product/update_tracking?order_id=${order_id}&tracking_id=${tracking_id}`);
    }
    }

export let authService = {
      signIn:(email:string,password:string)=>{
        return axiosClient.post(`/auth/login?email=${email}&password=${password}`)
      },
      signUp:(value:any)=>{
        return axiosClient.post(`/auth/sign-up`,value)
      },
      getUserInfo:(token:string)=>{
        return axiosClient.post(`/auth/get-user-info?token=${token}`)
      }
}


