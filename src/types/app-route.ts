import { AppRoute } from "../const";

export type AppRouteType = (typeof AppRoute)[keyof typeof AppRoute];
