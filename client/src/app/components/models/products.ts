export interface Brands {
  brand_name: string;
  brand_id: number;
}


export interface Categories {
  category_name: string;
  category_id: number;
}

export interface Product {
  id? : number | string,
  uid : number | undefined,
  price: number,
  favorite: boolean,
  quantity: number,
  brand: string,
  category: string,
  text: string,
  name: string,
  codebar?: string
}
