import { anyone } from "@/security/anyone";
import { authenticated } from "@/security/authenticated";
import type { CollectionConfig } from "payload";

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
    admin: authenticated,
    create: anyone,
    delete: anyone,
    read: anyone,
    update: anyone,
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
          label: "Iniitial",
          value: "initial",
        },
      ],
    },
  ],
};
