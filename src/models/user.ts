export type updatedUserInfo = {
  login: string;
  name: string;
};

export type userIdType = {
  login: string;
};

export type userDataType = updatedUserInfo & userIdType;
