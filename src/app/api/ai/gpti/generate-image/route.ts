import { stablediffusion } from "gpti";

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const data: any = await new Promise((resolve, reject) => {
      stablediffusion.v2(
        {
          prompt: message as string,
          data: {
            prompt_negative: "",
            guidance_scale: 9,
          },
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
