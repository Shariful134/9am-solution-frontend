/* eslint-disable @typescript-eslint/no-explicit-any */
export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
    errorSources: {
      path: string;
      message: string;
    }[];
  };
  status: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  success: boolean;
  message: string;
};
export type TUser = {
  _id?: any;
  userName: string;
  password: string;
  shops?: string[];
  exp: number;
  iat: number;
  role: "admin" | "user";
};
export type TCurrentUser = {
  _id?: any;
  username: string;
  password: string;
  shops?: string[];
  exp: number;
  iat: number;
  role: "admin" | "user";
};
// export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
