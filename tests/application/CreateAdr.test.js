import test from "node:test";
import assert from "node:assert";
import { CreateAdr } from "../../src/application/CreateAdr.js";
import { AdrRepository } from "../../src/domain/AdrRepository.js";

class DummyAdrRepository extends AdrRepository {
  constructor() {
    super();
    this.savedAdrs = [];
  }

  async save(adr) {
    this.savedAdrs.push(adr);
  }
}

test("Creates and saves a new ADR", async () => {
  const dummyRepo = new DummyAdrRepository();
  const useCase = new CreateAdr(dummyRepo);

  const request = {
    title: "Adopting Mermaid",
    status: "ACCEPTED",
    context: "We need diagrams on GitHub without generating images.",
    consideredOptions: "1. PlantUML\n2. Mermaid",
    chosenOption: "Mermaid, for native support.",
    positiveConsequences: ["No dependencies", "Generated file is lightweight"],
    negativeConsequences: ["Different syntax"],
    mermaidCode: "TD graph\nA-->B",
  };

  const result = await useCase.execute(request);

  assert.strictEqual(result.title, "Adopt DDD");
  assert.strictEqual(dummyRepo.savedAdrs.length, 1);
  assert.strictEqual(dummyRepo.savedAdrs[0].id, result.id);
});
