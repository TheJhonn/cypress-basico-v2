// <reference types ="cypress">

describe('Centra de Atendimento ao Cliente ATA', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título de aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    } )

    it('preenche os campos obrigatórios e envia o formulário', function(){

        const longText = 'Teste,teste,testeTeste,teste,testeTeste,teste,testeTeste,teste,testeTeste,teste,teste'
        cy.get('#firstName').type('Jhonatan')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('jhonatan@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Jhonatan')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('jhonatan@exemplo,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-númerico', function(){
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Jhonatan')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('jhonatan@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('reenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Jhonatan')
            .should('have.value', 'Jhonatan')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Rodrigues')
            .should('have.value', 'Rodrigues')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('jhonatan@exemplo.com')
            .should('have.value', 'jhonatan@exemplo.com')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('teste')
            .should('have.value', 'teste')
            .clear()
            .should('have.value', '')
            
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    
    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')

    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Veririca que a politica de privacidade abre em outra aba sem necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página de politica de privacidade remvovendo o target e então clicando no link', function(){
        cy.get('#privacy a')    
            .invoke('removeAttr', 'target')
            .click()
    })


})
