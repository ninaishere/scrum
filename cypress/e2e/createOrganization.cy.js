/// <reference types="Cypress" />

import { createOrganization } from "../page_objects/createOrganization";
import { login } from "../page_objects/login";

describe("Create Organization test", () => {
  let organizationData = {
    name: "Nina",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
  };
  beforeEach("visit my organizations page", () => {
    cy.visit("/login");
    login.login("ninasamsung2001@gmail.com", "test123456");
    cy.wait(3000);
    cy.visit("/my-organizations");
    cy.url().should("include", "/my-organizations");
  });

  it("create organization without image", () => {
    cy.intercept({
      method: "POST",
      url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
    }).as("create");

    createOrganization.create(organizationData.name);

    cy.wait("@create").then((interception) => {
      expect(interception.response.statusCode).eq(201);
    });
  });

  //   it("create organization with image", () => {
  //     cy.intercept({
  //       method: "POST",
  //       url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
  //     }).as("create");

  //     createOrganization.createWithImage(organizationData.name);
  //   });
});
