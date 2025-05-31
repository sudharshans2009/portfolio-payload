import type { CollectionConfig } from "payload";
import { admins } from "./access/admins";
import { anyone } from "./access/anyone";
import { checkRole } from "./access/check-role";
import LucideEnum from "./Lucide";

export const Page: CollectionConfig = {
  slug: "page",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  admin: {
    useAsTitle: "title",
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
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "icon",
      type: "select",
      required: true,
      options: LucideEnum,
    },
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};
