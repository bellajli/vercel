export async function POST(request: Request) {
    const { unitNumber } = await request.json();
  
    const fakeData = {
      "101": { owner: "Alice Tan", status: "Paid" },
      "202": { owner: "Ben Lee", status: "Overdue" },
      "303": { owner: "Cindy Wong", status: "Paid" }
    };
  
    const result = fakeData[unitNumber] || { error: "Unit not found" };
  
    return new Response(JSON.stringify(result), {
      status: result.error ? 404 : 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  