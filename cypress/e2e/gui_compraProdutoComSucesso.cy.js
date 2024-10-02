/// <reference types="Cypress"/>

describe('Teste E2E - Compra de produtos realizada com sucesso', () => {

    it('Fluxo de compra de produtos', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('contain', 'Products')

        // Ordenação de produtos do menor para maior valor:
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

        // Validação de ordenação dos produtos
        cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Onesie')
        cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bike Light')
        cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bolt T-Shirt')

        // Acessando produtos e inserindo no carrinho de compras
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bike Light').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        // Checagem da quantidade de produtos adicionado ao carrinho
        cy.get('[data-test="shopping-cart-link"]').should('have.text', '3')
        cy.get('[data-test="shopping-cart-link"]').should('have.text', '3')

        // Checagem no carrinho para verificar se produtos estão adicionados corretamente
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="cart-list"] > :nth-child(3)').should('contain', 'Sauce Labs Onesie')
        cy.get('[data-test="cart-list"] > :nth-child(4)').should('contain', 'Sauce Labs Bike Light')
        cy.get('[data-test="cart-list"] > :nth-child(5)').should('contain', 'Sauce Labs Bolt T-Shirt')

        // Checkout
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Teste_primeiro_nome')
        cy.get('[data-test="lastName"]').type('Teste_ultimo_nome')
        cy.get('[data-test="postalCode"]').type('12345678')
        cy.get('[data-test="continue"]').click()

        // Verificando produtos
        cy.get('[data-test="cart-list"] > :nth-child(3)').should('contain', 'Sauce Labs Onesie')
        cy.get('[data-test="cart-list"] > :nth-child(4)').should('contain', 'Sauce Labs Bike Light')
        cy.get('[data-test="cart-list"] > :nth-child(5)').should('contain', 'Sauce Labs Bolt T-Shirt')

        // Checagem de valor total
        cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69')

        // Finalizando compra
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')

    });
    
});