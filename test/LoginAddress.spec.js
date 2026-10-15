import React, { act } from 'react'
import { createRoot } from 'react-dom/client'

import LoginModal
    from '../src/components/LoginModal.jsx'

import AddressModal
    from '../src/components/AddressModal.jsx'

describe('LoginModal y AddressModal', () => {
    let container
    let root

    function changeInput(input, value) {
        const setter =
            Object.getOwnPropertyDescriptor(
                HTMLInputElement.prototype,
                'value',
            ).set

        act(() => {
            setter.call(input, value)

            input.dispatchEvent(
                new Event('input', {
                    bubbles: true,
                }),
            )
        })
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

    it('LoginModal no debe mostrarse cuando isOpen es false', () => {
        const onClose = jasmine.createSpy('onClose')
        const onLogin = jasmine.createSpy('onLogin')
        const onGuest = jasmine.createSpy('onGuest')

        act(() => {
            root.render(
                React.createElement(LoginModal, {
                    isOpen: false,
                    onClose,
                    onLogin,
                    onGuest,
                }),
            )
        })

        expect(container.innerHTML).toBe('')
    })

    it('LoginModal debe ejecutar onGuest al ingresar como invitado', () => {
        const onClose = jasmine.createSpy('onClose')
        const onLogin = jasmine.createSpy('onLogin')
        const onGuest = jasmine.createSpy('onGuest')

        act(() => {
            root.render(
                React.createElement(LoginModal, {
                    isOpen: true,
                    onClose,
                    onLogin,
                    onGuest,
                }),
            )
        })

        const buttons = Array.from(
            container.querySelectorAll('button'),
        )

        const guestButton = buttons.find(
            (button) =>
                button.textContent.includes(
                    'INGRESAR COMO INVITADO',
                ),
        )

        act(() => {
            guestButton.click()
        })

        expect(onGuest).toHaveBeenCalledTimes(1)
        expect(onLogin).not.toHaveBeenCalled()
    })

    it('LoginModal no debe iniciar sesión si faltan datos', () => {
        const onClose = jasmine.createSpy('onClose')
        const onLogin = jasmine.createSpy('onLogin')
        const onGuest = jasmine.createSpy('onGuest')

        act(() => {
            root.render(
                React.createElement(LoginModal, {
                    isOpen: true,
                    onClose,
                    onLogin,
                    onGuest,
                }),
            )
        })

        const form = container.querySelector('form')

        act(() => {
            form.dispatchEvent(
                new Event('submit', {
                    bubbles: true,
                    cancelable: true,
                }),
            )
        })

        expect(onLogin).not.toHaveBeenCalled()
    })

    it('LoginModal debe limpiar el correo antes de ejecutar onLogin', () => {
        const onClose = jasmine.createSpy('onClose')
        const onLogin = jasmine.createSpy('onLogin')
        const onGuest = jasmine.createSpy('onGuest')

        act(() => {
            root.render(
                React.createElement(LoginModal, {
                    isOpen: true,
                    onClose,
                    onLogin,
                    onGuest,
                }),
            )
        })

        const emailInput =
            container.querySelector('input[type="email"]')

        const passwordInput =
            container.querySelector('input[type="password"]')

        changeInput(
            emailInput,
            '  prueba@correo.cl  ',
        )

        changeInput(
            passwordInput,
            '123456',
        )

        const form = container.querySelector('form')

        act(() => {
            form.dispatchEvent(
                new Event('submit', {
                    bubbles: true,
                    cancelable: true,
                }),
            )
        })

        expect(onLogin).toHaveBeenCalledTimes(1)

        expect(onLogin).toHaveBeenCalledWith(
            'prueba@correo.cl',
        )
    })

    it('AddressModal no debe mostrarse cuando isOpen es false', () => {
        const onClose = jasmine.createSpy('onClose')
        const onConfirm = jasmine.createSpy('onConfirm')

        act(() => {
            root.render(
                React.createElement(AddressModal, {
                    isOpen: false,
                    onClose,
                    initialAddress: '',
                    onConfirm,
                }),
            )
        })

        expect(container.innerHTML).toBe('')
    })

    it('AddressModal debe cargar la dirección inicial', () => {
        const onClose = jasmine.createSpy('onClose')
        const onConfirm = jasmine.createSpy('onConfirm')

        act(() => {
            root.render(
                React.createElement(AddressModal, {
                    isOpen: true,
                    onClose,
                    initialAddress:
                        'Av. Valparaíso 1234',
                    onConfirm,
                }),
            )
        })

        const addressInput =
            container.querySelector('input[type="text"]')

        expect(addressInput.value).toBe(
            'Av. Valparaíso 1234',
        )
    })

    it('AddressModal debe limpiar la dirección antes de confirmar', () => {
        const onClose = jasmine.createSpy('onClose')
        const onConfirm = jasmine.createSpy('onConfirm')

        act(() => {
            root.render(
                React.createElement(AddressModal, {
                    isOpen: true,
                    onClose,
                    initialAddress: '',
                    onConfirm,
                }),
            )
        })

        const addressInput =
            container.querySelector('input[type="text"]')

        changeInput(
            addressInput,
            '  Calle Los Aromos 456  ',
        )

        const form = container.querySelector('form')

        act(() => {
            form.dispatchEvent(
                new Event('submit', {
                    bubbles: true,
                    cancelable: true,
                }),
            )
        })

        expect(onConfirm).toHaveBeenCalledTimes(1)

        expect(onConfirm).toHaveBeenCalledWith(
            'Calle Los Aromos 456',
        )
    })
})