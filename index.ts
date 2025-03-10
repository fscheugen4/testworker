export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    // Picture of a dog
    const exampleInputImage = await fetch(
      "https://einsundnull.de/assets/Uploads/E+N-Referenzen/Joules_thumb_up_circle.png"
    );

    const inputs = {
      prompt: "add mustach and sombrero to robot",
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