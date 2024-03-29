export interface Brands {
  brand_name?: string;
  brand_id: number;
  brand?: string;
  brand_img?: string;
}


export interface Categories {
  category_name: string;
  category_id: number;
}
// FIXME id vs pid
export interface Product {
  id? : number | string;
  pid? : number | string;
  uid : number | undefined;
  price: number;
  favorite:  string;
  quantity: number;
  brand: string;
  brand_id?: number;
  brand_img?: string;
  brand_name?: string;
  category: string;
  category_id?: number;
  category_name?: string;
  text: string;
  name: string;
  codebar?: string;
}
