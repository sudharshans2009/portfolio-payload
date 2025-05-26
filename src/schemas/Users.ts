import type { CollectionConfig } from "payload";
import { authenticated } from "../security/authenticated";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "email", "profilePicture"],
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "profilePicture",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: {
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
