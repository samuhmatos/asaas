import { AxiosInstance } from 'axios';
import {
  APIOptions,
  IDocumentsResponse,
  IUploadDocumentRequest,
  IUploadDocumentResponse,
  IUpdateDocumentRequest,
  IDeleteDocumentResponse,
} from '../types';
import { BaseAPI } from './BaseAPI';
import { Action } from '../enums/Action';

export class DocumentsAPI extends BaseAPI {
  constructor(apiClient: AxiosInstance, options: APIOptions = {}) {
    super(apiClient, options);
  }

  async getPending(): Promise<IDocumentsResponse> {
    try {
      const response = await this.apiClient.get('/myAccount/documents');
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_DOCUMENTS, error);
    }
  }

  async upload(
    id: string,
    documentData: IUploadDocumentRequest,
  ): Promise<IUploadDocumentResponse> {
    try {
      const formData = new FormData();
      formData.append('documentFile', documentData.documentFile);
      formData.append('type', documentData.type);

      const response = await this.apiClient.post(
        `/myAccount/documents/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.UPLOAD_DOCUMENT, error);
    }
  }

  async getFile(id: string): Promise<IUploadDocumentResponse> {
    try {
      const response = await this.apiClient.get(
        `/myAccount/documents/files/${id}`,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.GET_DOCUMENT_FILE, error);
    }
  }

  async updateFile(
    id: string,
    documentData: IUpdateDocumentRequest,
  ): Promise<IUploadDocumentResponse> {
    try {
      const formData = new FormData();
      formData.append('documentFile', documentData.documentFile);

      const response = await this.apiClient.post(
        `/myAccount/documents/files/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.UPDATE_DOCUMENT_FILE, error);
    }
  }

  async deleteFile(id: string): Promise<IDeleteDocumentResponse> {
    try {
      const response = await this.apiClient.delete(
        `/myAccount/documents/files/${id}`,
      );
      return response.data;
    } catch (error) {
      return this.handleError(Action.DELETE_DOCUMENT_FILE, error);
    }
  }
}
