import { anyone } from "@/security/anyone";
import { authenticated } from "@/security/authenticated";
import { CollectionConfig } from "payload";
import * as Lucide from "lucide-react";

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
      name: "icon",
      type: "select",
      required: true,
      options: Object.keys(Lucide)
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
