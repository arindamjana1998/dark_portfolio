import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Path to the JSON file
    const filePath = path.join(process.cwd(), "src/data/contact.json");

    // Read existing data
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      existingData = JSON.parse(fileContent || "[]");
    }

    // Add timestamp
    const newEntry = { ...body, date: new Date().toISOString() };

    // Add new entry
    existingData.push(newEntry);

    // Save back to file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json(
      { message: "Message saved successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
