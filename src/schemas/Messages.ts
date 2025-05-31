import type { CollectionConfig } from "payload";
import { adminsAndUser } from "./access/users";
import { checkRole } from "./access/check-role";

export const Messages: CollectionConfig = {
  slug: "messages",
  labels: {
    singular: "Message",
    plural: "Messages",
  },
  admin: {
    useAsTitle: "name",
  },
  access: {
    admin: ({ req: { user } }) => checkRole(["admin"], user),
    create: adminsAndUser,
    delete: adminsAndUser,
    read: adminsAndUser,
    update: adminsAndUser,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "ip",
      type: "text",
      required: true,
    },
    {
      name: "read",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Reply",
          value: "reply",
        },
        {
          label: "Initial",
          value: "initial",
        },
      ],
    },
  ],
};
