import { AxiosInstance } from 'axios';
import {
  APIOptions,
  IAsaasDeleteResponse,
  IListSubscriptionPaymentsResponse,
  ISubscription,
  ICreateSubscriptionParams,
  IUpdateSubscriptionParams,
  IListSubscriptionsResponse,
  IListSubscriptionsParams,
  ICreateSubscriptionWithCreditCardParams,
} from '../types';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums/Action';

export class SubscriptionsAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async create(
    params?:
      | ICreateSubscriptionParams
      | ICreateSubscriptionWithCreditCardParams,
  ): Promise<ISubscription> {
    try {
      const response = await this.apiClient.post('/subscriptions', params);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CREATE_SUBSCRIPTION, error);
    }
  }

  async list(
    params?: IListSubscriptionsParams,
  ): Promise<IListSubscriptionsResponse> {
    try {
      const response = await this.apiClient.get('/subscriptions', { params });
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_SUBSCRIPTION, error);
    }
  }

  async getById(id: string): Promise<ISubscription> {
    try {
      const response = await this.apiClient.get(`/subscriptions/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_SUBSCRIPTION, error);
    }
  }

  async getPayments(id: string): Promise<IListSubscriptionPaymentsResponse> {
    try {
      const response = await this.apiClient.get(
        `/subscriptions/${id}/payments`,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_PAYMENTS_SUBSCRIPTION, error);
    }
  }

  async delete(id: string): Promise<IAsaasDeleteResponse> {
    try {
      const response = await this.apiClient.delete(`/subscriptions/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.DELETE_SUBSCRIPTION, error);
    }
  }

  async updateById(
    id: string,
    params?: IUpdateSubscriptionParams,
  ): Promise<ISubscription> {
    try {
      const response = await this.apiClient.post(
        `/subscriptions/${id}`,
        params,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.UPDATE_SUBSCRIPTION, error);
    }
  }
}
