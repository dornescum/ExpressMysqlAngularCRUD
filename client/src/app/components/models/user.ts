export interface User {
  email: string,
  password: string,
  confirmPassword?: string
  age?: number,
  terms?: boolean,
  nickname: string
}

export interface Modules {
  module_id: number,
  module_name: string,
  module_img: string
}
