import { AxiosError } from "axios";

export type UserDataFiltred = {
  active: boolean;
  id: string;
  roleLevel: number;
  username: string;
  role: string;
};
export interface UserResponse {
  user: {
    payload: {
      data: UserDataFiltred;
    };
  } | null;
  error: AxiosError | null;
}