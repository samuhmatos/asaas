import {
  ICreateBillParams,
  IListBillsResponse,
  IBillResponse,
  IListBillsParams,
  ISimulateBillResponse,
  APIOptions,
} from '../types';
import { AxiosInstance } from 'axios';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums';

export class BillAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async create(params?: ICreateBillParams): Promise<IBillResponse> {
    try {
      const response = await this.apiClient.post('/bill', params);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CANCEL_BILL, error);
    }
  }

  async list(params?: IListBillsParams): Promise<IListBillsResponse> {
    try {
      const response = await this.apiClient.get('/bill', { params });
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_BILL, error);
    }
  }

  async simulate(params?: ISimulateBillResponse): Promise<IBillResponse> {
    try {
      const response = await this.apiClient.post(`/bill/simulate`, params);
      return response.data;
    } catch (error) {
      return this.handleError(Action.SIMULATE_BILL, error);
    }
  }

  async getById(id: string): Promise<IBillResponse> {
    try {
      const response = await this.apiClient.get(`/bill/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_BILL, error);
    }
  }

  async cancel(id: string): Promise<IBillResponse> {
    try {
      const response = await this.apiClient.post(`/bill/${id}/cancel`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CANCEL_BILL, error);
    }
  }
}
