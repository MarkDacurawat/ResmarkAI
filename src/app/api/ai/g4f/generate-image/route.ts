import { G4F } from "g4f";
const g4f = new G4F();

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const data = await new Promise((resolve, reject) => {
      g4f
        .imageGeneration(message as string, {
          debug: true,
          provider: g4f.providers.Pixart,
          providerOptions: {
            height: 300,
            width: 300,
            samplingMethod: "SA-Solver",
          },
        })
        .then((data) => resolve(data))
        .then((err) => reject(err));
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
