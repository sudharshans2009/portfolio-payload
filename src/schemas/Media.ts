import type { CollectionConfig } from "payload";
import { checkRole } from "./access/check-role";
import { admins } from "./access/admins";
import { anyone } from "./access/anyone";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    admin: ({ req: { user } }) => checkRole(["admin"], user),
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
