import { CompletedTask } from "../../../models/completedTask.model";
import { UserAccount } from "../../../models/user.model";
import { api } from "../../../utils/api";

export type CompletedTaskToSend = Omit<
  CompletedTask,
  "_id" | "createdDate" | "lastUpdate"
>;

export type CompletedTaskResponse = {
  user: UserAccount;
  completedTask: CompletedTask;
};

export const sendCompletedTask = (data: CompletedTaskToSend) =>
  api.post<CompletedTaskResponse>("/completedTasks", data);
