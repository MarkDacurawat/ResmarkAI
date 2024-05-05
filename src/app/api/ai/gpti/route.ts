import { gpt } from "gpti";

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const data = await new Promise((resolve, reject) => {
      gpt.v1(
        {
          messages: [
            {
              role: "user",
              content: "Who are you?",
            },
            {
              role: "assistant",
              content: "Hello! My Name is ResmarkAI",
            },
          ],
          prompt: message as string,
          markdown: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
