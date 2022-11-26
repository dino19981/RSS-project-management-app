export interface autorizationSchemaType {
  login: string;
  password: string;
}

export interface registrationSchemaType extends autorizationSchemaType {
  name: string;
}
