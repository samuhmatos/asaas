import { NotificationEvent } from '../enums';

export interface INotification {
  object: string;
  id: string;
  customer: string;
  enabled: boolean;
  emailEnabledForProvider: boolean;
  smsEnabledForProvider: boolean;
  emailEnabledForCustomer: boolean;
  smsEnabledForCustomer: boolean;
  phoneCallEnabledForCustomer: boolean;
  whatsappEnabledForCustomer: boolean;
  event: NotificationEvent;
  scheduleOffset: number;
  deleted: boolean;
}

export interface IUpdateNotificationRequest {
  enabled?: boolean;
  emailEnabledForProvider?: boolean;
  smsEnabledForProvider?: boolean;
  emailEnabledForCustomer?: boolean;
  smsEnabledForCustomer?: boolean;
  phoneCallEnabledForCustomer?: boolean;
  whatsappEnabledForCustomer?: boolean;
  scheduleOffset?: number;
}

export interface INotificationBatchItem {
  enabled?: boolean;
  emailEnabledForProvider?: boolean;
  smsEnabledForProvider?: boolean;
  emailEnabledForCustomer?: boolean;
  smsEnabledForCustomer?: boolean;
  phoneCallEnabledForCustomer?: boolean;
  whatsappEnabledForCustomer?: boolean;
  scheduleOffset?: number;
}

export interface IUpdateNotificationBatchRequest {
  customer: string;
  notifications: INotificationBatchItem[];
}

export interface INotificationBatchResponse {
  notifications: INotification[];
}

export interface INotificationListResponse {
  object: string;
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: INotification[];
}
