/// <reference types="Cypress"/>


describe('Teste Funcional de Login', () => {
    it('CT1: Realizar Login com sucesso', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("performance_glitch_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('contain', 'Products')
    });

    it('CT2: Validar Login incorreto', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("performance_glitch_user1")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service')
    });

    it('CT3: Validar Senha incorreta', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("performance_glitch_user")
        cy.get('[data-test="password"]').type("secret_sauce2")
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service')
    });
});
