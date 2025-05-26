import { CollectionBeforeChangeHook } from "payload";

export const updateSlug: CollectionBeforeChangeHook = async ({
  data,
  operation,
}) => {
  if (operation === "create" || operation === "update") {
    if (data?.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""); // Generate slug from title
    }
  }
};
