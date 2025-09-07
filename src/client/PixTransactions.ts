import { AxiosInstance } from 'axios';
import {
  APIOptions,
  IListPixTransactionsParams,
  IListPixTransactionsResponse,
  IPixTransaction,
} from '../types';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums';

export class PixTransactionsAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async list(
    params?: IListPixTransactionsParams,
  ): Promise<IListPixTransactionsResponse> {
    try {
      const response = await this.apiClient.get('/pix/transactions', {
        params,
      });
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_TRANSACTION_PIX, error);
    }
  }

  async getById(id: string): Promise<IPixTransaction> {
    try {
      const response = await this.apiClient.get(`/pix/transactions/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_TRANSACTION_PIX, error);
    }
  }

  async cancel(id: string): Promise<IPixTransaction> {
    try {
      const response = await this.apiClient.post(
        `/pix/transactions/${id}/cancel`,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.CANCEL_TRANSACTION_PIX, error);
    }
  }
}
