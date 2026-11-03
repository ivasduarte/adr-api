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
    await fs.mkdir(this.directoryPath, { recursive: true });

    const encodedPlantUml = plantumlEncoder.encode(adr.plantUmlCode);
    const imageUrl = `http://www.plantuml.com/plantuml/svg/${encodedPlantUml}`;

    const markdownContent = `# ${adr.title}

**Status:** ${adr.status}

## Context
${adr.content}

## Architecture
![Diagrama PlantUML](${imageUrl})
`;

    const filePath = path.join(this.directoryPath, `${adr.id}.md`);
    await fs.writeFile(filePath, markdownContent, "utf-8");
  }
}
