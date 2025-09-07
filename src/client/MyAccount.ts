import {
  IAccountFeesResponse,
  IAccountNumberResponse,
  IAccountStatus,
  ICommercialInfoResponse,
  IDeleteAccountResponse,
  IListAccountWallets,
  IPaymentCheckoutConfigResponse,
  IUpdateCommercialInfo,
  IUpdatePaymentCheckoutConfig,
  APIOptions,
} from '../types';
import { AxiosInstance } from 'axios';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums';
export class MyAccountAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async commercialInfo(): Promise<ICommercialInfoResponse> {
    try {
      const response = await this.apiClient.get(`/myAccount/commercialInfo`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_COMMERCIAL_INFO_ACCOUNT, error);
    }
  }

  async updateCommercialInfo(
    params?: IUpdateCommercialInfo,
  ): Promise<ICommercialInfoResponse> {
    try {
      const response = await this.apiClient.put(
        '/myAccount/commercialInfo',
        params,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.UPDATE_COMMERCIAL_INFO_ACCOUNT, error);
    }
  }

  async updatePaymentCheckoutConfig(
    params?: IUpdatePaymentCheckoutConfig,
  ): Promise<IPaymentCheckoutConfigResponse> {
    try {
      const response = await this.apiClient.post(
        `/myAccount/paymentCheckoutConfig`,
        params,
      );
      return response.data;
    } catch (error) {
      return this.handleError(
        Action.UPDATE_PAYMENT_CHECKOUT_CONFIG_ACCOUNT,
        error,
      );
    }
  }

  async paymentCheckoutConfig(): Promise<IPaymentCheckoutConfigResponse> {
    try {
      const response = await this.apiClient.get(
        `/myAccount/paymentCheckoutConfig`,
      );
      return response.data;
    } catch (error) {
      return this.handleError(
        Action.GET_PAYMENT_CHECKOUT_CONFIG_ACCOUNT,
        error,
      );
    }
  }

  async accountNumber(): Promise<IAccountNumberResponse> {
    try {
      const response = await this.apiClient.get(`/myAccount/accountNumber/`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_ACCOUNT_NUMBER_ACCOUNT, error);
    }
  }

  async fees(): Promise<IAccountFeesResponse> {
    try {
      const response = await this.apiClient.get(`/myAccount/fees`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_FEES_ACCOUNT, error);
    }
  }

  async status(): Promise<IAccountStatus> {
    try {
      const response = await this.apiClient.get(`/myAccount/status`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_STATUS_ACCOUNT, error);
    }
  }

  async walletIds(): Promise<IListAccountWallets> {
    try {
      const response = await this.apiClient.get(`/wallets`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_WALLET_IDS_ACCOUNT, error);
    }
  }

  async delete(): Promise<IDeleteAccountResponse> {
    try {
      const response = await this.apiClient.delete(`/myAccount/`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.DELETE_ACCOUNT, error);
    }
  }
}
