import { Callback, IAsaasPagination } from './AsaasTypes';
import {
  Discount,
  Fine,
  Split,
  CreditCard,
  CreditCardHolderInfo,
  CreditCardResponse,
} from './PaymentTypes';

export type SubscriptionCycleType =
  | 'WEEKLY'
  | 'BIWEEKLY'
  | 'MONTHLY'
  | 'BIMONTHLY'
  | 'QUARTERLY'
  | 'SEMIANNUALLY'
  | 'YEARLY';

export type SubscriptionBillingType =
  | 'UNDEFINED'
  | 'BOLETO'
  | 'CREDIT_CARD'
  | 'PIX';

// Subscriptions
// https://docs.asaas.com/reference/criar-nova-assinatura
export interface ICreateSubscriptionParams {
  customer: string;
  billingType: SubscriptionBillingType;
  value: number;
  nextDueDate: string;
  discount?: Discount;
  interest?: Fine;
  fine?: Fine;
  cycle: SubscriptionCycleType;
  description?: string;
  endDate?: string;
  maxPayments?: number;
  externalReference?: string;
  split?: Split[];
  callback?: Callback;
}

// https://docs.asaas.com/reference/criar-assinatura-com-cartao-de-credito
export interface ICreateSubscriptionWithCreditCardParams
  extends ICreateSubscriptionParams {
  creditCard?: CreditCard;
  creditCardHolderInfo?: CreditCardHolderInfo;
  creditCardToken?: string;
  remoteIp?: string;
}

export interface IListSubscriptionsParams {
  customer?: string;
  customerGroupName?: string;
  billingType?: string;
  status?: string;
  deletedOnly?: boolean;
  includeDeleted?: boolean;
  externalReference?: string;
  order?: string;
  sort?: string;
  offset?: number;
  limit?: number;
}

export type IListSubscriptionsResponse = IAsaasPagination<ISubscription>;

export type SubscriptionStatusType = 'ACTIVE' | 'INACTIVE';

export interface IUpdateSubscriptionParams
  extends Partial<ICreateSubscriptionParams> {
  updatePendingPayments?: boolean;
  status?: SubscriptionStatusType;
}

export interface ISubscription {
  object?: string;
  id?: string;
  dateCreated?: string;
  customer?: string;
  paymentLink?: string;
  billingType?: string;
  value?: number;
  cycle?: string;
  nextDueDate?: string;
  description?: string;
  status?: string;
  deleted?: boolean;
  discount?: Discount;
  fine?: Fine;
  interest?: Fine;
  creditCard?: CreditCardResponse;
}

export interface ISubscriptionPayment {
  object?: string;
  id?: string;
  dateCreated?: string;
  customer?: string;
  paymentLink?: string;
  value?: number;
  netValue?: number;
  originalValue?: string;
  interestValue?: string;
  description?: string;
  billingType?: string;
  canBePaidAfterDueDate?: boolean;
  status?: string;
  dueDate?: string;
  originalDueDate?: string;
  paymentDate?: string;
  clientPaymentDate?: string;
  installmentNumber?: string;
  invoiceUrl?: string;
  invoiceNumber?: string;
  externalReference?: string;
  deleted?: boolean;
  bankSlipUrl?: string;
  postalService?: boolean;
  anticipated?: boolean;
  anticipable?: boolean;
}

export type IListSubscriptionPaymentsResponse =
  IAsaasPagination<ISubscriptionPayment>;
