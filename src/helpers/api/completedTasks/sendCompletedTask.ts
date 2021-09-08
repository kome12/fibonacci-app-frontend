import { CompletedTask } from "../../../models/completedTask.model";
import { api } from "../../../utils/api";

export type CompletedTaskToSend = Omit<
  CompletedTask,
  "_id" | "createdDate" | "lastUpdate"
>;

export const sendCompletedTask = (data: CompletedTaskToSend) =>
  api.post<CompletedTask>("/completedTasks", data);
