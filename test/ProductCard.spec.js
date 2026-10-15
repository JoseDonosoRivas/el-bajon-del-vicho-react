import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import ProductCard from '../src/components/ProductCard.jsx'

describe('ProductCard', () => {
    let container
    let root

    const baseProduct = {
        id: 'prod-test',
        name: 'COMBO TEST',
        description: 'Producto creado para pruebas.',
        price: 8990,
        category: 'hamburguesas',

        // Imagen mínima embebida para no depender de archivos externos.
        image:
            'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',

        stock: true,
    }

    beforeEach(() => {
        globalThis.IS_REACT_ACT_ENVIRONMENT = true

        container = document.createElement('div')
        document.body.appendChild(container)

        root = createRoot(container)
    })

    afterEach(() => {
        act(() => {
            root.unmount()
        })

        container.remove()
    })

    it('debe mostrar el nombre y precio del producto', () => {
        const onAdd = jasmine.createSpy('onAdd')

        act(() => {
            root.render(
                React.createElement(ProductCard, {
                    product: baseProduct,
                    onAdd,
                }),
            )
        })

        expect(container.textContent).toContain('COMBO TEST')
        expect(container.textContent).toContain('$8.990')
    })

    it('debe ejecutar onAdd al presionar el botón agregar', () => {
        const onAdd = jasmine.createSpy('onAdd')

        act(() => {
            root.render(
                React.createElement(ProductCard, {
                    product: baseProduct,
                    onAdd,
                }),
            )
        })

        const button = container.querySelector('button')

        act(() => {
            button.click()
        })

        expect(onAdd).toHaveBeenCalledTimes(1)
        expect(onAdd).toHaveBeenCalledWith(baseProduct)
    })

    it('debe deshabilitar la compra cuando el producto está agotado', () => {
        const onAdd = jasmine.createSpy('onAdd')

        const outOfStockProduct = {
            ...baseProduct,
            stock: false,
        }

        act(() => {
            root.render(
                React.createElement(ProductCard, {
                    product: outOfStockProduct,
                    onAdd,
                }),
            )
        })

        const button = container.querySelector('button')

        expect(button.disabled).toBeTrue()
        expect(button.textContent).toContain('AGOTADO')

        act(() => {
            button.click()
        })

        expect(onAdd).not.toHaveBeenCalled()
    })
})