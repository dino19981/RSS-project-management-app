export interface authorizationSchemaType {
  login: string;
  password: string;
}

export interface registrationSchemaType extends authorizationSchemaType {
  name: string;
}
