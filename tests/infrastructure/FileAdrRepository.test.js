import test from "node:test";
import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import { FileAdrRepository } from "../../src/infrastructure/FileAdrRepository.js";
import { Adr } from "../../src/domain/Adr.js";

test("Save MD file with rendered PlantUML diagram", async () => {
  const testDir = path.join(process.cwd(), "temp-adrs");
  const repo = new FileAdrRepository(testDir);
  const adr = new Adr("123-abc", "Infra Test", "Basic context", "component B");

  await repo.save(adr);

  const filePath = path.join(testDir, "123-abc.md");
  const content = await fs.readFile(filePath, "utf-8");

  assert.match(content, /# Infra Test/);
  assert.match(content, /Basic context/);
  assert.match(content, /http:\/\/www\.plantuml\.com\/plantuml\/svg\//);

  await fs.rm(testDir, { recursive: true, force: true });
});
