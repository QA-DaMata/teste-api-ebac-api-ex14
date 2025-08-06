Cypress.Commands.add('listarUsuarios', () => {
    cy.request({
        method: 'GET',
        url: 'usuarios',
        failOnStatusCode: false
    })
})

Cypress.Commands.add('cadastrarUsuarios', (data) => {
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body: data,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('atualizarUsuarios', (id, data) =>{
    cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        body: data,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('excluirUsuario',(id) => {
    cy.request({
       method: 'DELETE',
        url: `usuarios/${id}`,
        failOnStatusCode: false
    })
})