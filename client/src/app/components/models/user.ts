export interface User {
  email: string,
  password: string,
  confirmPassword?: string
  age?: number,
  terms?: boolean,
  nickname: string,
  username?: string,
  id?: number,
  photoUrl?: string
  created_at?:string
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



