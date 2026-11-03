export class Adr {
  constructor(
    id,
    title,
    status,
    contextText,
    consideredOptions,
    chosenOption,
    positiveConsequences,
    negativeConsequences,
    mermaidCode,
  ) {
    if (!id || !title) throw new Error("ID and Title are mandatory.");

    this.id = id;
    this.title = title;
    this.status = status || "PROPOSED";
    this.context = contextText;
    this.consideredOptions = consideredOptions;
    this.chosenOption = chosenOption;
    this.positiveConsequences = positiveConsequences || [];
    this.negativeConsequences = negativeConsequences || [];
    this.mermaidCode = mermaidCode;
  }

  approve() {
    this.status = "ACCEPTED";
  }

  reject() {
    this.status = "REJECTED";
  }
}
