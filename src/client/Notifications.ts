import { AxiosInstance } from 'axios';
import {
  APIOptions,
  INotification,
  INotificationBatchResponse,
  INotificationListResponse,
  IUpdateNotificationBatchRequest,
  IUpdateNotificationRequest,
} from '../types';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums/Action';

export class NotificationsAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async update(
    id: string,
    notificationData: IUpdateNotificationRequest,
  ): Promise<INotification> {
    try {
      const response = await this.apiClient.put(
        `/notifications/${id}`,
        notificationData,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.UPDATE_NOTIFICATION, error);
    }
  }

  async updateBatch(
    batchData: IUpdateNotificationBatchRequest,
  ): Promise<INotificationBatchResponse> {
    try {
      const response = await this.apiClient.put(
        '/notifications/batch',
        batchData,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.UPDATE_NOTIFICATION_BATCH, error);
    }
  }

  async getByCustomer(customerId: string): Promise<INotificationListResponse> {
    try {
      const response = await this.apiClient.get(
        `/customers/${customerId}/notifications`,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_CUSTOMER_NOTIFICATIONS, error);
    }
  }
}
