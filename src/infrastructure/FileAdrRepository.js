import fs from "node:fs/promises";
import path from "node:path";
import { AdrRepository } from "../domain/AdrRepository.js";

export class FileAdrRepository extends AdrRepository {
  constructor(directoryPath) {
    super();
    this.directoryPath = directoryPath;
  }

  async save(adr) {
    await fs.mkdir(this.directoryPath, { recursive: true });

    const positiveList =
      adr.positiveConsequences.length > 0
        ? adr.positiveConsequences.map((c) => `* [+] ${c}`).join("\n")
        : "* None identified.";

    const negativeList =
      adr.negativeConsequences.length > 0
        ? adr.negativeConsequences.map((c) => `* [-] ${c}`).join("\n")
        : "* None identified.";

    const markdownContent = `# ADR: ${adr.title}

**Date:** ${new Date().toISOString().split("T")[0]}
**Status:** ${adr.status}

## 1. Context
${adr.context}

## 2. Options Considered
${adr.consideredOptions}

## 3. Option Selected
${adr.chosenOption}

## 4. Consequences

**Positive:**
${positiveList}

**Negative:**
${negativeList}

## 5. Architectural Design
\`\`\`mermaid
${adr.mermaidCode}
\`\`\`
`;

    const filePath = path.join(this.directoryPath, `${adr.id}.md`);
    await fs.writeFile(filePath, markdownContent, "utf-8");
  }
}