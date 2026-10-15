import React, { act } from 'react'
import { createRoot } from 'react-dom/client'

import ReservationSection
    from '../src/components/ReservationSection.jsx'

describe('ReservationSection', () => {
    let container
    let root

    function changeValue(element, value) {
        const prototype =
            element instanceof HTMLSelectElement
                ? HTMLSelectElement.prototype
                : HTMLInputElement.prototype

        const setter =
            Object.getOwnPropertyDescriptor(
                prototype,
                'value',
            ).set

        act(() => {
            setter.call(element, value)

            element.dispatchEvent(
                new Event('input', {
                    bubbles: true,
                }),
            )

            element.dispatchEvent(
                new Event('change', {
                    bubbles: true,
                }),
            )
        })
    }

    function completeReservationForm() {
        const people =
            container.querySelector('#people')

        const date =
            container.querySelector('#date')

        const time =
            container.querySelector('#time')

        const branch =
            container.querySelector('#branch')

        changeValue(people, '4')
        changeValue(date, '2026-10-20')
        changeValue(time, '19:30')
        changeValue(
            branch,
            'Sucursal Puente Alto',
        )
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

        localStorage.clear()

        container = document.createElement('div')
        document.body.appendChild(container)

        root = createRoot(container)
    })

    afterEach(() => {
        act(() => {
            root.unmount()
        })

        container.remove()
        localStorage.clear()
    })

    it('debe solicitar inicio de sesión cuando no existe un usuario autenticado', () => {
        const onRequireLogin =
            jasmine.createSpy('onRequireLogin')

        const alertSpy =
            spyOn(window, 'alert')

        act(() => {
            root.render(
                React.createElement(
                    ReservationSection,
                    {
                        userEmail: null,
                        onRequireLogin,
                    },
                ),
            )
        })

        submitForm()

        expect(alertSpy).toHaveBeenCalledTimes(1)

        expect(
            onRequireLogin,
        ).toHaveBeenCalledTimes(1)

        expect(
            localStorage.getItem(
                'bajon_db_reservas',
            ),
        ).toBeNull()
    })

    it('debe rechazar una reserva incompleta aunque el usuario esté autenticado', () => {
        const onRequireLogin =
            jasmine.createSpy('onRequireLogin')

        const alertSpy =
            spyOn(window, 'alert')

        act(() => {
            root.render(
                React.createElement(
                    ReservationSection,
                    {
                        userEmail: 'cliente@correo.cl',
                        onRequireLogin,
                    },
                ),
            )
        })

        submitForm()

        expect(alertSpy).toHaveBeenCalledTimes(1)

        expect(
            onRequireLogin,
        ).not.toHaveBeenCalled()

        expect(
            localStorage.getItem(
                'bajon_db_reservas',
            ),
        ).toBeNull()
    })

    it('debe guardar correctamente una reserva válida en localStorage', () => {
        const onRequireLogin =
            jasmine.createSpy('onRequireLogin')

        act(() => {
            root.render(
                React.createElement(
                    ReservationSection,
                    {
                        userEmail: 'cliente@correo.cl',
                        onRequireLogin,
                    },
                ),
            )
        })

        completeReservationForm()
        submitForm()

        const reservations =
            JSON.parse(
                localStorage.getItem(
                    'bajon_db_reservas',
                ),
            )

        expect(reservations.length).toBe(1)

        expect(reservations[0]).toEqual({
            correo: 'cliente@correo.cl',
            personas: 4,
            fecha: '2026-10-20',
            hora: '19:30',
            sucursal: 'Sucursal Puente Alto',
        })

        expect(container.textContent).toContain(
            'Reserva confirmada para cliente@correo.cl.',
        )
    })

    it('debe reemplazar un valor inválido de localStorage por un arreglo de reservas', () => {
        localStorage.setItem(
            'bajon_db_reservas',
            JSON.stringify({
                dato: 'invalido',
            }),
        )

        const onRequireLogin =
            jasmine.createSpy('onRequireLogin')

        act(() => {
            root.render(
                React.createElement(
                    ReservationSection,
                    {
                        userEmail: 'cliente@correo.cl',
                        onRequireLogin,
                    },
                ),
            )
        })

        completeReservationForm()
        submitForm()

        const reservations =
            JSON.parse(
                localStorage.getItem(
                    'bajon_db_reservas',
                ),
            )

        expect(
            Array.isArray(reservations),
        ).toBeTrue()

        expect(reservations.length).toBe(1)

        expect(reservations[0].correo).toBe(
            'cliente@correo.cl',
        )
    })

    it('debe manejar un error cuando localStorage contiene JSON inválido', () => {
        localStorage.setItem(
            'bajon_db_reservas',
            'esto-no-es-json',
        )

        const onRequireLogin =
            jasmine.createSpy('onRequireLogin')

        const alertSpy =
            spyOn(window, 'alert')

        const consoleSpy =
            spyOn(console, 'error')

        act(() => {
            root.render(
                React.createElement(
                    ReservationSection,
                    {
                        userEmail: 'cliente@correo.cl',
                        onRequireLogin,
                    },
                ),
            )
        })

        completeReservationForm()
        submitForm()

        expect(
            consoleSpy,
        ).toHaveBeenCalled()

        expect(
            alertSpy,
        ).toHaveBeenCalledTimes(1)

        expect(container.textContent).not.toContain(
            'Reserva confirmada para',
        )
    })
})