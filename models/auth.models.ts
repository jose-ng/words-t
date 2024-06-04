export interface FormAuth {
  email?: string;
  username?: string;
  password: string;
  //newPassword?: string;
  // oldPassword?: string;
  // code?: string;
}

export interface FormSignup extends Required<Omit<FormAuth, 'username'>> {
  rPassword: string;
}
