/*eslint @typescript-eslint/no-explicit-any: ["warn", { "ignoreRestArgs": false }]*/

export type requestOptions = {
  url: string;
  method?: string;
  params?: { [key: string]: string };
  data?: any;
};

export type AdditionalRequestOptions = Partial<requestOptions>;

export type hookOptionsType = {
  dontFetchAtMount?: boolean;
};
