import axios from 'axios';
import { APIOptions, AsaasOptions } from '../types/AsaasTypes';
import { AccountsAPI } from './Accounts';
import { BillAPI } from './Bill';
import { CustomersAPI } from './Customers';
import { DocumentsAPI } from './Documents';
import { FinanceAPI } from './Finance';
import { InstallmentsAPI } from './Installments';
import { InvoicesAPI } from './Invoices';
import { MyAccountAPI } from './MyAccount';
import { NotificationsAPI } from './Notifications';
import { PaymentsAPI } from './Payments';
import { PixAPI } from './PixQrCodes';
import { PixTransactionsAPI } from './PixTransactions';
import { SubscriptionsAPI } from './Subscriptions';
import { TransfersAPI } from './Transfers';
import { WebhooksAPI } from './Webhooks';

export class AsaasClient {
  public accounts: AccountsAPI;
  public bill: BillAPI;
  public customers: CustomersAPI;
  public documents: DocumentsAPI;
  public finance: FinanceAPI;
  public installments: InstallmentsAPI;
  public invoices: InvoicesAPI;
  public myAccount: MyAccountAPI;
  public notifications: NotificationsAPI;
  public payments: PaymentsAPI;
  public pix: PixAPI;
  public pixTransactions: PixTransactionsAPI;
  public subscriptions: SubscriptionsAPI;
  public transfers: TransfersAPI;
  public webhooks: WebhooksAPI;

  constructor(private apiKey: string, options: AsaasOptions = {}) {
    const apiClient = axios.create({
      baseURL: this.getUrl(options),
      headers: {
        common: {
          'User-Agent': options.userAgent ?? 'npm/asaas',
          access_token: this.apiKey,
        },
      },
    });

    const apiOptions: APIOptions = {
      printError: options.printError,
      errorHandler: options.errorHandler,
    };

    this.accounts = new AccountsAPI(apiClient, apiOptions);
    this.bill = new BillAPI(apiClient, apiOptions);
    this.customers = new CustomersAPI(apiClient, apiOptions);
    this.documents = new DocumentsAPI(apiClient, apiOptions);
    this.finance = new FinanceAPI(apiClient, apiOptions);
    this.installments = new InstallmentsAPI(apiClient, apiOptions);
    this.invoices = new InvoicesAPI(apiClient, apiOptions);
    this.myAccount = new MyAccountAPI(apiClient, apiOptions);
    this.notifications = new NotificationsAPI(apiClient, apiOptions);
    this.payments = new PaymentsAPI(apiClient, apiOptions);
    this.pix = new PixAPI(apiClient, apiOptions);
    this.pixTransactions = new PixTransactionsAPI(apiClient, apiOptions);
    this.subscriptions = new SubscriptionsAPI(apiClient, apiOptions);
    this.transfers = new TransfersAPI(apiClient, apiOptions);
    this.webhooks = new WebhooksAPI(apiClient, apiOptions);
  }

  getUrl(options: AsaasOptions = {}) {
    if (options.sandbox) {
      return options.sandboxUrl || 'https://sandbox.asaas.com/api/v3';
    }
    return options.baseUrl || 'https://api.asaas.com/v3';
  }
}
