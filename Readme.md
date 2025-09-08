# Unofficial Asaas Payment Gateway SDK
### ❗SDK and documentation under development.

A simple sdk made to abstract most of the Asaas payment gateway api requests.


last update: 07/09/2025
Items updated:
- Global: Added custom error handler functionality (errorHandler)
- Notifications: Added complete notifications API support (update, batch update, get by customer)
- Documents: Added complete documents API support (get pending, upload, get file, update file, delete file)
- Finance: Added complete finance API support (get balance, payment statistics, split statistics)


## Author

- [Samuel Matos](https://linkedin.com/in/o-samuelmatos)


## Reference

 - [Asaas API Manual](https://docs.asaas.com/)

 ## Features
 - [x] Customers [(Clientes)](https://docs.asaas.com/reference/criar-novo-cliente)
 - [x] Payments [(Cobranças)](https://docs.asaas.com/reference/criar-nova-cobranca)
 - [x] Notifications [(Notificações)](https://docs.asaas.com/reference/atualizar-notificacao-existente)
 - [x] Installments [(Parcelamentos)](https://docs.asaas.com/reference/repurar-um-unico-parcelamento)
 - [x] Subscriptions [(Assinaturas)](https://docs.asaas.com/reference/criar-nova-assinatura)
 - [ ] Pix [(Pix)](https://docs.asaas.com/reference/criar-uma-chave)
 - [ ] Pix Transactions [(Transações Pix)](https://docs.asaas.com/reference/pagar-um-qrcode)
 - [ ] Payment Links (soon) [(Link de pagamentos)](https://docs.asaas.com/reference/criar-um-link-de-pagamentos)
 - [x] Transfers [(Transferências)](https://docs.asaas.com/reference/transferir-para-conta-de-outra-instituicao-ou-chave-pix)
 - [ ] Anticipations [(Antecipações)](https://docs.asaas.com/reference/solicitar-antecipacao)
 - [ ] Payment Dunnings [(Negativações)](https://docs.asaas.com/reference/criar-uma-negativacao)
 - [x] Bill [(Pagamento de contas)](https://docs.asaas.com/reference/criar-um-pagamento-de-conta)
 - [ ] Mobile Phone Recharges [(Recargas de celular)](https://docs.asaas.com/reference/solicitar-recarga)
 - [ ] Credit Bureau Report [(Consulta Serasa)](https://docs.asaas.com/reference/realizar-consulta)
 - [ ] Financial Transactions [(Extrato)](https://docs.asaas.com/reference/recuperar-extrato)
 - [x] Finance [(Informações financeiras)](https://docs.asaas.com/reference/recuperar-saldo-da-conta)
 - [x] My Account [(Informações e personalização da conta)](https://docs.asaas.com/reference/recuperar-dados-comerciais)
 - [x] Invoices [(Notas fiscais)](https://docs.asaas.com/reference/agendar-nota-fiscal)
 - [ ] Fiscal Info [(Informações fiscais)](https://docs.asaas.com/reference/listar-configuracoes-municipais)
 - [x] Webhooks [(Configurações de Webhooks)](https://docs.asaas.com/reference/criar-novo-webhook)
 - [x] Accounts [(Subcontas Asaas)](https://docs.asaas.com/reference/criar-subconta)
 - [x] Documents [(Envio de documentos White Label)](https://docs.asaas.com/reference/verificar-documentos-pendentes)

## Próximos Passos

Estamos trabalhando nas próximas funcionalidades que serão incluídas em breve no **asaas-kit**:

- [ ] **Pix**: criação e gestão de chaves Pix
- [ ] **Pix Transactions**: pagamento via QR Code Pix
- [ ] **Payment Links**: geração de links de pagamento
- [ ] **Anticipations**: solicitações de antecipação
- [ ] **Payment Dunnings**: gestão de negativações
- [ ] **Mobile Phone Recharges**: recarga de celular direto pela API
- [ ] **Credit Bureau Report**: consultas Serasa
- [ ] **Financial Transactions**: extrato financeiro detalhado
- [ ] **Fiscal Info**: informações fiscais municipais

✨ A feature atualmente em desenvolvimento é: **Pix (Criação de chaves e transações Pix)**.


## SDK Documentation

### Get Start
Import the package and instantitate a new Client:
```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY);
```

### Authentication
Every request to the Asaas API needs an API Key, which must be passed as the first parameter in the constructor. To obtain your API Key, access the [Integration Tab in the Account Settings area](https://www.asaas.com/config/index?tab=pushNotification).

Optionally you can set base url, enable sandbox mode and set sandbox mode base url.

```javascript
import { AsaasClient } from 'asaas-kit';

//Instantiate a new client
const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  //baseUrl?: string (default: https://api.asaas.com/v3);
  //sandbox?: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //printError?: boolean (default: true); // Determines whether errors will be automatically logged to the console
  //errorHandler?: (action: Action, error: AxiosError) => void; // Custom error handler function
});
```

### Sandbox Mode
To enable Sandbox Mode, pass to the client's constructor, as the second parameter, an object with `sandbox` information as `true`. The default sandbox URL is `https://sandbox.asaas.com/api/v3`

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  sandbox: true;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});
```

### Error Logging
By default, the library automatically logs errors to the console when request failures occur. You can disable this behavior by setting the `printError` option to `false`:

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  printError: false // Disables automatic error logging to the console
});
```

### Custom Error Handler
You can provide a custom error handler function to handle errors in your own way. The error handler receives the action that failed and the Axios error object:

```javascript
import { AsaasClient } from 'asaas-kit';
import { Action } from 'asaas-kit';
import { AxiosError } from 'axios';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  errorHandler: (action: Action, error: AxiosError) => {
    // Custom error handling logic
    console.log(`Action ${action} failed:`, error.message);
    
    // You can send errors to external services, log to files, etc.
    // Example: sendToErrorTrackingService(action, error);
  }
});
```

The custom error handler will be called for every API error, allowing you to implement your own error handling strategy while still maintaining the default behavior of throwing the error.

### Customers

#### Return all customers
Returns customers. Filters can be applied, passing an object with the items allowed in the [official documentation](https://docs.asaas.com/reference/listar-clientes).

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

//It lists all registered customers and makes a filter by email.
await asaas.customers.list({
  email: "email@email.com"
});
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Filter by **Name**.|
| `email` | `string` | Filter by **Email**.|
| `cpfCnpj` | `string` | Filter by **CPF or CNPJ**.|
| `groupName` | `string` | Filter by **Group**.|
| `externalReference` | `string` | Filter by **External Reference**.|
| `offset` | `number` | Offset of search.|
| `limit` | `number` | Limit of results.|

#### Return customer by ID

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

//It returns a customer by ID.
await asaas.customers.getById("cus_123abcde456");
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. Customer ID |


### Notifications

#### Update notification
Updates an existing notification configuration.

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

// Update a notification
await asaas.notifications.update("not_123abcde456", {
  enabled: true,
  emailEnabledForProvider: true,
  smsEnabledForProvider: false,
  emailEnabledForCustomer: true,
  smsEnabledForCustomer: true,
  phoneCallEnabledForCustomer: false,
  whatsappEnabledForCustomer: false,
  scheduleOffset: 5
});
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `string` | **Required**. Notification ID |
| `enabled` | `boolean` | Enable/disable the notification |
| `emailEnabledForProvider` | `boolean` | Enable/disable email sent to you |
| `smsEnabledForProvider` | `boolean` | Enable/disable SMS sent to you |
| `emailEnabledForCustomer` | `boolean` | Enable/disable email sent to customer |
| `smsEnabledForCustomer` | `boolean` | Enable/disable SMS sent to customer |
| `phoneCallEnabledForCustomer` | `boolean` | Enable/disable voice notification to customer |
| `whatsappEnabledForCustomer` | `boolean` | Enable/disable WhatsApp message to customer |
| `scheduleOffset` | `number` | Days before due date to send notification (0, 1, 5, 7, 10, 15, 30) |

#### Update notifications in batch
Updates multiple notifications for a customer in batch.

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

// Update notifications in batch
await asaas.notifications.updateBatch({
  customer: "cus_123abcde456",
  notifications: [
    {
      enabled: true,
      emailEnabledForProvider: true,
      smsEnabledForProvider: false,
      emailEnabledForCustomer: true,
      smsEnabledForCustomer: true,
      phoneCallEnabledForCustomer: false,
      whatsappEnabledForCustomer: false,
      scheduleOffset: 5
    },
    {
      enabled: true,
      emailEnabledForProvider: true,
      smsEnabledForProvider: true,
      emailEnabledForCustomer: false,
      smsEnabledForCustomer: false,
      phoneCallEnabledForCustomer: true,
      whatsappEnabledForCustomer: false,
      scheduleOffset: 1
    }
  ]
});
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :------------------------------------------ |
| `customer` | `string` | **Required**. Customer ID |
| `notifications` | `array` | **Required**. Array of notification objects |

#### Get customer notifications
Retrieves all notifications for a specific customer.

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

// Get customer notifications
await asaas.notifications.getByCustomer("cus_123abcde456");
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :------------------------------------------ |
| `customerId` | `string` | **Required**. Customer ID |


### Documents

#### Get pending documents
Retrieves all pending documents that need to be uploaded.

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

// Get pending documents
const documents = await asaas.documents.getPending();
console.log('Pending documents:', documents.data);
console.log('Reject reasons:', documents.rejectReasons);
```

#### Upload document
Uploads a document for a specific document group.

```javascript
import { AsaasClient, DocumentType } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

// Upload a document
const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
const uploadedDocument = await asaas.documents.upload('doc_group_123', {
  documentFile: file,
  type: DocumentType.IDENTIFICATION
});
console.log('Document uploaded:', uploadedDocument);
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `string` | **Required**. Document group ID |
| `documentFile` | `File` | **Required**. Document file to upload |
| `type` | `DocumentType` | **Required**. Type of document |

#### Get document file
Retrieves information about an uploaded document.

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

// Get document file info
const documentFile = await asaas.documents.getFile('doc_file_123');
console.log('Document file:', documentFile);
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `string` | **Required**. Document file ID |

#### Update document file
Updates an uploaded document with a new file.

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

// Update document file
const newFile = new File(['new content'], 'updated_document.pdf', { type: 'application/pdf' });
const updatedDocument = await asaas.documents.updateFile('doc_file_123', {
  documentFile: newFile
});
console.log('Document updated:', updatedDocument);
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `string` | **Required**. Document file ID |
| `documentFile` | `File` | **Required**. New document file |

#### Delete document file
Removes an uploaded document.

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

// Delete document file
const deleteResult = await asaas.documents.deleteFile('doc_file_123');
console.log('Document deleted:', deleteResult.deleted);
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `string` | **Required**. Document file ID |


### Finance

#### Get account balance
Retrieves the current account balance.

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

// Get account balance
const balance = await asaas.finance.getBalance();
console.log('Account balance:', balance.balance);
```

#### Get payment statistics
Retrieves payment statistics with optional filters.

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

// Get payment statistics with filters
const statistics = await asaas.finance.getPaymentStatistics({
  customer: 'cus_123abcde456',
  billingType: 'PIX',
  status: 'CONFIRMED',
  anticipated: false,
  'dateCreated[ge]': '2024-01-01',
  'dateCreated[le]': '2024-12-31'
});
console.log('Payment statistics:', statistics);
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :------------------------------------------ |
| `customer` | `string` | Filter by customer ID |
| `billingType` | `string` | Filter by billing type (BOLETO, CREDIT_CARD, TRANSFER, DEPOSIT, DEBIT_CARD, PIX) |
| `status` | `string` | Filter by status (PENDING, RECEIVED, CONFIRMED, OVERDUE) |
| `anticipated` | `boolean` | Filter anticipated records |
| `dateCreated[ge]` | `string` | Filter from creation date (YYYY-MM-DD) |
| `dateCreated[le]` | `string` | Filter to creation date (YYYY-MM-DD) |
| `dueDate[ge]` | `string` | Filter from due date (YYYY-MM-DD) |
| `dueDate[le]` | `string` | Filter to due date (YYYY-MM-DD) |
| `estimatedCreditDate[ge]` | `string` | Filter from estimated credit date (YYYY-MM-DD) |
| `estimatedCreditDate[le]` | `string` | Filter to estimated credit date (YYYY-MM-DD) |
| `externalReference` | `string` | Filter by external reference |

#### Get split statistics
Retrieves split payment statistics.

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

// Get split statistics
const splitStats = await asaas.finance.getSplitStatistics();
console.log('Split statistics:', splitStats);
console.log('Income:', splitStats.income);
console.log('Value to send:', splitStats.value);
```


### Payments

#### Return all payments
Returns payments. Filters can be applied, passing an object with the items allowed in the [official documentation](https://docs.asaas.com/reference/listar-cobrancas).

```javascript
import { AsaasClient } from 'asaas-kit';

const asaas = new AsaasClient(process.env.ASAAS_API_KEY, {
  // sandbox: boolean;
  //sandboxUrl?: string (default: https://sandbox.asaas.com/api/v3);
  //baseUrl?: string (default: https://api.asaas.com/v3);
});

//It lists all registered payments and makes a filter by customer ID.
await asaas.payments.list({
  customer: "cus_123abcde456"
});
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `customer` | `string` | Filter by **Customer ID**.|
| `customerGroupName` | `string` | Filter by **Customer group name**.|
| `billingType` | `string` | Filter by **Billing Type**.|
| `status` | `string` | Filter by **Status**.|
| `subscription` | `string` | Filter by **Subscription ID**.|
| `installment` | `string` | Filter by **Installment ID**.|
| `externalReference` | `string` | Filter by **External Reference**.|
| `paymentDate` | `