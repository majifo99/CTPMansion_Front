describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login') // Ajusta esta ruta según la URL de tu formulario de login
  })

  it('should display login form', () => {
    cy.get('form').should('exist')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.contains('button', /iniciar sesión|login/i).should('exist')
  })

  it('should show error with invalid credentials', () => {
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.contains('button', /iniciar sesión|login/i).click()
    
    // Ajusta este selector según cómo se muestran los errores en tu aplicación
    cy.contains(/error|credenciales inválidas|incorrect/i, { timeout: 5000 }).should('exist')
  })

  // Puedes añadir más pruebas aquí
})