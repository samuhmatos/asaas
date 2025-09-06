import { IAsaasPagination } from './AsaasTypes';

export interface IPixTransaction {
  id: string;
  transferId: string;
  endToEndIdentifier?: string;
  finality?: string;
  value: number;
  changeValue?: number;
  refundedValue: number;
  dateCreated: string;
  effectiveDate: string;
  scheduledDate?: string;
  status: string;
  type: string;
  originType: string;
  conciliationIdentifier?: string;
  description?: string;
  transactionReceiptUrl?: string;
  chargedFeeValue: number;
  canBeRefunded: boolean;
  refundDisabledReason?: string;
  refusalReason?: string;
  canBeCanceled: boolean;
  originalTransaction?: string;
  externalAccount: PixTransactionExternalAccount;
  qrCode?: string;
  payment?: string;
  addressKey?: string;
  addressKeyType?: string;
  externalReference?: string;
}

export interface PixTransactionExternalAccount {
  ispb: number;
  ispbName: string;
  name: string;
  agency: string;
  account: string;
  accountDigit: string;
  accountType: string;
  cpfCnpj: string;
  addressKey?: string;
  addressKeyType?: string;
}

export type IListPixTransactionsResponse = IAsaasPagination<IPixTransaction>;

export interface IListPixTransactionsParams {
  offset?: number;
}

export interface IPixStaticQrCode {
  addressKey: string;
  description?: string;
  value: number;
  format?: string;
  expirationDate?: string;
  expirationSeconds?: number;
  allowsMultiplePayments?: boolean;
}

export interface IPixStaticQrCodeResponse {
  id: string;
  encodedImage?: string;
  payload?: string;
  allowsMultiplePayments: boolean;
  expirationDate: string;
}
