import { dalle } from "gpti";

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const data: any = await new Promise((resolve, reject) => {
      dalle.v1(
        {
          prompt: message as string,
        },
        (err, data) => {
          if (err != null) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });

    const imageData = await data.images[0];

    return new Response(JSON.stringify(imageData), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
