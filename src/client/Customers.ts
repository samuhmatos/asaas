import { AxiosInstance } from 'axios';
import {
  APIOptions,
  IAsaasCustomer,
  IAsaasCustomerResponse,
  IAsaasDeleteResponse,
  IListAsaasCustomerResponse,
  IListCustomersParams,
} from '../types';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums/Action';

export class CustomersAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async new(customerData: IAsaasCustomer): Promise<IAsaasCustomerResponse> {
    try {
      const response = await this.apiClient.post('/customers', customerData);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CREATE_CUSTOMER, error);
    }
  }

  async list(
    params?: IListCustomersParams,
  ): Promise<IListAsaasCustomerResponse> {
    try {
      const response = await this.apiClient.get('/customers', { params });
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_CUSTOMER, error);
    }
  }

  async getById(id: string): Promise<IAsaasCustomerResponse> {
    try {
      const response = await this.apiClient.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_CUSTOMER, error);
    }
  }

  async delete(id: string): Promise<IAsaasDeleteResponse> {
    try {
      const response = await this.apiClient.delete(`/customers/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.DELETE_CUSTOMER, error);
    }
  }

  async restore(id: string): Promise<IAsaasCustomerResponse> {
    try {
      const response = await this.apiClient.post(`/customers/${id}/restore`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.RESTORE_CUSTOMER, error);
    }
  }

  async updateById(
    id: string,
    customerData: IAsaasCustomer,
  ): Promise<IAsaasCustomerResponse> {
    try {
      const response = await this.apiClient.post(
        `/customers/${id}`,
        customerData,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.UPDATE_CUSTOMER, error);
    }
  }
}
