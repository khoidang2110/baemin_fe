
// checkout - detail checkout
// checkout - page
export interface IItem {
  name: string;
  img: string;
  description: string;
  price: number;
  quantity: number;
  totalprice?: number;
}
  
// cart - page
export interface IItemCart  {
  id?: string;
  namefood: string;
  description: string;
  img?: string;
  price: number;
  quantity: number;
  totalprice: number;
};

export interface IDetailsCart {
  name: string;
  quandoitac?: boolean;
  items: IItemCart[];
};

  // search - result
  
export interface IItemResult {
  id: string;
  name: string;
  img: string;
  address: string;
  kind: string;
}

// statusOrder - status
// export interface IStatusItem {
//   id: string;
//   number: number;
//   name: string;
//   st: boolean;
// }

export interface IStatusItem {
  tracking_id: number;
  tracking_status: string;
  active: boolean;
}
 


// statusOrder - page
export interface IDetailItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
  totalprice: number;
  img: string;
}

// componnents - scrollBar
export interface IItemScrollBar{
  url: string;
}
// checkout 

export interface IOrderItem {
  product_id: number;
  quantity: number;
}

 export interface IOrder {
  date: string;
  store_id: number;
  user_id: number;
  payment: string;
  address: string;
  note: string;
  fee: number;
  discount: number;
  tracking_id: number;
  orderCart: IOrderItem[];
}
// detail food

export interface IProduct {
  product_id:number;
  img: string;
  product_name: string;
  price:number;
  description: string;
  store: {
    store_id:number;
     store_name:string;
      store_address: string;
      img:string;
  };
  category: {
      category_name: string;
  };
  quantity?: number;
}


export interface IUserInfo {
  user_id: number;
  email: string;
  phone_number: string;
  user_name: string;
}