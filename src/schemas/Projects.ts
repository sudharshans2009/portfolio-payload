import { anyone } from "@/security/anyone";
import { authenticated } from "@/security/authenticated";
import type { CollectionConfig } from "payload";

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
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
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
