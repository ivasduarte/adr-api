import fs from "node:fs/promises";
import path from "node:path";
import plantumlEncoder from "plantuml-encoder";
import { AdrRepository } from "../domain/AdrRepository.js";

export class FileAdrRepository extends AdrRepository {
  constructor(directoryPath) {
    super();
    this.directoryPath = directoryPath;
  }

  async save(adr) {
    const fullPlantUml = `
@startuml
skinparam handwritten true
skinparam monochrome true
${adr.plantUmlCode}
@enduml
    `.trim();

    const encodedPlantUml = plantumlEncoder.encode(fullPlantUml);
    const imageUrl = `http://www.plantuml.com/plantuml/svg/${encodedPlantUml}`;

    const markdownContent = `# ADR: ${adr.title}

**Date:** ${new Date().toISOString().split("T")[0]}
**Status:** ${adr.status}

## 1. Context and Decision
${adr.content}

## 2. Architectural Design
![Diagrama](${imageUrl})

## 3. Consequences
* (Fill in the positive impacts)
* (Fill in the negative impacts)
`;

    const filePath = path.join(this.directoryPath, `${adr.id}.md`);
    await fs.writeFile(filePath, markdownContent, "utf-8");
  }
}
