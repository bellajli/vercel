export async function POST(request: Request) {
    const data = await request.json();
  
    console.log("Form submitted:", data);
  
    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  