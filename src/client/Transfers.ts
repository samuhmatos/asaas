import {
  ICreateTransferParams,
  IListTransfersResponse,
  ITransferResponse,
  IListTransfersParams,
  ICreateInternalTransferParams,
  APIOptions,
} from '../types';
import { AxiosInstance } from 'axios';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums/Action';

export class TransfersAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async create(params?: ICreateTransferParams): Promise<ITransferResponse> {
    try {
      const response = await this.apiClient.post('/transfers', params);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CREATE_TRANSFER, error);
    }
  }

  async list(params?: IListTransfersParams): Promise<IListTransfersResponse> {
    try {
      const response = await this.apiClient.get('/transfers', { params });
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_TRANSFER, error);
    }
  }

  async createInternal(
    params?: ICreateInternalTransferParams,
  ): Promise<ITransferResponse> {
    try {
      const response = await this.apiClient.post(`/transfers/`, params);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CREATE_INTERNAL_TRANSFER, error);
    }
  }

  async getById(id: string): Promise<ITransferResponse> {
    try {
      const response = await this.apiClient.get(`/transfers/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_TRANSFER, error);
    }
  }

  async cancel(id: string): Promise<ITransferResponse> {
    try {
      const response = await this.apiClient.post(`/transfers/${id}/cancel`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CANCEL_TRANSFER, error);
    }
  }
}
