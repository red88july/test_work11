export interface Registration {
  username: string;
  password: string;
  name: string;
  phone: string;
}

export interface User {
  _id: string;
  username: string;
  name: string,
  phone: string,
  token: string;
}

export interface RegistrationResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  message: string;
}

export interface GlobalError {
  message: string;
}

export interface Product {
  title: string;
  description: string;
  price: number;
  category: string;
  image: File | null;
}

export interface ProductsMutation {
  _id: string;
  user: User;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
}