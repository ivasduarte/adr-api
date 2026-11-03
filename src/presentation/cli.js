import { input, editor, select } from "@inquirer/prompts";

async function collectList(promptMessage) {
  const items = [];
  console.log(`\n--- ${promptMessage} (Press Enter (empty) to advance.) ---`);

  while (true) {
    const answer = await input({ message: "> " });
    if (!answer.trim()) break;
    items.push(answer.trim());
  }
  return items;
}

async function run() {
  console.log("--- New Architecture Decision Record ---");

  const title = await input({ message: "Title:" });

  const status = await select({
    message: "ADR Status:",
    choices: [
      { name: "Proposed", value: "PROPOSED" },
      { name: "Accepted", value: "ACCEPTED" },
      { name: "Rejected", value: "REJECTED" },
    ],
  });

  const context = await editor({
    message: "Context (explains the problem and the need for the decision):",
  });
  const consideredOptions = await editor({
    message: "Options considered (with justification for exclusion):",
  });
  const chosenOption = await editor({
    message: "Option chosen (with justification for choice):",
  });

  const positiveConsequences = await collectList("Positive Consequences");
  const negativeConsequences = await collectList("Negative Consequences");

  const mermaidCode = await editor({
    message: "Mermaid code (e.g., graph TD; A-->B;):",
  });

  try {
    const response = await fetch("http://localhost:3000/adrs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        status,
        context,
        consideredOptions,
        chosenOption,
        positiveConsequences,
        negativeConsequences,
        mermaidCode,
      }),
    });

    if (response.ok) {
      console.log("\nADR successfully generated in the /adrs folder!");
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