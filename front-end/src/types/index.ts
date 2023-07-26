export interface Photograph {
  id: number;
  url: string;
  describe: string;
  propertyId: number;
}

export interface Property {
  id: number;
  about: string;
  type: string;
  iptu: string;
  rental: string;
  sell: string;
  description: string;
  footage: number;
  bathroom: number;
  bedroom: number;
  garage: number;
  city: string;
  state: string;
  area: string;
  photographs: Photograph[];
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
  accessToken?: string;
  user?: Partial<User>;
}

export interface Error {
  error?: string;
  message?: string | string[];
  statusCode?: number;
}

export interface Message {
  status: number;
  message: string;
  type: string;
}

// filter page

export interface Create {
  name: string;
  phone: string;
  email: string;
  hashedPassword: string;
  confirmation: string;
}
