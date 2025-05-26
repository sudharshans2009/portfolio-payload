import type { CollectionAfterReadHook } from "payload";
import { User } from "src/payload-types";

export const populateAuthors: CollectionAfterReadHook = async ({
  doc,
  req: { payload },
}) => {
  if (doc?.authors && doc?.authors?.length > 0) {
    const authorDocs: User[] = [];

    for (const author of doc.authors) {
      try {
        const authorDoc = await payload.findByID({
          id: typeof author === "object" ? author?.id : author,
          collection: "users",
          depth: 0,
        });

        if (authorDoc) {
          authorDocs.push(authorDoc);
        }

        if (authorDocs.length > 0) {
          doc.populatedAuthors = authorDocs.map((authorDoc) => ({
            id: authorDoc.id,
            name: authorDoc.name,
          }));
        }
      } catch {
        // swallow error
      }
    }
  }

  return doc;
};
