

export interface Item  {
    namefood: string;
    img?: string;
    description: string;
    price: number;
    quantity: number;
    totalprice: number;
  };
  
// cart - page
  export interface Details  {
    name: string;
    quandoitac?: boolean;
    items: Item[];
  };