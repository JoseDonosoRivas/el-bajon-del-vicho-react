import App from '../src/App.jsx'

describe('Cobertura general de la aplicación', () => {
    it('debe cargar correctamente el componente principal App', () => {
        expect(App).toBeDefined()
    })
})