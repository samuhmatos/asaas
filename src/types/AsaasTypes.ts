export interface AsaasOptions {
  sandbox?: boolean;
  sandboxUrl?: string;
  baseUrl?: string;
  userAgent?: string;
  printError?: boolean;
}

export interface APIOptions {
  printError?: boolean;
}

export interface IAsaasPagination<T> {
  object: 'list';
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: T[];
}

export interface IAsaasDeleteResponse {
  deleted?: boolean;
  id?: string;
}

export interface Callback {
  successUrl: string;
  autoRedirect?: boolean;
}

export interface ICity {
  object: string;
  id: number;
  ibgeCode: string;
  name: string;
  districtCode: string;
  district: string;
  state: string;
}
