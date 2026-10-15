function Cart({
                  cart,
                  isOpen,
                  onClose,
                  onIncrease,
                  onDecrease,
                  onRemove,
                  onConfirm,
              }) {
    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    )

    return (
        <aside
            className={`position-fixed top-0 end-0 h-100 bg-dark text-light shadow p-4 ${
                isOpen ? 'd-block' : 'd-none'
            }`}
            style={{
                width: '380px',
                maxWidth: '100%',
                zIndex: 2000,
                overflowY: 'auto',
            }}
        >
            {/* ENCABEZADO */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-warning fw-bold mb-0">
                    TU PEDIDO
                </h2>

                <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={onClose}
                    aria-label="Cerrar carrito"
                >
                    ×
                </button>
            </div>

            {/* CARRITO VACÍO */}
            {cart.length === 0 ? (
                <div className="text-center py-5">
                    <h3 className="h5">
                        Tu carrito está vacío
                    </h3>

                    <p className="text-secondary">
                        Agrega productos desde el menú.
                    </p>

                    <a
                        href="#menu"
                        className="btn btn-warning fw-bold mt-3"
                        onClick={onClose}
                    >
                        Ver el menú
                    </a>
                </div>
            ) : (
                <>
                    {/* PRODUCTOS */}
                    <div className="d-flex flex-column gap-3">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="border-bottom border-secondary pb-3"
                            >
                                <div className="d-flex justify-content-between gap-3">
                                    <div>
                                        <strong className="text-warning">
                                            {item.name}
                                        </strong>

                                        <p className="mb-2 text-secondary">
                                            Cantidad: {item.quantity}
                                        </p>

                                        {/* CONTROLES DE CANTIDAD */}
                                        <div className="d-flex align-items-center gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-warning btn-sm"
                                                onClick={() => onDecrease(item.id)}
                                            >
                                                −
                                            </button>

                                            <span className="fw-bold">
                        {item.quantity}
                      </span>

                                            <button
                                                type="button"
                                                className="btn btn-warning btn-sm"
                                                onClick={() => onIncrease(item.id)}
                                            >
                                                +
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-light btn-sm ms-2"
                                                onClick={() => onRemove(item.id)}
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </div>

                                    {/* PRECIO POR CANTIDAD */}
                                    <strong>
                                        $
                                        {(item.price * item.quantity).toLocaleString(
                                            'es-CL',
                                        )}
                                    </strong>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RESUMEN */}
                    <div className="mt-4 pt-3">
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>

                            <strong>
                                ${subtotal.toLocaleString('es-CL')}
                            </strong>
                        </div>

                        <div className="d-flex justify-content-between mt-2 fs-5">
                            <strong>Total</strong>

                            <strong className="text-warning">
                                ${subtotal.toLocaleString('es-CL')}
                            </strong>
                        </div>

                        <button
                            type="button"
                            className="btn btn-warning fw-bold w-100 mt-4"
                            onClick={onConfirm}
                        >
                            Confirmar pedido
                        </button>
                    </div>
                </>
            )}
        </aside>
    )
}

export default Cart