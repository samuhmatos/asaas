import { DocumentStatus, DocumentType, ResponsibleType } from '../enums';

export interface IResponsible {
  name: string;
  type: ResponsibleType[];
}

export interface IDocument {
  id: string;
  status: DocumentStatus;
}

export interface IDocumentGroup {
  id: string;
  status: DocumentStatus;
  type: DocumentType;
  title: string;
  description: string;
  responsible: IResponsible;
  onboardingUrl: string;
  onboardingUrlExpirationDate: string;
  documents: IDocument[];
}

export interface IDocumentsResponse {
  rejectReasons: string;
  data: IDocumentGroup[];
}

export interface IUploadDocumentRequest {
  documentFile: File;
  type: DocumentType;
}

export interface IUploadDocumentResponse {
  id: string;
  status: DocumentStatus;
}

export interface IUpdateDocumentRequest {
  documentFile: File;
}

export interface IDeleteDocumentResponse {
  deleted: boolean;
  id: string;
}
