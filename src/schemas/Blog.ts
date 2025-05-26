import { CollectionConfig } from "payload";
import { populateAuthors } from "./hooks/populateAuthors";
import { updateSlug } from "./hooks/updateSlug";
import { authenticated } from "@/security/authenticated";
import { anyone } from "@/security/anyone";

export const Blog: CollectionConfig = {
  slug: "blog",
  labels: {
    singular: "Blog",
    plural: "Blogs",
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
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "authors",
      type: "relationship",
      hasMany: true,
      relationTo: "users",
    },
    {
      name: "populatedAuthors",
      type: "array",
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: "id",
          type: "text",
        },
        {
          name: "name",
          type: "text",
        },
      ],
    },
    {
      name: "publishedDate",
      type: "date",
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "categories",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
  ],
  hooks: {
    afterRead: [populateAuthors],
    beforeChange: [updateSlug],
  },
};
