describe.only('Test Model Test with Single Locale', () => {
  it.only('can create a Test Model in a single locale', () => {

    cy.request('post', 'nova/login', {
      'email': 'test@example.com',
      'password': 'test',
      'remember': true,
    });
    cy.wait(500);

    cy.visit('/nova/resources/test-models/new').contains('Create Test Model');
    cy.get('[translatable-locale="en"] #name-create-test-model-translatable-field').type('Hello');
    cy.contains('button', 'Create Test Model').click();

    cy.get('.success').contains('The test model was created!');
    cy.contains('h1', 'Test Model Details');

    cy.get('[translatable-locale="en"]').contains('Hello');

    cy.php(`
        App\\Models\\TestModel::latest('id')->first();
    `).then(TestModel => {
      expect(TestModel.name.en).to.equal('Hello');
      expect(TestModel.name.es).to.equal('');
    });

  });
});

describe.only('Test Model Test with Multiple Locales', () => {
  it.only('can create a Test Model in a multiple locale', () => {

    cy.request('post', 'nova/login', {
      'email': 'test@example.com',
      'password': 'test',
      'remember': true,
    });
    cy.wait(500);

    cy.visit('/nova/resources/test-models/new').contains('Create Test Model');
    cy.get('[translatable-locale="en"] #name-create-test-model-translatable-field').type('Hello');

    cy.contains('a', 'Spanish').click();

    cy.get('[translatable-locale="es"] #name-create-test-model-translatable-field').type('Hola');
    cy.contains('button', 'Create Test Model').click();

    cy.get('.success').contains('The test model was created!');
    cy.contains('h1', 'Test Model Details');

    cy.get('[translatable-locale="en"] p').should('have.text', 'Hello');

    cy.contains('a', 'Spanish').click();

    cy.get('[translatable-locale="es"] p').should('have.text', 'Hola');

    cy.php(`
        App\\Models\\TestModel::latest('id')->first();
    `).then(TestModel => {
      expect(TestModel.name.en).to.equal('Hello');
      expect(TestModel.name.es).to.equal('Hola');
    });

  });
});


describe.only('Test Model Repeatable Fields with Locales Work', () => {
  it.only('can create a Test Model with repeated fields in a multiple locale', () => {

    cy.request('post', 'nova/login', {
      'email': 'test@example.com',
      'password': 'test',
      'remember': true,
    });
    cy.wait(500);

    cy.visit('/nova/resources/test-model-repeatables/new').contains('Create Test Model Repeatable');

    cy.get('.add-button').click();
    cy.get('.add-button').click();
    cy.get('.add-button').click();

    cy.get('.simple-repeatable-row:nth-child(1) [translatable-locale="en"] #key-default-translatable-field').type('0');
    cy.get('.simple-repeatable-row:nth-child(2) [translatable-locale="en"] #key-default-translatable-field').type('1');
    cy.get('.simple-repeatable-row:nth-child(3) [translatable-locale="en"] #key-default-translatable-field').type('English');

    cy.contains('a', 'Spanish').click();

    cy.get('.simple-repeatable-row:nth-child(1) [translatable-locale="es"] #key-default-translatable-field').type('0');
    cy.get('.simple-repeatable-row:nth-child(2) [translatable-locale="es"] #key-default-translatable-field').type('1');
    cy.get('.simple-repeatable-row:nth-child(3) [translatable-locale="es"] #key-default-translatable-field').type('Spanish');

    cy.contains('button', 'Create Test Model Repeatable').click();

    cy.get('.success').contains('The test model repeatable was created!');

    /**
     * Validate model was saved to the DB as expected....
     */
    cy.php(`
        App\\Models\\TestModelRepeatable::latest('id')->first();
    `).then(TestModel => {
      // Assert english:
      expect(TestModel.name[0].key.en).to.equal('0');
      expect(TestModel.name[1].key.en).to.equal('1');
      expect(TestModel.name[2].key.en).to.equal('English');

      // Assert spanish:
      expect(TestModel.name[0].key.es).to.equal('0');
      expect(TestModel.name[1].key.es).to.equal('1');
      expect(TestModel.name[2].key.es).to.equal('Spanish');
    });

    /**
     * Validate rendered values are correct...
     */
    cy.get('.simple-repeatable-table-row:nth-child(1) [translatable-locale="en"] p').should('have.text', '0');
    cy.get('.simple-repeatable-table-row:nth-child(2) [translatable-locale="en"] p').should('have.text', '1');
    cy.get('.simple-repeatable-table-row:nth-child(3) [translatable-locale="en"] p').should('have.text', 'English');
  });
});

