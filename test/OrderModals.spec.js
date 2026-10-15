import React, { act } from 'react'
import { createRoot } from 'react-dom/client'

import DeliveryOptionsModal
    from '../src/components/DeliveryOptionsModal.jsx'

import PickupBranchModal
    from '../src/components/PickupBranchModal.jsx'

describe('Modales de pedido', () => {
    let container
    let root

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

    it('DeliveryOptionsModal no debe mostrarse cuando isOpen es false', () => {
        const onClose = jasmine.createSpy('onClose')
        const onDelivery = jasmine.createSpy('onDelivery')
        const onPickup = jasmine.createSpy('onPickup')

        act(() => {
            root.render(
                React.createElement(DeliveryOptionsModal, {
                    isOpen: false,
                    onClose,
                    onDelivery,
                    onPickup,
                }),
            )
        })

        expect(container.innerHTML).toBe('')
    })

    it('DeliveryOptionsModal debe ejecutar onDelivery al elegir despacho', () => {
        const onClose = jasmine.createSpy('onClose')
        const onDelivery = jasmine.createSpy('onDelivery')
        const onPickup = jasmine.createSpy('onPickup')

        act(() => {
            root.render(
                React.createElement(DeliveryOptionsModal, {
                    isOpen: true,
                    onClose,
                    onDelivery,
                    onPickup,
                }),
            )
        })

        const buttons = Array.from(
            container.querySelectorAll('button'),
        )

        const deliveryButton = buttons.find(
            (button) =>
                button.textContent.includes('DESPACHO A DOMICILIO'),
        )

        act(() => {
            deliveryButton.click()
        })

        expect(onDelivery).toHaveBeenCalledTimes(1)
        expect(onPickup).not.toHaveBeenCalled()
    })

    it('DeliveryOptionsModal debe ejecutar onPickup al elegir retiro', () => {
        const onClose = jasmine.createSpy('onClose')
        const onDelivery = jasmine.createSpy('onDelivery')
        const onPickup = jasmine.createSpy('onPickup')

        act(() => {
            root.render(
                React.createElement(DeliveryOptionsModal, {
                    isOpen: true,
                    onClose,
                    onDelivery,
                    onPickup,
                }),
            )
        })

        const buttons = Array.from(
            container.querySelectorAll('button'),
        )

        const pickupButton = buttons.find(
            (button) =>
                button.textContent.includes('RETIRO EN TIENDA'),
        )

        act(() => {
            pickupButton.click()
        })

        expect(onPickup).toHaveBeenCalledTimes(1)
        expect(onDelivery).not.toHaveBeenCalled()
    })

    it('PickupBranchModal no debe mostrarse cuando isOpen es false', () => {
        const onClose = jasmine.createSpy('onClose')
        const onSelectBranch =
            jasmine.createSpy('onSelectBranch')

        act(() => {
            root.render(
                React.createElement(PickupBranchModal, {
                    isOpen: false,
                    onClose,
                    onSelectBranch,
                }),
            )
        })

        expect(container.innerHTML).toBe('')
    })

    it('PickupBranchModal debe seleccionar Puente Alto', () => {
        const onClose = jasmine.createSpy('onClose')
        const onSelectBranch =
            jasmine.createSpy('onSelectBranch')

        act(() => {
            root.render(
                React.createElement(PickupBranchModal, {
                    isOpen: true,
                    onClose,
                    onSelectBranch,
                }),
            )
        })

        const buttons = Array.from(
            container.querySelectorAll('button'),
        )

        const branchButton = buttons.find(
            (button) =>
                button.textContent.includes('PUENTE ALTO'),
        )

        act(() => {
            branchButton.click()
        })

        expect(
            onSelectBranch,
        ).toHaveBeenCalledTimes(1)

        expect(
            onSelectBranch,
        ).toHaveBeenCalledWith('Puente Alto')
    })
})