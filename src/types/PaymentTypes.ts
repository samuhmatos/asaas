import { Callback, IAsaasPagination } from './AsaasTypes';

type BillingType = 'BOLETO' | 'CREDIT_CARD' | 'PIX' | 'UNDEFINED';

export interface IAsaasPayment {
  customer: string;
  billingType: BillingType;
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
  object: string;
  id: string;
  dateCreated: Date;
  customer: string;
  subscription: string | null;
  installment?: string;
  checkoutSession: string | null;
  paymentLink: string | null;
  value: number;
  netValue: number;
  originalValue: null;
  interestValue: null;
  description?: string;
  billingType: BillingType;
  creditCard?: CreditCardResponse;
  canBePaidAfterDueDate: boolean;
  pixTransaction?: null;
  pixQrCodeId?: null;
  status: string;
  dueDate: Date;
  originalDueDate: Date;
  paymentDate: null;
  clientPaymentDate: null;
  installmentNumber: number | null;
  invoiceUrl: string;
  invoiceNumber: string;
  externalReference?: string;
  deleted: boolean;
  anticipated: boolean;
  anticipable: boolean;
  creditDate?: Date;
  estimatedDate?: Date;
  transactionReceiptUrl: null;
  nossoNumero: string;
  bankSlipUrl?: string;
  discount?: Discount;
  fine?: Fine;
  interest?: Fine;
  split?: SplitResponse[];
  postalService: boolean;
  daysAfterDueDateToRegistrationCancellation: null;
  chargeBack?: ChargebackResponse;
  scrows: EscrowResponse | null;
  refunds: RefundResponse | null;
}

export interface IListPaymentsParams {
  customer?: string;
  customerGroupName?: string;
  billingType?: BillingType;
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

export interface SplitResponse {
  id: string;
  walletId: string;
  fixedValue: number;
  percentualValue: number | null;
  totalValue: number;
  cancellationReason?: string;
  status: string;
  externalReference: string | null;
  description: string | null;
}

export interface EscrowResponse {
  id: string;
  status: string;
  expirationDate: Date;
  finishDate: Date;
  finishReason: string;
}

export interface RefundResponse {
  dateCreated: Date;
  status: string;
  value: number;
  endToEndIdentifier: null;
  description: null;
  effectiveDate: Date;
  transactionReceiptUrl: null;
  refundedSplits: Array<{ id: string; value: number; done: boolean }>;
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
  billingType?: BillingType;
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

export interface ChargebackResponse {
  id: string;
  payment: string;
  installment: string | null;
  customerAccount: string;
  status: string;
  reason: string;
  disputeStartDate: string;
  value: number;
  paymentDate: string;
  creditCard: {
    number: string;
    brand: string;
  };
  disputeStatus: string;
  deadlineToSendDisputeDocuments: string;
}

export type IListAsaasInstallmentsResponse =
  IAsaasPagination<IAsaasPaymentInstallment>;

export interface IInstallmentsParams {
  sort?: string;
  order?: string;
}
