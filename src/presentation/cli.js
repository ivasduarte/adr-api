import { input, editor } from "@inquirer/prompts";

async function run() {
  console.log("--- New Architecture Decision Record ---");

  const title = await input({ message: "Title: " });
  const content = await editor({
    message: "Context and Consequences (opens text editor): ",
  });
  const plantUmlCode = await editor({
    message: "PlantUML code (e.g., [API] -> [DB]): ",
  });

  try {
    const response = await fetch("http://localhost:3000/adrs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, plantUmlCode }),
    });

    if (response.ok) {
      console.log("ADR successfully generated in the /adrs folder!");
    } else {
      const errorData = await response.json();
      console.error("Error returned by the API:", errorData);
    }
  } catch (error) {
    console.error(
      "Connection error. Is the server running on the other terminal?",
      error.message,
    );
  }
}

run();