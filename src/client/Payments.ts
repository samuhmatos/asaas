import { AxiosInstance } from 'axios';
import {
  APIOptions,
  IAsaasDeleteResponse,
  IAsaasPayment,
  IAsaasPaymentBoletoResponse,
  IAsaasPaymentLimitResponse,
  IAsaasPaymentPixQrCodeResponse,
  IAsaasPaymentReceivedInCash,
  IAsaasPaymentRefund,
  IAsaasPaymentResponse,
  IListAsaasPaymentsResponse,
  IListPaymentsParams,
} from '../types';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums/Action';

export class PaymentsAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async new(paymentData: IAsaasPayment): Promise<IAsaasPaymentResponse> {
    try {
      const response = await this.apiClient.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CREATE_PAYMENT, error);
    }
  }

  async list(
    params?: IListPaymentsParams,
  ): Promise<IListAsaasPaymentsResponse> {
    try {
      const response = await this.apiClient.get('/payments', { params });
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_PAYMENT, error);
    }
  }

  async getById(id: string): Promise<IAsaasPaymentResponse> {
    try {
      const response = await this.apiClient.get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_PAYMENT, error);
    }
  }

  async delete(id: string): Promise<IAsaasDeleteResponse> {
    try {
      const response = await this.apiClient.delete(`/payments/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.DELETE_PAYMENT, error);
    }
  }

  async restore(id: string): Promise<IAsaasPaymentResponse> {
    try {
      const response = await this.apiClient.post(`/payments/${id}/restore`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.RESTORE_PAYMENT, error);
    }
  }

  async updateById(
    id: string,
    paymentData: IAsaasPayment,
  ): Promise<IAsaasPaymentResponse> {
    try {
      const response = await this.apiClient.post(
        `/payments/${id}`,
        paymentData,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.UPDATE_PAYMENT, error);
    }
  }

  async refund(
    id: string,
    refundData: IAsaasPaymentRefund,
  ): Promise<IAsaasPaymentResponse> {
    try {
      const response = await this.apiClient.post(
        `/payments/${id}/refund`,
        refundData,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.REFUND_PAYMENT, error);
    }
  }

  async getIdentificationField(
    id: string,
  ): Promise<IAsaasPaymentBoletoResponse> {
    try {
      const response = await this.apiClient.get(
        `/payments/${id}/identificationField`,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_IDENTIFICATION_PAYMENT, error);
    }
  }

  async getPixQrCode(id: string): Promise<IAsaasPaymentPixQrCodeResponse> {
    try {
      const response = await this.apiClient.get(`/payments/${id}/pixQrCode`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_PIX_QRCODE_PAYMENT, error);
    }
  }

  async receiveInCash(
    id: string,
    paymentData: IAsaasPaymentReceivedInCash,
  ): Promise<IAsaasPaymentResponse> {
    try {
      const response = await this.apiClient.post(
        `/payments/${id}/receiveInCash`,
        paymentData,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.RECEIVED_IN_CASH_PAYMENT, error);
    }
  }

  async undoReceivedInCash(id: string): Promise<IAsaasPaymentResponse> {
    try {
      const response = await this.apiClient.post(
        `/payments/${id}/undoReceivedInCash`,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.UNDO_RECEIVED_IN_CASH_PAYMENT, error);
    }
  }

  async limits(): Promise<IAsaasPaymentLimitResponse> {
    try {
      const response = await this.apiClient.get(`/payments/limits`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_LIMITS_PAYMENT, error);
    }
  }
}
