import { anyone } from "@/security/anyone";
import { authenticated } from "@/security/authenticated";
import type { CollectionConfig } from "payload";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  labels: {
    singular: "FAQ",
    plural: "FAQs",
  },
  admin: {
    useAsTitle: "question",
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
      name: "question",
      type: "text",
      required: true,
    },
    {
      name: "answer",
      type: "richText",
      required: true,
    },
  ],
};
