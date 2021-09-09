import { UserAccount } from "../../../models/user.model";
import { api } from "../../../utils/api";

export const getUserAccountData = (userId: string) =>
  api.get<UserAccount>(`/users/${userId}`);
