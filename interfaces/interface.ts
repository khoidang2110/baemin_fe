
// checkout - detail checkout
// checkout - page
export interface Item {
  name: string;
  img: string;
  description: string;
  price: number;
  quantity: number;
  totalprice: number;
}
  
// cart - page
  export interface Details  {
    name: string;
    quandoitac?: boolean;
    items: Item[];
  };

  // search - result
  
export interface Item_result {
  id: string;
  name: string;
  img: string;
  address: string;
  kind: string;
}

// statusOrder - status
export interface StatusItem {
  id: string;
  number: number;
  name: string;
  st: boolean;
}

export interface DetailItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
  totalprice: number;
  img: string;
}

// componnents - scrollBar
export interface Item_scroll_bar{
  url: string;
}
