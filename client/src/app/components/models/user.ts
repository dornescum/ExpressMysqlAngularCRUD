export interface User {
  email: string,
  password: string,
  confirmPassword?: string
  age?: number,
  terms?: boolean,
  nickname: string,
  id?: number
}

export interface Modules {
  module_id: number,
  module_name: string,
  module_img: string
}


export interface Questions {
  choice_id? : number,
  choices?: string,
  is_correct?: number,
  module_img?: string,
  module_name?: string,
  question?: string,
  question_id?: string,
}


export interface Product {
  pid? : number | string,
  uid : number | undefined,
  price: number,
  favorite: boolean,
  quantity: number,
  brand: string,
  category: string,
  text: string,
  name: string
}
