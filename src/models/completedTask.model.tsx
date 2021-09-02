export interface CompletedTask {
  _id?: string;
  fireBaseUserId: string;
  ruleId: string;
  date: Date | string;
  rewardTypeId: string;
}
