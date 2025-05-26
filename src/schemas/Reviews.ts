import type { CollectionConfig } from "payload";

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
    read: () => true,
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
