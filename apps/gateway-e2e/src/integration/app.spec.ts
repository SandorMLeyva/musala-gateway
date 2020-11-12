import { getPage, getHeader } from '../support/app.po';

describe('Check basics', () => {
  before(() => cy.visit('/'));
  it('should display the header', () => {
    getHeader().should('exist');
  });
});

describe('Gateway flow', () => {
  before(() => cy.visit('/'));

  it('should exist add gateways', () => {
    getPage().get("[aria-label='add']").should('exist');
  });
  it('should show modal', () => {
    getPage().get("[aria-label='add']").click().should('exist');
  });
  it('should add gateway', () => {
    getPage()
      .get("[name='serial']")
      .should('exist')
      .type('TEST3')
      .get("[name='ipv4Address']")
      .should('exist')
      .type('192.168.4.4')
      .get("[name='name']")
      .should('exist')
      .type('Cypress')
      .get('form')
      .submit();
  });

  it('should show gateway detail', () => {
    getPage().get("[aria-label='TEST3']").click();
  });

  it('should show edit gateway', () => {
    getPage().get("[aria-label='edit']").click();
  });
  it('should edit gateway', () => {
    getPage()
      .get("[name='serial']")
      .should('exist')
      .clear()
      .type('TEST3')
      .get("[name='ipv4Address']")
      .should('exist')
      .clear()
      .type('192.168.4.1')
      .get("[name='name']")
      .should('exist')
      .clear()
      .type('CypressUpdated')
      .get('form')
      .submit();
  });
  it('should delete gateway', () => {
    getPage().get("[aria-label='delete-gateway']").click();
  });
});

describe('Peripheral flow', () => {
  before(() => cy.visit('/'));

  it('create gateway', () => {
    getPage()
      .get("[aria-label='add']")
      .click()
      .get("[name='serial']")
      .type('XCVBN')
      .get("[name='ipv4Address']")
      .type('192.168.4.4')
      .get("[name='name']")
      .type('Cypress')
      .get('form')
      .submit()
      .get("[aria-label='XCVBN']")
      .click();
  });

  it('should create peripheral', () => {
    getPage()
      .get("[aria-label='add']")
      .click()
      .should('exist')
      .get("[name='uid']")
      .should('exist')
      .type('123456')
      .get("[name='vendor']")
      .should('exist')
      .type('Test-Vendor')
      .get('form')
      .submit();
  });

  it('should create 9 peripheral', () => {
    for (let i = 0; i < 9; i++) {
      getPage()
        .get("[aria-label='add']")
        .click()
        .get("[name='uid']")
        .type('123456')
        .get("[name='vendor']")
        .type('Test-Vendor')
        .get('form')
        .submit();
    }
  });

  it('should hide add button   peripheral', () => {
    getPage()
    .get("[aria-label='add']")
    .should('not.exist');
  });

  it('should delete gateway', () => {
    getPage().get("[aria-label='delete-gateway']").click();
  });
});
