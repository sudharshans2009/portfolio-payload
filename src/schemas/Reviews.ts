import type { CollectionConfig } from "payload";
import { admins } from "./access/admins";
import { checkRole } from "./access/check-role";
import { anyone } from "./access/anyone";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  labels: {
    singular: "Review",
    plural: "Reviews",
  },
  admin: {
    useAsTitle: "name",
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
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "position",
      type: "text",
      required: true,
    },
    {
      name: "review",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
  ],
};
