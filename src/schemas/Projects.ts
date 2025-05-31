import type { CollectionConfig } from "payload";
import { checkRole } from "./access/check-role";
import { admins } from "./access/admins";
import { anyone } from "./access/anyone";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Project",
    plural: "Projects",
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
      name: "description",
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
      name: "demoUrl",
      type: "text",
      required: true,
    },
    {
      name: "githubUrl",
      type: "text",
      required: true,
    },
    {
      name: "tags",
      type: "array",
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
