import { AfterChangeHook } from "node_modules/payload/dist/collections/config/types";

export const loginAfterCreate: AfterChangeHook = async ({
  doc,
  operation,
  req,
  req: { body, payload },
}) => {
  if (operation === "create") {
    const { email, password }: any = body;

    if (email && password) {
      const { token, user } = await payload.login({
        collection: "users",
        data: { email, password },
        req,
      });

      return {
        ...doc,
        token,
        user,
      };
    }
  }

  return doc;
};
