export type SortOrder = 'asc' | 'desc';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type CreateUserData = Omit<User, 'id'>;
export type UpdateUserData = Partial<CreateUserData>

export interface Customer {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

export type CreateCustomerData = Omit<Customer, 'id'>;
export type UpdateCustomerData = Partial<CreateCustomerData>;

export type InvoiceStatus = 'PEDENTE' | 'PAGO';

export interface Invoice {
  id: string;
  customer_id: string;
  amount: number;
  date: Date;
  status: InvoiceStatus;
};

export type CreateInvoiceData = Omit<Invoice, 'id'>;
export type UpdateInvoiceData = Partial<CreateInvoiceData>;

export interface FindAllCustomerParams {
  search: string;
  page: number;
  limit: number;
  sortBy: string;
  order: SortOrder;
}

export interface Revenue {
  month: string;
  revenue: number;
};

export interface PaginationMeta{
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
};

export interface paginatedresponse {
  data: T[];
  meta: PaginationMeta;

}

export interface ApiResponse<T> {
  data: T;
  message?: string;
};

export interface ApiError {
  error: string;
  details?: Record<string, string[]>;
};