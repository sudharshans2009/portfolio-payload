import type { Access } from "payload";
import { checkRole } from "./check-role";

export const admins: Access = ({ req: { user } }) => checkRole(["admin"], user);
