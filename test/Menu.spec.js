import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import Menu from '../src/components/Menu.jsx'

describe('Menu', () => {
    let container
    let root

    const testImage =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

    const products = [
        {
            id: 'prod-1',
            name: 'COMBO PRUEBA',
            description: 'Hamburguesa para prueba.',
            price: 8990,
            category: 'hamburguesas',
            image: testImage,
            stock: true,
        },
        {
            id: 'prod-2',
            name: 'PAPAS PRUEBA',
            description: 'Acompañamiento para prueba.',
            price: 2990,
            category: 'acompanamientos',
            image: testImage,
            stock: true,
        },
        {
            id: 'prod-3',
            name: 'BEBIDA PRUEBA',
            description: 'Bebida para prueba.',
            price: 1500,
            category: 'bebidas',
            image: testImage,
            stock: true,
        },
    ]

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

    it('debe mostrar hamburguesas como categoría inicial', () => {
        const onAddToCart = jasmine.createSpy('onAddToCart')

        act(() => {
            root.render(
                React.createElement(Menu, {
                    products,
                    onAddToCart,
                }),
            )
        })

        expect(container.textContent).toContain('COMBO PRUEBA')
        expect(container.textContent).not.toContain('PAPAS PRUEBA')
        expect(container.textContent).not.toContain('BEBIDA PRUEBA')
    })

    it('debe cambiar a la categoría bebidas al presionar su botón', () => {
        const onAddToCart = jasmine.createSpy('onAddToCart')

        act(() => {
            root.render(
                React.createElement(Menu, {
                    products,
                    onAddToCart,
                }),
            )
        })

        const buttons = Array.from(
            container.querySelectorAll('button'),
        )

        const drinksButton = buttons.find(
            (button) => button.textContent.trim() === 'Bebidas',
        )

        act(() => {
            drinksButton.click()
        })

        expect(container.textContent).toContain('BEBIDA PRUEBA')
        expect(container.textContent).not.toContain('COMBO PRUEBA')
        expect(container.textContent).not.toContain('PAPAS PRUEBA')
    })

    it('debe enviar el producto seleccionado mediante onAddToCart', () => {
        const onAddToCart = jasmine.createSpy('onAddToCart')

        act(() => {
            root.render(
                React.createElement(Menu, {
                    products,
                    onAddToCart,
                }),
            )
        })

        const buttons = Array.from(
            container.querySelectorAll('button'),
        )

        const addButton = buttons.find(
            (button) => button.textContent.includes('AGREGAR'),
        )

        act(() => {
            addButton.click()
        })

        expect(onAddToCart).toHaveBeenCalledTimes(1)
        expect(onAddToCart).toHaveBeenCalledWith(products[0])
    })
})