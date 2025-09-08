import { AxiosInstance } from 'axios';
import {
  IAsaasDeleteResponse,
  IAsaasPaymentBoletoResponse,
  IAsaasPaymentInstallment,
  IAsaasPaymentResponse,
  IInstallmentsParams,
  IListAsaasInstallmentsResponse,
  IListInstallmentsParams,
  APIOptions,
  IListAsaasPaymentsResponse,
} from '../types';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums/Action';

export class InstallmentsAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async list(
    params?: IListInstallmentsParams,
  ): Promise<IListAsaasInstallmentsResponse> {
    try {
      const response = await this.apiClient.get('/installments', { params });
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_INSTALLMENT, error);
    }
  }

  async getById(id: string): Promise<IAsaasPaymentInstallment> {
    try {
      const response = await this.apiClient.get(`/installments/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_INSTALLMENT, error);
    }
  }

  async paymentBook(
    id: string,
    params?: IInstallmentsParams,
  ): Promise<IAsaasPaymentBoletoResponse> {
    try {
      const response = await this.apiClient.get(
        `/installments/${id}/paymentBook`,
        { params },
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_PAYMENT_BOOK_INSTALLMENT, error);
    }
  }

  async delete(id: string): Promise<IAsaasDeleteResponse> {
    try {
      const response = await this.apiClient.delete(`/installments/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.DELETE_INSTALLMENT, error);
    }
  }

  async refund(id: string): Promise<IAsaasPaymentResponse> {
    try {
      const response = await this.apiClient.post(`/installments/${id}/refund`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.REFUND_INSTALLMENT, error);
    }
  }

  async listPaymentsByInstallment(
    id: string,
  ): Promise<IListAsaasPaymentsResponse> {
    try {
      const response = await this.apiClient.get<IListAsaasPaymentsResponse>(
        `/installments/${id}/payments`,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_PAYMENTS_BY_INSTALLMENT, error);
    }
  }
}
