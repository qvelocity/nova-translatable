describe.only('Text Field Test with Single Locale', () => {
  it.only('can create a text field in a single locale', () => {

    cy.request('post', 'nova/login', {
      'email': 'test@example.com',
      'password': 'test',
      'remember': true,
    });
    cy.wait(500);

    cy.visit('/nova/resources/text-fields/new').contains('Create Text Field');
    cy.get('[translatable-locale="en"] #name-create-text-field-translatable-field').type('Hello');
    cy.contains('button', 'Create Text Field').click();

    cy.get('.success').contains('The text field was created!');
    cy.contains('h1', 'Text Field Details');

    cy.get('[translatable-locale="en"]').contains('Hello');

    cy.php(`
        App\\Models\\TextField::latest('id')->first();
    `).then(textField => {
      expect(textField.name.en).to.equal('Hello');
      expect(textField.name.es).to.equal('')
    });

  });
});

describe.only('Text Field Test with Multiple Locales', () => {
  it.only('can create a text field in a multiple locale', () => {

    cy.request('post', 'nova/login', {
      'email': 'test@example.com',
      'password': 'test',
      'remember': true,
    });
    cy.wait(500);

    cy.visit('/nova/resources/text-fields/new').contains('Create Text Field');
    cy.get('[translatable-locale="en"] #name-create-text-field-translatable-field').type('Hello');

    cy.contains('a', 'Spanish').click();

    cy.get('[translatable-locale="es"] #name-create-text-field-translatable-field').type('Hola');
    cy.contains('button', 'Create Text Field').click();

    cy.get('.success').contains('The text field was created!');
    cy.contains('h1', 'Text Field Details');

    cy.get('[translatable-locale="en"] p').should('have.text', 'Hello');

    cy.contains('a', 'Spanish').click();

    cy.get('[translatable-locale="es"] p').should('have.text', 'Hola');

    cy.php(`
        App\\Models\\TextField::latest('id')->first();
    `).then(textField => {
      expect(textField.name.en).to.equal('Hello');
      expect(textField.name.es).to.equal('Hola');
    });

  });
});
