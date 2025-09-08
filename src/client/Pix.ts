import { AxiosInstance } from 'axios';
import {
  APIOptions,
  IPixStaticQrCode,
  IPixStaticQrCodeResponse,
  IPixAddressKeyRequest,
  IPixAddressKey,
  IListPixAddressKeysParams,
  IListPixAddressKeysResponse,
  IDeleteStaticQrCodeResponse,
} from '../types';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums';

export class PixAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async newQrCodeStatic(
    params?: IPixStaticQrCode,
  ): Promise<IPixStaticQrCodeResponse> {
    try {
      const response = await this.apiClient.post('/pix/qrCodes/static', params);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CREATE_STATIC_QRCODE_PIX, error);
    }
  }

  async deleteQrCodeStatic(id: string): Promise<IDeleteStaticQrCodeResponse> {
    try {
      const response = await this.apiClient.delete(`/pix/qrCodes/static/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.DELETE_STATIC_QRCODE_PIX, error);
    }
  }

  async createAddressKey(body: IPixAddressKeyRequest): Promise<IPixAddressKey> {
    try {
      const response = await this.apiClient.post('/pix/addressKeys', body);
      return response.data;
    } catch (error) {
      return this.handleError(Action.CREATE_PIX_ADDRESS_KEY, error);
    }
  }

  async listAddressKeys(
    params?: IListPixAddressKeysParams,
  ): Promise<IListPixAddressKeysResponse> {
    try {
      const response = await this.apiClient.get('/pix/addressKeys', { params });
      return response.data;
    } catch (error) {
      return this.handleError(Action.LIST_PIX_ADDRESS_KEYS, error);
    }
  }

  async getAddressKey(id: string): Promise<IPixAddressKey> {
    try {
      const response = await this.apiClient.get(`/pix/addressKeys/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_PIX_ADDRESS_KEY, error);
    }
  }

  async deleteAddressKey(id: string): Promise<IPixAddressKey> {
    try {
      const response = await this.apiClient.delete(`/pix/addressKeys/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(Action.DELETE_PIX_ADDRESS_KEY, error);
    }
  }
}
