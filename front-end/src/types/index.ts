export interface Photograph {
  id: number;
  url: string;
  describe: string;
  propertyId: number;
}

export interface Upload {
  file: File | null;
  describe: string;
}

export interface Owner {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Property {
  id: number;
  published: boolean;
  business: string;
  about: string;
  sell: string | null;
  rental: string | null;
  iptu: string;
  description: string;
  footage: number;
  bedroom: number;
  bathroom: number;
  garage: number;
  address: string;
  number: string;
  complement?: string | null;
  zipcode: string;
  area: string;
  city: string;
  state: string;
  situation: string;
  zone: string | null;
  register: number;
  createdAt: string;
  updatedAt: string;
  photographs?: Photograph[];
  owners?: Owner[];
}

export interface PageFilter {
  items: Property[];
  nextPage: boolean;
  page: number;
  previousPage: boolean;
  totalItems: number;
}

export interface FilterPageProperty {
  type?: string;
  text?: string;
  minV?: string;
  maxV?: string;
  minFoo?: string;
  maxFoo?: string;
  bedroom?: string;
  bathroom?: string;
  garage?: string;
}

// User

export interface Login {
  email: string;
  password: string;
}

export interface CreateUserClient {
  name: string;
  phone: string;
  email: string;
  hashedPassword: string;
}

export interface User extends CreateUserClient {
  id: number;
  hashedRefreshToken: string;
  validation: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetUser {
  accessToken: string;
  user: User;
}

export interface ErrorAxios {
  error: string;
  message: string;
  statusCode: number;
}

export interface Message {
  status: number;
  message: string;
  type?: string | null;
}

//form
export interface UpdateUser {
  phone: string;
  name: string;
}

export interface SendProperty {
  type: string;
  about: string;
  sell: string | null;
  rental: string | null;
  iptu: string;
  description: string;
  footage: number;
  bedroom: number;
  bathroom: number;
  garage: number;
  address: string;
  number: string;
  complement?: string | null;
  zipcode: string;
  area: string;
  city: string;
  state: string;
  zone: string | null;
}

export interface CreateUser extends CreateUserClient {
  confirmation: string;
  check: boolean;
}

export interface Sucess {
  sucess: string;
}

//button
export interface Button {
  name: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}
