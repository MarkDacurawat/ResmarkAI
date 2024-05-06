const mumaker = require("mumaker");

export async function POST(req: Request) {
  const { designUrl, message } = await req.json();
  try {
    const data = await new Promise((resolve, reject) => {
      mumaker
        .photooxy(designUrl, message as string)
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });

    return Response.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
