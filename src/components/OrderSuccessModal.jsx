function OrderSuccessModal({
                               isOpen,
                               orderNumber,
                               itemCount,
                               total,
                               deliveryType,
                               branch,
                               address,
                               userEmail,
                               onContinue,
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
        >
            <div
                className="bg-dark text-light border border-secondary rounded p-4 shadow text-center"
                style={{
                    width: '480px',
                    maxWidth: '90%',
                }}
            >
                <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-warning text-dark rounded-circle fw-bold"
                    style={{
                        width: '60px',
                        height: '60px',
                        fontSize: '30px',
                    }}
                >
                    ✓
                </div>

                <h2 className="text-warning fw-bold">
                    PEDIDO REGISTRADO
                </h2>

                <p className="fs-5">
                    N° <strong>{orderNumber}</strong>
                </p>

                <div className="border-top border-bottom border-secondary py-3 my-4">
                    <div className="d-flex justify-content-between mb-2">
                        <span>Productos</span>
                        <strong>
                            {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
                        </strong>
                    </div>

                    <div className="d-flex justify-content-between">
                        <span>Total</span>
                        <strong className="text-warning">
                            ${total.toLocaleString('es-CL')}
                        </strong>
                    </div>
                </div>

                {deliveryType === 'pickup' && (
                    <p>
                        ¡Pedido listo para retiro! Te contactaremos a{' '}
                        <strong>{userEmail || 'tu correo'}</strong> cuando tu bajón
                        esté listo en:
                        <br />
                        <strong className="text-warning">
                            {branch}
                            <br />
                            🕐 Lunes a Domingo
                            <br />
                            12:00 - 23:00
                        </strong>
                    </p>
                )}

                {deliveryType === 'delivery' && (
                    <p>
                        Te contactaremos a{' '}
                        <strong>{userEmail}</strong> para coordinar el despacho a:
                        <br />
                        <strong className="text-warning">
                            {address}
                        </strong>
                    </p>
                )}

                <button
                    type="button"
                    className="btn btn-warning fw-bold w-100 mt-3"
                    onClick={onContinue}
                >
                    Seguir comprando
                </button>
            </div>
        </div>
    )
}

export default OrderSuccessModal