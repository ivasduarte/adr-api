import { randomUUID } from "node:crypto";
import { Adr } from "../domain/Adr.js";

export class CreateAdr {
  constructor(adrRepository) {
    this.adrRepository = adrRepository;
  }

  async execute(request) {
    const id = randomUUID();
    const adr = new Adr(
      id,
      request.title,
      request.status,
      request.context,
      request.consideredOptions,
      request.chosenOption,
      request.positiveConsequences,
      request.negativeConsequences,
      request.mermaidCode,
    );

    await this.adrRepository.save(adr);

    return adr;
  }
}