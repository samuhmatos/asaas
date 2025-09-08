export interface IFinanceBalance {
  balance: number;
}

export interface IFinancePaymentStatisticsParams {
  customer?: string;
  billingType?:
    | 'BOLETO'
    | 'CREDIT_CARD'
    | 'TRANSFER'
    | 'DEPOSIT'
    | 'DEBIT_CARD'
    | 'PIX';
  status?: 'PENDING' | 'RECEIVED' | 'CONFIRMED' | 'OVERDUE';
  anticipated?: boolean;
  'dateCreated[ge]'?: string;
  'dateCreated[le]'?: string;
  'dueDate[ge]'?: string;
  'dueDate[le]'?: string;
  'estimatedCreditDate[ge]'?: string;
  'estimatedCreditDate[le]'?: string;
  externalReference?: string;
}

export interface IFinancePaymentStatistics {
  quantity: number;
  value: number;
  netValue: number;
}

export interface IFinanceSplitStatistics {
  income: number;
  value: number;
}
