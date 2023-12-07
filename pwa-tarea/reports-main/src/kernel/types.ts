export type Entity<ID extends number | string> = {
  id: ID;
};

export type TPagination = {
  filter: string;
  page?: number;
  offset?: number;
  limit?: number;
  sortBy?: string;
  totalPages?: number;
  sort?: string;
  total?: number;
};

export type TStatus = Entity<number> & {
  description?: string;
};

export type TJson = {
  [x: string]: any;
};

export type TJsonArray = TJson[];

export enum Errors {
  NO_DATA_FOUND = 'NoDataFound',
  INTERNAL_SERVER_ERROR = 'InternalServerError',
  UNAUTHORIZED = 'UnAuthorized',
  MISSING_FIELDS = 'MissingFields',
  RECORD_NOT_REGISTERED = 'RecordNotRegistered',
  RECORD_NOT_UPDATED = 'RecordNotUpdated',
  ALREADY_EXISTS = 'Alreadyexists',
  INVALIDFIELDS = 'InvalidDataTypeInFields',
  CREDENTIALS_MISMATCH = 'CredentialsMismatch',
  SQLERROR = 'SqlErrorCheck',
}

export const ErrorMessage: TJson = {
  NoDataFound: { message: 'NoDataFound', error: true, status: 400 },
  InternalServerError: {
    message: 'InternalServerError',
    error: true,
    status: 400,
  },
  UnAuthorized: {
    message: 'UnAuthorized',
    error: true,
    status: 400,
  },
  MissingFields: {
    message: 'MissingFields',
    error: true,
    status: 400,
  },
  RecordNotRegistered: {
    message: 'RecordNotRegistered',
    error: true,
    status: 400,
  },
  RecordNotUpdated: {
    message: 'RecordNotUpdated',
    error: true,
    status: 400,
  },
  Alreadyexists: {
    message: 'Alreadyexists',
    error: true,
    status: 400,
  },
  InvalidDataTypeInFields: {
    message: 'InvalidDataTypeInFields',
    error: true,
    status: 400,
  },
  CredentialsMismatch: {
    message: 'CredentialsMismatch',
    error: true,
    status: 400,
  },
  SqlErrorCheck: {
    message: 'SqlErrorCheckLogs',
    error: true,
    status: 400,
  },
};
