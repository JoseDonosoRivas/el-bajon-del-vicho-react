import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import Cart from '../src/components/Cart.jsx'

describe('Cart', () => {
    let container
    let root

    const cart = [
        {
            id: 'prod-1',
            name: 'COMBO PRUEBA',
            price: 8990,
            quantity: 2,
        },
        {
            id: 'prod-2',
            name: 'BEBIDA PRUEBA',
            price: 1500,
            quantity: 1,
        },
    ]

    const createProps = (customProps = {}) => ({
        cart,
        isOpen: true,
        onClose: jasmine.createSpy('onClose'),
        onIncrease: jasmine.createSpy('onIncrease'),
        onDecrease: jasmine.createSpy('onDecrease'),
        onRemove: jasmine.createSpy('onRemove'),
        onConfirm: jasmine.createSpy('onConfirm'),
        ...customProps,
    })

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

    it('debe mostrar un mensaje cuando el carrito está vacío', () => {
        const props = createProps({
            cart: [],
        })

        act(() => {
            root.render(
                React.createElement(Cart, props),
            )
        })

        expect(container.textContent).toContain(
            'Tu carrito está vacío',
        )

        expect(container.textContent).toContain(
            'Agrega productos desde el menú.',
        )
    })

    it('debe calcular y mostrar correctamente el total del carrito', () => {
        const props = createProps()

        act(() => {
            root.render(
                React.createElement(Cart, props),
            )
        })

        /*
          COMBO:
          8.990 x 2 = 17.980

          BEBIDA:
          1.500 x 1 = 1.500

          TOTAL:
          19.480
        */

        expect(container.textContent).toContain(
            '$19.480',
        )
    })

    it('debe ejecutar onIncrease con el id correcto al aumentar cantidad', () => {
        const props = createProps()

        act(() => {
            root.render(
                React.createElement(Cart, props),
            )
        })

        const buttons = Array.from(
            container.querySelectorAll('button'),
        )

        const increaseButton = buttons.find(
            (button) =>
                button.textContent.trim() === '+',
        )

        expect(increaseButton).not.toBeUndefined()

        act(() => {
            increaseButton.click()
        })

        expect(
            props.onIncrease,
        ).toHaveBeenCalledTimes(1)

        expect(
            props.onIncrease,
        ).toHaveBeenCalledWith('prod-1')
    })

    it('debe ejecutar onConfirm al confirmar el pedido', () => {
        const props = createProps()

        act(() => {
            root.render(
                React.createElement(Cart, props),
            )
        })

        const buttons = Array.from(
            container.querySelectorAll('button'),
        )

        const confirmButton = buttons.find(
            (button) =>
                button.textContent
                    .trim()
                    .includes('Confirmar pedido'),
        )

        expect(confirmButton).not.toBeUndefined()

        act(() => {
            confirmButton.click()
        })

        expect(
            props.onConfirm,
        ).toHaveBeenCalledTimes(1)
    })
})