import { G4F } from "g4f";
const g4f = new G4F();

export async function POST(req: Request) {
  const { message, history } = await req.json();
  let messages = [
    {
      role: "system",
      content: "You're an expert bot in researching and programming.",
    },
    {
      role: "assistant",
      content: "Hello! My Name is ResmarkAI",
    },
    {
      role: "assistant",
      content: "The Creator of this bot is Mark Dacurawat.",
    },
  ];

  messages = [
    ...messages,
    ...history,
    {
      role: "user",
      content: message as string,
    },
  ];

  try {
    const data = await new Promise((resolve, reject) => {
      g4f
        .chatCompletion(messages)
        .then((data) => resolve(data))
        .then((err) => reject(err));
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
