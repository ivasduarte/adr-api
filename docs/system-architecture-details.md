# System Architecture Details

This document describes the architectural decisions of the Architecture Decision Records (ADR) management API. The project was designed using Domain-Driven Design (DDD) principles to ensure low coupling and high cohesion.

## Seperation of Concerns (Layers)

The system is divided into four distinct layers, with the dependency rule always pointing from the outside in (towards the Domain):

1. **Domain**

The hreat of the software. It contains the pure business rules and is completely agnostic with respect to databses, web frameworks, or external libraries.

- `Adr` Entity: Ensures that no ADR is created without a title or ID and controls state transitions (PROPOSED, ACCEPTED, REJECTED).

- `AdrRepository` Interface: Defines the contract (Port) that external layers must comply with to persist the entity.

2. **Application**

Contains the system's use cases (e.g., CreateAdr). This layer orchestrates the data flow: it receives the request, instantiates the domain entity, and invokes the repository interface to save the data. You don't know how the data is saved, only that it must be saved.

3. **Infrastructure**

The layer where the technical details reside. Implements the contracts defined by the Domain.

- `FileAdrRepository`: Implements `AdrRepository`. It is responsible for interacting with the file system (fs) and for communicating with the `plantuml-encoder` library to generate the hyperlink of the static image in the diagram.

4. **Presentation**

The application's entry point. It uses the `Express.js` framework to handle HTTP requests and responses. It is in this layer that we perform Dependency Injection (instantiating the physical repository and passing it to the use case).

## Testing Strategy

The project uses the native `Node.js` testing framework (`node:test`).

A fundamental technical decision was the rejection of mocking libraries (Mocking Frameworks). Instead, we applied the Dummy approach. In the Application layer, we created simple classes (e.g., `DummyAdrRepository`) that implement the repository interface in memory. This isolates the tests in a clean, predictable way, without coupling to complex external tools.

## Diagram

See the [architecture file](./architecture.puml) in the `docs/` folder to view the dependency injection and communication diagram between these layers.