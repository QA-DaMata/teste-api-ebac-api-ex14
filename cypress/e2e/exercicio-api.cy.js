/// <reference types="cypress" />
import usuarios from '../fixtures/factories/usuario'
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
  
  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(res => {
      expect(res.status).eq(200)
      return contrato.validateAsync(res.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.listarUsuarios().then(res => {
      expect(res.status).eq(200)
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let usuario = usuarios.usuarioData()
    cy.cadastrarUsuarios(usuario).then(res => {
      expect(res.status).eq(201)
      expect(res.body.message).eq('Cadastro realizado com sucesso')
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    let usuario = usuarios.usuarioData()
    let emailInvalido = 'naosouvalido.com.br'
    usuario.email = emailInvalido
    cy.cadastrarUsuarios(usuario).then(res => {
      expect(res.status).eq(400)
      expect(res.body.email).eq('email deve ser um email válido')
    })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let usuario = usuarios.usuarioData()
    cy.cadastrarUsuarios(usuario).then(res => {
      let id = res.body._id
      expect(res.status).eq(201)
      expect(res.body.message).eq('Cadastro realizado com sucesso')
      cy.atualizarUsuarios(id, usuario).then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Registro alterado com sucesso')
      })
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let usuario = usuarios.usuarioData()
    cy.cadastrarUsuarios(usuario).then(res => {
      let id = res.body._id
      expect(res.status).eq(201)
      expect(res.body.message).eq('Cadastro realizado com sucesso')
      cy.excluirUsuario(id).then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Registro excluído com sucesso')
      })
    })
  });
});
