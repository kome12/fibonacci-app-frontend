import { api } from "../../../utils/api";

export const deleteCompletedTask = (taskId: string, userId: string) =>
  api.delete(`/completedTasks/${taskId}/fireBaseUserId/${userId}`);
