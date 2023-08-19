export interface User {
  email: string,
  password: string,
  confirmPassword?: string
  age?: number,
  terms?: boolean,
  nickname: string
}
