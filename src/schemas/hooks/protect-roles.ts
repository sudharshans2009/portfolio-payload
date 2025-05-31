import type { FieldHook } from "payload";

import type { User } from "../../payload-types";

export const protectRoles: FieldHook<{ id: string } & User> = ({
  data,
  req,
}) => {
  const isAdmin =
    req.user?.roles?.includes("admin") || data?.email === "demo@payloadcms.com"; // for the seed script

  if (!isAdmin) {
    return ["user"];
  }

  const userRoles = new Set(data?.roles || []);
  userRoles.add("user");
  return [...userRoles];
};
