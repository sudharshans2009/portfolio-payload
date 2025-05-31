import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig, PayloadRequest } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { resendAdapter } from "@payloadcms/email-resend";

import { Users } from "./schemas/Users";
import { Media } from "./schemas/Media";
import { FAQs } from "./schemas/FAQs";
import { Reviews } from "./schemas/Reviews";
import { Projects } from "./schemas/Projects";
import { RateLimits } from "./schemas/RateLimits";
import { Messages } from "./schemas/Messages";
import { Blog } from "./schemas/Blog";
import { Page } from "./schemas/Page";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    FAQs,
    Reviews,
    Projects,
    RateLimits,
    Messages,
    Blog,
    Page,
  ],
  editor: lexicalEditor(),
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ""].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ""].filter(Boolean),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  email: resendAdapter({
    defaultFromAddress: "contact@sudharshans2009.live",
    defaultFromName: "Sudharshan S",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  plugins: [payloadCloudPlugin()],
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true;
        const authHeader = req.headers.get("authorization");
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
});
