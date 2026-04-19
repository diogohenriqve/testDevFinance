

describe('Transações', () => {
    
    beforeEach(() => {
        cy.visit("https://dev-finance.netlify.app/#")
    });

    it('Cadastrar uma entrada', () => {
        
        criarTransacao("Primeiro salário", 2500)

        cy.get("tbody tr td.description").should("have.text", "Primeiro salário")
    });

    it('Cadastrar uma saída', () => {

        //Transações de saída o valor deve estar acompanhado com o negativo no inicio.
        transacaoSaida("Jantar", -500)

        cy.get("tbody tr td.description").should("have.text", "Jantar")
    });

    it('Excluir transação', () => {

        criarTransacao("Emprestimo",2000)

        cy.contains(".description","Emprestimo") //tabela referencia
        .parent() //tr
        .find('img')// imagem de exclusao
        .click()

        cy.get('tbody tr').should("have.length", 0) //como foi excluido, a lista fica zerada

    });
});


function criarTransacao(descricao, valor){
        cy.contains('Nova Transação').click()
        cy.get('#description').type(descricao)
        cy.get('#amount').type(valor)
        cy.get('#date').type("2023-11-30") //yyyy-mm-dd

        cy.contains('button', 'Salvar').click()
}

function transacaoSaida(descricao, valor){
        cy.contains('Nova Transação').click()
        cy.get('#description').type(descricao)
        cy.get('#amount').type(valor)
        cy.get('#date').type("2023-12-09")

        cy.contains('button','Salvar').click()
}