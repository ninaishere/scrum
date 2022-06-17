/// <reference types="Cypress" />

import { login } from "../page_objects/login";

describe("Login test", () => {
  let loginData = {
    email: "ninasamsung2001@gmail.com",
    password: "test123456",
  };

  beforeEach("visit login page", () => {
    cy.visit("/login");
    cy.url().should("include", "/login");
  });

  it("valid login", () => {
    cy.intercept({
      method: "POST",
      url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
    }).as("login");

    login.login(loginData.email, loginData.password);

    cy.wait("@login").then((interception) => {
      expect(interception.response.statusCode).eq(200);
      cy.url().should("not.include", "/login");
    });
  });
});
