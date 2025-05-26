import payloadConfig from "@/payload.config";
import { revalidatePath } from "next/cache";
import { getPayload } from "payload";

export async function PATCH(request: Request) {
  try {
    const config = await payloadConfig;
    const payload = await getPayload({ config });

    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get("id");

    const updatedMessage = await payload.update({
      collection: "messages",
      where: {
        id: {
          equals: Number(id),
        },
      },
      data: {
        read: true,
      },
    });

    revalidatePath("/contact", "layout");
    revalidatePath("/", "layout");

    return Response.json(updatedMessage, { status: 200 });
  } catch (error) {
    console.error("Error updating message:", error);
    return Response.json({ error: "Failed to update message" });
  }
}
