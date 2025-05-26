import { anyone } from "@/security/anyone";
import { authenticated } from "@/security/authenticated";
import type { CollectionConfig } from "payload";

export const RateLimits: CollectionConfig = {
  slug: "rate_limits",
  labels: {
    singular: "Rate Limit",
    plural: "Rate Limits",
  },
  admin: {
    useAsTitle: "key",
  },
  access: {
    admin: authenticated,
    create: anyone,
    delete: authenticated,
    read: anyone,
    update: anyone,
  },
  fields: [
    {
      name: "key",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "timestamp",
      type: "number",
      required: true,
    },
  ],
};
