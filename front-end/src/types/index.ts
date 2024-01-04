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
  propertyId?: number;
}

export interface Owners {
  owner: Owner;
  ownerId: number;
  propertyId: number;
}

export interface Card {
  id: number;
  published: boolean;
  business: string;
  about: string;
  sell: number | null;
  rental: number | null;
  iptu: number;
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
  photographs: Photograph[];
}

export interface Property {
  id: number;
  published: boolean;
  business: string;
  about: string;
  sell: number | null | string;
  rental: number | null | string;
  iptu: number | string;
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
  user: User;
  photographs: Photograph[];
  owners: Owners[];
}

export interface PageFilter {
  items: Card[];
  nextPage: boolean;
  page: number;
  previousPage: boolean;
  totalItems: number;
}

export interface FilterPageProperty {
  business?: string;
  about?: string;
  text?: string;
  minV?: number | string;
  maxV?: number | string;
  minFoo?: number;
  maxFoo?: number;
  bedroom?: number;
  bathroom?: number;
  garage?: number;
  order?: string;
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
  sell: number | null | string;
  rental: number | null | string;
  iptu: number | string;
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

export interface Reset {
  password: string;
  confirmation: string;
  one: string;
  two: string;
  three: string;
  four: string;
}

export interface SendEmail {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  text?: string;
}
