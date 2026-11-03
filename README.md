# ADR API

API for managing, automating, and validating Architecture Decicion Records (ADRs).

## The Problem

Development teams often lose track of the historical record of architectural decisions. Documenting business rules and keeping diagrams up-to-date is a manual, decentralized process prone to loss of context over time.

## The Solution

A centralized system that received architectural context via API and generates validated and standardized Markdown documents, including automatic rendering of PlantUML diagrams in image format.

## Architecture and Technical Decisions

The project follows Domain-Driven Design (DDD) principles to ensure the isolation of business logic:

* **Domain:** Contains the pure rules of the ADR entity and state transition validations (PROPOSED, ACCEPTED, REJECTED).

* **Application:** Orchestrates the system's use cases (e.g., `CreateAdr`).

* **Infrastructure:** Implements external adapters, managing file writing to disk and communication with the PlantUML encoder.

* **Presentation:** Exposes HTTP routes through Express, injecting the necessary dependencies in the use cases.

### Tests

validation is done using the native `Node.js` test runner (`node --test`).

The project uses a strict *Dummy approach* to isolate dependencies in the Application layer tests. No mocking libraries (such as Mockito or equivalents) are used, ensuring that the domain and use cases are testes without coupling to external *mocking* tools.

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

Create a new ADR via POST request:

```bash
curl -X POST http://localhost:3000/adrs \
  -H "Content-Type: application/json" \
  -d '{"title":"Adoção de DDD","content":"Isolar a regra de negócio da framework web e base de dados.","plantUmlCode":"component Arquitetura"}'
```

The generated file is saved in the directory `/adrs` in Markdown format.