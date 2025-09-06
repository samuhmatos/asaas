import { Callback, IAsaasPagination } from './AsaasTypes';

export interface IAsaasPayment {
  customer: string;
  billingType: string;
  dueDate: Date;
  value: number;
  description?: string;
  externalReference?: string;
  paymentExternalReference?: string;
  creditCard?: CreditCard;
  creditCardHolderInfo?: CreditCardHolderInfo;
  creditCardToken?: string;
  installmentCount?: number;
  installmentValue?: number;
  totalValue?: number;
  remoteIp?: string;
  discount?: Discount;
  fine?: Fine;
  interest?: Fine;
  postalService?: boolean;
  authorizedOnly?: boolean;
  split?: Split[];
  callback?: Callback;
}

export interface IAsaasPaymentResponse {
  object?: string;
  id?: string;
  dateCreated?: Date;
  customer?: string;
  paymentLink?: null;
  installment?: string;
  dueDate?: Date;
  value?: number;
  netValue?: number;
  billingType?: string;
  canBePaidAfterDueDate?: boolean;
  pixTransaction?: null;
  status?: string;
  description?: string;
  externalReference?: string;
  confirmedDate?: Date;
  originalValue?: null;
  interestValue?: null;
  originalDueDate?: Date;
  paymentDate?: null;
  clientPaymentDate?: null;
  installmentNumber?: null;
  transactionReceiptUrl?: null;
  nossoNumero?: string;
  invoiceUrl?: string;
  bankSlipUrl?: string;
  invoiceNumber?: string;
  discount?: Discount;
  fine?: Fine;
  interest?: Fine;
  deleted?: boolean;
  postalService?: boolean;
  anticipated?: boolean;
  anticipable?: boolean;
  refunds?: null;
  creditCard?: CreditCardResponse;
}

export interface IListPaymentsParams {
  customer?: string;
  customerGroupName?: string;
  billingType?: string;
  status?: string;
  subscription?: string;
  installment?: string;
  externalReference?: string;
  paymentDate?: string;
  estimatedCreditDate?: string;
  pixQrCodeId?: string;
  anticipated?: boolean;
  'dateCreated[ge]'?: string;
  'dateCreated[le]'?: string;
  'paymentDate[ge]'?: string;
  'paymentDate[le]'?: string;
  'estimatedCreditDate[ge]'?: string;
  'estimatedCreditDate[le]'?: string;
  'dueDate[ge]'?: string;
  'dueDate[le]'?: string;
  user?: string;
  offset?: number;
  limit?: number;
}

export type IListAsaasPaymentsResponse =
  IAsaasPagination<IAsaasPaymentResponse>;

export interface IAsaasPaymentRefund {
  value?: number;
  description?: string;
}

export interface IAsaasPaymentBoletoResponse {
  identificationField?: string;
  nossoNumero?: string;
  barCode?: string;
}

export interface IAsaasPaymentPixQrCodeResponse {
  encodedImage?: string;
  payload?: string;
  expirationDate?: Date;
}

export interface IAsaasPaymentReceivedInCash {
  paymentDate?: Date;
  value?: number;
  notifyCustomer?: boolean;
}

export interface CreditCard {
  holderName?: string;
  number?: string;
  expiryMonth?: string;
  expiryYear?: string;
  ccv?: string;
}

export interface CreditCardHolderInfo {
  name?: string;
  email?: string;
  cpfCnpj?: string;
  postalCode?: string;
  addressNumber?: string;
  addressComplement?: null;
  phone?: string;
  mobilePhone?: string;
}

export interface CreditCardResponse {
  creditCardNumber?: string;
  creditCardBrand?: string;
  creditCardToken?: string;
}

export type DiscountType = 'FIXED' | 'PERCENTAGE';

export interface Discount {
  value?: number;
  dueDateLimitDays?: number;
  type?: DiscountType;
}

export interface Fine {
  value?: number;
}

export interface Split {
  walletId: string;
  fixedValue?: number;
  percentualValue?: number;
  description?: string;
}

export interface IAsaasPaymentLimitResponse {
  creation?: Creation;
}

export interface Creation {
  daily?: Daily;
}

export interface Daily {
  limit?: number;
  used?: number;
  wasReached?: boolean;
}

export interface IListInstallmentsParams {
  offset?: number;
  limit?: number;
}

export interface IAsaasPaymentInstallment {
  object?: string;
  id?: string;
  value?: number;
  netValue?: number;
  paymentValue?: number;
  installmentCount?: number;
  billingType?: string;
  paymentDate?: null;
  description?: string;
  expirationDay?: number;
  deleted?: boolean;
  dateCreated?: Date;
  customer?: string;
  paymentLink?: string;
  transactionReceiptUrl?: null;
  chargeback?: Chargeback;
}

export interface Chargeback {
  status?: string;
  reason?: string;
}

export type IListAsaasInstallmentsResponse =
  IAsaasPagination<IAsaasPaymentInstallment>;

export interface IInstallmentsParams {
  sort?: string;
  order?: string;
}
