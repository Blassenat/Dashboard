import { authHandlers } from './authHandlers';
import { dashboardHandlers } from './dashboardHandlers';
import { usersHandlers } from './userHandlers';
import { activityHandlers } from './activity.handlers';

export const handlers = [
  ...authHandlers,
  ...dashboardHandlers,
  ...usersHandlers,
  ...activityHandlers,
];