export type updatedUserInfo = {
  login: string;
  name: string;
};

export type userDataType = updatedUserInfo & {
  id: string;
};
