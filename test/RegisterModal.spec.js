import React, { act } from 'react'
import { createRoot } from 'react-dom/client'

import RegisterModal
    from '../src/components/RegisterModal.jsx'


describe('RegisterModal', () => {
    let container
    let root

    function changeValue(element, value) {
        const setter =
            Object.getOwnPropertyDescriptor(
                HTMLInputElement.prototype,
                'value',
            ).set

        act(() => {
            setter.call(element, value)

            element.dispatchEvent(
                new Event('input', {
                    bubbles: true,
                }),
            )
        })
    }

    function submitForm() {
        const form =
            container.querySelector('form')

        act(() => {
            form.dispatchEvent(
                new Event('submit', {
                    bubbles: true,
                    cancelable: true,
                }),
            )
        })
    }

    beforeEach(() => {
        globalThis.IS_REACT_ACT_ENVIRONMENT = true

        container =
            document.createElement('div')

        document.body.appendChild(container)

        root = createRoot(container)
    })

    afterEach(() => {
        act(() => {
            root.unmount()
        })

        container.remove()
    })

    it('no debe mostrarse cuando isOpen es false', () => {
        const onClose =
            jasmine.createSpy('onClose')

        const onRegister =
            jasmine.createSpy('onRegister')

        act(() => {
            root.render(
                React.createElement(
                    RegisterModal,
                    {
                        isOpen: false,
                        onClose,
                        onRegister,
                    },
                ),
            )
        })

        expect(container.innerHTML).toBe('')
    })

    it('debe rechazar contraseñas que no coinciden', () => {
        const onClose =
            jasmine.createSpy('onClose')

        const onRegister =
            jasmine.createSpy('onRegister')

        act(() => {
            root.render(
                React.createElement(
                    RegisterModal,
                    {
                        isOpen: true,
                        onClose,
                        onRegister,
                    },
                ),
            )
        })

        changeValue(
            container.querySelector('#registerName'),
            'Jose Prueba',
        )

        changeValue(
            container.querySelector('#registerEmail'),
            'jose@test.cl',
        )

        changeValue(
            container.querySelector('#registerPassword'),
            '123456',
        )

        changeValue(
            container.querySelector(
                '#registerConfirmPassword',
            ),
            '654321',
        )

        submitForm()

        expect(container.textContent).toContain(
            'Las contraseñas no coinciden.',
        )

        expect(
            onRegister,
        ).not.toHaveBeenCalled()
    })

    it('debe rechazar una contraseña menor a 6 caracteres', () => {
        const onClose =
            jasmine.createSpy('onClose')

        const onRegister =
            jasmine.createSpy('onRegister')

        act(() => {
            root.render(
                React.createElement(
                    RegisterModal,
                    {
                        isOpen: true,
                        onClose,
                        onRegister,
                    },
                ),
            )
        })

        changeValue(
            container.querySelector('#registerName'),
            'Jose Prueba',
        )

        changeValue(
            container.querySelector('#registerEmail'),
            'jose@test.cl',
        )

        changeValue(
            container.querySelector('#registerPassword'),
            '123',
        )

        changeValue(
            container.querySelector(
                '#registerConfirmPassword',
            ),
            '123',
        )

        submitForm()

        expect(container.textContent).toContain(
            'La contraseña debe tener al menos 6 caracteres.',
        )

        expect(
            onRegister,
        ).not.toHaveBeenCalled()
    })

    it('debe enviar nombre y correo limpios al registrar una cuenta válida', () => {
        const onClose =
            jasmine.createSpy('onClose')

        const onRegister =
            jasmine
                .createSpy('onRegister')
                .and.returnValue(true)

        act(() => {
            root.render(
                React.createElement(
                    RegisterModal,
                    {
                        isOpen: true,
                        onClose,
                        onRegister,
                    },
                ),
            )
        })

        changeValue(
            container.querySelector('#registerName'),
            '  Jose Prueba  ',
        )

        changeValue(
            container.querySelector('#registerEmail'),
            '  JOSE@TEST.CL  ',
        )

        changeValue(
            container.querySelector('#registerPassword'),
            '123456',
        )

        changeValue(
            container.querySelector(
                '#registerConfirmPassword',
            ),
            '123456',
        )

        submitForm()

        expect(
            onRegister,
        ).toHaveBeenCalledTimes(1)

        expect(
            onRegister,
        ).toHaveBeenCalledWith({
            name: 'Jose Prueba',
            email: 'jose@test.cl',
        })
    })

    it('debe informar cuando el correo ya está registrado', () => {
        const onClose =
            jasmine.createSpy('onClose')

        const onRegister =
            jasmine
                .createSpy('onRegister')
                .and.returnValue(false)

        act(() => {
            root.render(
                React.createElement(
                    RegisterModal,
                    {
                        isOpen: true,
                        onClose,
                        onRegister,
                    },
                ),
            )
        })

        changeValue(
            container.querySelector('#registerName'),
            'Jose',
        )

        changeValue(
            container.querySelector('#registerEmail'),
            'jose@test.cl',
        )

        changeValue(
            container.querySelector('#registerPassword'),
            '123456',
        )

        changeValue(
            container.querySelector(
                '#registerConfirmPassword',
            ),
            '123456',
        )

        submitForm()

        expect(
            onRegister,
        ).toHaveBeenCalledTimes(1)

        expect(container.textContent).toContain(
            'El correo ingresado ya se encuentra registrado.',
        )
    })
})