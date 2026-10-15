import { useEffect, useState } from 'react'

function AddressModal({
                          isOpen,
                          onClose,
                          initialAddress,
                          onConfirm,
                      }) {
    const [address, setAddress] = useState('')

    useEffect(() => {
        if (isOpen) {
            setAddress(initialAddress || '')
        }
    }, [isOpen, initialAddress])

    if (!isOpen) {
        return null
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const cleanAddress = address.trim()

        if (!cleanAddress) {
            return
        }

        onConfirm(cleanAddress)
    }

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 3000,
            }}
            onClick={onClose}
        >
            <div
                className="bg-dark text-light border border-secondary rounded p-4 shadow"
                style={{
                    width: '450px',
                    maxWidth: '90%',
                }}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-outline-light btn-sm"
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-secondary mb-2">
                        Ingresa tus datos para el envío
                    </p>

                    <h2 className="text-warning fw-bold mb-4">
                        DIRECCIÓN DE DESPACHO
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ej: Av. Valparaíso 1234, Depto 502"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-warning fw-bold w-100 py-3"
                        >
                            GUARDAR Y CONFIRMAR
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddressModal