import {
  ICreateInvoiceParams,
  IListInvoicesResponse,
  IUpdateInvoiceParams,
  IInvoiceResponse,
  IListInvoicesParams,
  APIOptions,
} from '../types';
import { AxiosInstance } from 'axios';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums/Action';

export class InvoicesAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async create(params?: ICreateInvoiceParams): Promise<IInvoiceResponse> {
    try {
      const response = await this.apiClient.post('/invoices', params);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CREATE_INVOICE, error);
    }
  }

  async list(params?: IListInvoicesParams): Promise<IListInvoicesResponse> {
    try {
      const response = await this.apiClient.get('/invoices', { params });
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_INVOICE, error);
    }
  }

  async getById(id: string): Promise<IInvoiceResponse> {
    try {
      const response = await this.apiClient.get(`/invoices/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_INVOICE, error);
    }
  }

  async updateById(
    id: string,
    params?: IUpdateInvoiceParams,
  ): Promise<IInvoiceResponse> {
    try {
      const response = await this.apiClient.post(`/invoices/${id}`, params);
      return response.data;
    } catch (error) {
      return this.handleError(Action.UPDATE_INVOICE, error);
    }
  }

  async authorize(id: string): Promise<IInvoiceResponse> {
    try {
      const response = await this.apiClient.post(`/invoices/${id}/authorize`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.AUTHORIZE_INVOICE, error);
    }
  }

  async cancel(id: string): Promise<IInvoiceResponse> {
    try {
      const response = await this.apiClient.post(`/invoices/${id}/cancel`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CANCEL_INVOICE, error);
    }
  }
}
