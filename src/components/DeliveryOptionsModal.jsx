function DeliveryOptionsModal({
                                  isOpen,
                                  onClose,
                                  onDelivery,
                                  onPickup,
                              }) {
    if (!isOpen) {
        return null
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
                        ¿Cómo quieres recibir tu bajón?
                    </p>

                    <h2 className="text-warning fw-bold mb-4">
                        TIPO DE ENTREGA
                    </h2>

                    <div className="d-grid gap-3">
                        <button
                            type="button"
                            className="btn btn-warning fw-bold py-3"
                            onClick={onDelivery}
                        >
                            DESPACHO A DOMICILIO
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-warning fw-bold py-3"
                            onClick={onPickup}
                        >
                            RETIRO EN TIENDA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryOptionsModal