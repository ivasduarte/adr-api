export class Adr {
  constructor(id, title, content, plantUmlCode) {
    if (!id || !title) throw new Error("ID and Title are mandatory.");

    this.id = id;
    this.title = title;
    this.content = content;
    this.plantUmlCode = plantUmlCode;
    this.status = 'PROPOSED'; // Allowed statuses: PROPOSED, ACCEPTED, REJECTED
  }

  approve() {
    this.status = 'ACCEPTED';
  }

  reject() {
    this.status = 'REJECTED';
  }
}
