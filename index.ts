export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    // Picture of a dog
    const exampleInputImage = await fetch(
      "https://pub-1fb693cb11cc46b2b2f656f51e015a2c.r2.dev/dog.png"
    );

    const inputs = {
      prompt: "Change to a lion",
      image: [...new Uint8Array(await exampleInputImage.arrayBuffer())],
    };

    const response = await env.AI.run(
      "@cf/runwayml/stable-diffusion-v1-5-img2img",
      inputs
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
  
} satisfies ExportedHandler<Env>;