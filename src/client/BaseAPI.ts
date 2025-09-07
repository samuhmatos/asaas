import { AxiosError, AxiosInstance } from 'axios';
import { APIOptions } from '../types';
import { Action } from '../enums';

export class BaseAPI {
  protected printError: boolean;
  protected errorHandler: APIOptions['errorHandler'];

  constructor(protected apiClient: AxiosInstance, options: APIOptions = {}) {
    this.printError = options.printError ?? true;
    this.errorHandler = options.errorHandler;
  }

  protected handleError(action: Action, error: AxiosError | unknown): never {
    const red = '\x1b[31m';
    const reset = '\x1b[0m';

    if (this.printError) {
      console.error(red + action + reset, error);
    }

    if (this.errorHandler) {
      this.errorHandler(action, error as AxiosError);
    }

    throw error;
  }
}
