class Archive {
  get organization() {
    return cy.get(".vs-c-my-organization__header").first();
  }

  get yesBtn() {
    return cy.get(".vs-u-text--right > button").last();
  }
}

export const archive = new Archive();
