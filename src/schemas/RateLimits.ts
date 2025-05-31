import type { CollectionConfig } from "payload";
import { checkRole } from "./access/check-role";
import { admins } from "./access/admins";
import { anyone } from "./access/anyone";

export const RateLimits: CollectionConfig = {
  slug: "rate_limits",
  labels: {
    singular: "Rate Limit",
    plural: "Rate Limits",
  },
  admin: {
    useAsTitle: "key",
  },
  access: {
    admin: ({ req: { user } }) => checkRole(["admin"], user),
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  fields: [
    {
      name: "key",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "timestamp",
      type: "number",
      required: true,
    },
  ],
};
