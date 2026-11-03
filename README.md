# ADR API

API and CLI for managing, automating, and validating Architecture Decision Records (ADRs).

## The Problem
Development teams often lose track of the historical history of architectural decisions. Documenting business rules and keeping diagrams up-to-date is a manual, decentralized process prone to loss of context over time.

## The Solution
A centralized system (API + CLI) that interactively receives architectural context and generates validated and standardized Markdown documents, including automatic rendering of PlantUML diagrams with enhanced visual formatting.

## Architecture and Technical Decisions
The project follows Domain-Driven Design (DDD) principles to ensure the isolation of business logic:
* **Domain:** Pure rules of the ADR entity and state transition validations.

* **Application:** Orchestration of use cases (CreateAdr).

* **Infrastructure:** External adapters (file writing and PlantUML conversion).

* **Presentation:** Express Server (HTTP API) and interactive Command Line Interface (CLI).

### Tests
Validation is done using the native Node.js test runner (`node --test`).

The project strictly uses a *Dummy approach* to isolate dependencies in the Application layer tests. No external mocking libraries (such as Mockito) are used.

## How to Run

Install dependencies:
```bash
npm install
```

Locally initialize the API:

```bash
node src/presentation/server.js
```

Execute tests:

```bash
npm test
```

## Mechanics of Use

Open a second terminal and launch the interactive interface:

```bash
npm run adr:new
```

Follow the instructions. Notepad will open for inserting PlantUML text and code. Save (`Ctrl + S`) and close the text editor to continue. The final file with the rendered diagram is generated in the directory `/adrs`.
