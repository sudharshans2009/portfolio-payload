"use server";

import payloadConfig from "@/payload.config";
import { FormSchema, formSchema } from "@/forms/submitEmail";
import { revalidatePath } from "next/cache";
import { headers, cookies as nextCookies } from "next/headers";
import { getPayload } from "payload";

export async function submitEmail(formData: FormSchema) {
  try {
    const request = await headers();
    const config = await payloadConfig;
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: request });

    const parsedBody = formSchema.safeParse(formData);

    if (!user?.email) {
      throw new Error("You must be logged in to send a message.");
    }

    if (!parsedBody.data) {
      throw new Error("Invalid form data.");
    }

    const { email, name, message_content: message, ip } = parsedBody.data;

    if (user?.email !== email) {
      throw new Error("Email does not match the logged-in user.");
    }

    if (!email || !name || !message) {
      throw new Error("All fields are required.");
    }

    if (!ip) {
      throw new Error("IP address is invalid.");
    }

    const cookies = await nextCookies();
    cookies.set("ip", ip, { maxAge: 60 * 60 * 24 * 7 });

    const rateLimitKey = `contact-rate-limit-${email}-${ip}`;
    const lastSent = await payload.find({
      collection: "rate_limits",
      where: { key: { equals: rateLimitKey } },
    });

    await payload.create({
      collection: "messages",
      data: {
        email,
        name,
        message,
        ip,
        type: "initial",
      },
    });

    revalidatePath("/", "layout");

    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    if (lastSent.docs.length > 0) {
      const lastSentTime = lastSent.docs[0].timestamp;
      if (now - lastSentTime < oneHour) {
        throw new Error("You can only send a message once every hour.");
      }

      await payload.update({
        collection: "rate_limits",
        id: lastSent.docs[0].id,
        data: { timestamp: now },
      });
    } else {
      await payload.create({
        collection: "rate_limits",
        data: { key: rateLimitKey, timestamp: now },
      });
    }

    const mail = await payload.sendEmail({
      to: `${name} <${email}>`,
      subject: `Question from ${name}`,
      text: message,
    });

    return { success: true, mail, error: null };
  } catch (err) {
    console.error("Error sending email:", err);
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Failed to send email. Please try again later.";
    return { success: false, error: errorMessage, mail: null };
  }
}
