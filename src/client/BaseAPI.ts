import { AxiosInstance } from 'axios';
import { APIOptions } from '../types';

export class BaseAPI {
  protected printError: boolean;

  constructor(protected apiClient: AxiosInstance, options: APIOptions = {}) {
    this.printError = options.printError || true;
  }

  protected handleError(error: Error | unknown, errorMessage: string): never {
    const red = '\x1b[31m';
    const reset = '\x1b[0m';

    if (this.printError) {
      console.error(red + errorMessage + reset, error);
    }
    throw error;
  }
}
