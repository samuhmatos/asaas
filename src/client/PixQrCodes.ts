import { AxiosInstance } from 'axios';
import {
  APIOptions,
  IPixStaticQrCode,
  IPixStaticQrCodeResponse,
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
      const response = await this.apiClient.post('/pix/qrCodes/static', {
        params,
      });
      return response.data;
    } catch (error) {
      return this.handleError(Action.CREATE_STATIC_QRCODE_PIX, error);
    }
  }
}
