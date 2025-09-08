import { AxiosInstance } from 'axios';
import {
  APIOptions,
  IFinanceBalance,
  IFinancePaymentStatistics,
  IFinancePaymentStatisticsParams,
  IFinanceSplitStatistics,
} from '../types';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums/Action';

export class FinanceAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async getBalance(): Promise<IFinanceBalance> {
    try {
      const response = await this.apiClient.get('/finance/balance');
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_FINANCE_BALANCE, error);
    }
  }

  async getPaymentStatistics(
    params?: IFinancePaymentStatisticsParams,
  ): Promise<IFinancePaymentStatistics> {
    try {
      const response = await this.apiClient.get('/finance/payment/statistics', {
        params,
      });
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_FINANCE_PAYMENT_STATISTICS, error);
    }
  }

  async getSplitStatistics(): Promise<IFinanceSplitStatistics> {
    try {
      const response = await this.apiClient.get('/finance/split/statistics');
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_FINANCE_SPLIT_STATISTICS, error);
    }
  }
}
