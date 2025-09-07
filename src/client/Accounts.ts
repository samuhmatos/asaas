import {
  IAccountResponse,
  IAccountResponseWithApiKey,
  ICreateAccountParams,
  IListAccountsParams,
  IListAccountsResponse,
  APIOptions,
} from '../types';
import { AxiosInstance } from 'axios';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums';

export class AccountsAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  // apiKey é retornada apenas na criação
  async create(
    params?: ICreateAccountParams,
  ): Promise<IAccountResponseWithApiKey> {
    try {
      const response = await this.apiClient.post('/accounts', params);
      return response.data;
    } catch (error) {
      this.handleError(Action.CREATE_SUBACCOUNT, error);
    }
  }

  async list(params?: IListAccountsParams): Promise<IListAccountsResponse> {
    try {
      const response = await this.apiClient.get('/accounts', { params });
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_SUBACCOUNT, error);
    }
  }

  async getById(id: string): Promise<IAccountResponse> {
    try {
      const response = await this.apiClient.get(`/accounts`, {
        params: { id },
      });
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_SUBACCOUNT, error);
    }
  }
}
