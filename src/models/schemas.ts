export interface autorizationSchemaType {
  login: string;
  password: string;
}

export interface registrationSchemaType extends autorizationSchemaType {
  name: string;
}

export type TBoardCreateSchema = {
  title: string;
};

export type TColumnCreateSchema = {
  title: string;
};
export type TColumnUpdateSchema = {
  title: string;
  order: number;
};
export type TTaskCreateSchema = {
  title: string;
  order: number;
  description: string;
  userId: string;
};
export type TDeleteBoard = { confirm: boolean };
