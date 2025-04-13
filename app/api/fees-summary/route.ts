export async function GET() {
    const summary = {
      adminFund: "$12,500.00",
      capitalWorksFund: "$32,000.00",
      lastUpdated: "April 2025"
    };
  
    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  