import { IAsaasPagination } from './AsaasTypes';

// --- Pix QRCode Payment ---
export interface IPixQrCodePayRequest {
  qrCode: {
    payload: string;
    changeValue?: number;
    value: number;
    description?: string;
    scheduleDate?: string;
  };
}

export interface IPixQrCodePayResponse {
  id: string;
  endToEndIdentifier?: string;
  finality?: 'WITHDRAWAL' | 'CHANGE';
  value: number;
  changeValue?: number;
  refundedValue: number;
  effectiveDate: string;
  scheduledDate?: string;
  status: string;
  type: string;
  originType: string;
  conciliationIdentifier?: string;
  description?: string;
  transactionReceiptUrl?: string;
  refusalReason?: string;
  canBeCanceled: boolean;
  originalTransaction?: IPixTransaction;
  externalAccount?: PixTransactionExternalAccount;
  qrCode?: IPixQrCodeDecodedResponse;
  payer?: IPixQrCodePayer;
  payment?: string;
  canBeRefunded?: boolean;
  refundDisabledReason?: string;
  chargedFeeValue?: number;
  dateCreated?: string;
  addressKey?: string;
  addressKeyType?: string;
  transferId?: string;
  externalReference?: string;
}

export interface IPixQrCodePayer {
  name?: string;
  cpfCnpj?: string;
}

// --- Pix QRCode Decode ---
export interface IPixQrCodeDecodeRequest {
  payload: string;
  changeValue?: number;
}

export interface IPixQrCodeDecodedResponse {
  payload: string;
  type: 'STATIC' | 'DYNAMIC' | 'DYNAMIC_WITH_ASAAS_ADDRESS_KEY' | 'COMPOSITE';
  transactionOriginType?: string;
  pixKey?: string;
  conciliationIdentifier?: string;
  dueDate?: string;
  expirationDate?: string;
  finality?: 'WITHDRAWAL' | 'CHANGE';
  value?: number;
  changeValue?: number;
  interest?: number;
  fine?: number;
  discount?: number;
  totalValue?: number;
  canBePaidWithDifferentValue?: boolean;
  canBeModifyChangeValue?: boolean;
  receiver?: IPixQrCodeReceiver;
  payer?: IPixQrCodePayer;
  description?: string;
  canBePaid?: boolean;
  cannotBePaidReason?: string;
}

export interface IPixQrCodeReceiver {
  ispb?: string;
  ispbName?: string;
  name?: string;
  tradingName?: string;
  cpfCnpj?: string;
  personType?: 'JURIDICA' | 'FISICA';
  accountType?:
    | 'CHECKING_ACCOUNT'
    | 'SALARY_ACCOUNT'
    | 'INVESTIMENT_ACCOUNT'
    | 'PAYMENT_ACCOUNT';
}

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

export type PixAddressKeyTypePix = 'EVP';

export type PixAddressKeyStatus =
  | 'AWAITING_ACTIVATION'
  | 'ACTIVE'
  | 'AWAITING_DELETION'
  | 'AWAITING_ACCOUNT_DELETION'
  | 'DELETED'
  | 'ERROR';

export interface IPixAddressKeyRequest {
  type: PixAddressKeyTypePix; // EVP
}

export interface IPixAddressKeyQrCode {
  encodedImage?: string;
  payload?: string;
}

export interface IPixAddressKey {
  id: string;
  key: string;
  type: PixAddressKeyTypePix;
  status: PixAddressKeyStatus;
  dateCreated: string;
  canBeDeleted: boolean;
  cannotBeDeletedReason?: string;
  qrCode?: IPixAddressKeyQrCode;
}

export interface IListPixAddressKeysParams {
  offset?: number;
  limit?: number; // max 100
  status?: PixAddressKeyStatus;
  statusList?: string; // API accepts comma-separated statuses
}

export interface IListPixAddressKeysResponse {
  data: IPixAddressKey[];
}

export interface IDeleteStaticQrCodeResponse {
  id: string;
  deleted: boolean;
}
