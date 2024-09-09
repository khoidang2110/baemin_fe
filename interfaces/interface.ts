
// checkout - detail checkout
// checkout - page
export interface IItem {
  name: string;
  img: string;
  description: string;
  price: number;
  quantity: number;
  totalprice: number;
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
export interface IStatusItem {
  id: string;
  number: number;
  name: string;
  st: boolean;
}

// export interface IDetailItem {
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   totalprice: number;
//   img: string;
// }

// componnents - scrollBar
export interface IItemScrollBar{
  url: string;
}
