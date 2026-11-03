import express from "express";
import path from "node:path";
import { FileAdrRepository } from "../infrastructure/FileAdrRepository.js";
import { CreateAdr } from "../application/CreateAdr.js";

const app = express();
app.use(express.json());

const adrsDirectory = path.join(process.cwd(), "adrs");
const repository = new FileAdrRepository(adrsDirectory);
const createAdr = new CreateAdr(repository);

app.post("/adrs", async (req, res) => {
  try {
    const adr = await createAdr.execute(req.body);
    res.status(201).json(adr);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API executing on port ${PORT}`);
});
