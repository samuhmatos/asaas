import {
  ICreateWebhookParams,
  IListWebhooksResponse,
  IUpdateWebhookParams,
  IWebhookResponse,
  APIOptions,
  IAsaasDeleteResponse,
} from '../types';
import { AxiosInstance } from 'axios';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums';

export class WebhooksAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async create(params?: ICreateWebhookParams): Promise<IWebhookResponse> {
    try {
      const response = await this.apiClient.post('/webhooks', params);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CREATE_WEBHOOK, error);
    }
  }

  async list(): Promise<IListWebhooksResponse> {
    try {
      const response = await this.apiClient.get('/webhooks');
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_WEBHOOK, error);
    }
  }

  async getById(id: string): Promise<IWebhookResponse> {
    try {
      const response = await this.apiClient.get(`/webhooks/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_WEBHOOK, error);
    }
  }

  async delete(id: string): Promise<IAsaasDeleteResponse> {
    try {
      const response = await this.apiClient.delete(`/webhooks/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.DELETE_WEBHOOK, error);
    }
  }

  async updateById(
    id: string,
    params?: IUpdateWebhookParams,
  ): Promise<IWebhookResponse> {
    try {
      const response = await this.apiClient.post(`/webhooks/${id}`, params);
      return response.data;
    } catch (error) {
      return this.handleError(Action.UPDATE_WEBHOOK, error);
    }
  }
}
