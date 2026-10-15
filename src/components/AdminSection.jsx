import { useEffect, useState } from 'react'

function loadReservations() {
    try {
        const saved = localStorage.getItem('bajon_db_reservas')

        if (!saved) {
            return []
        }

        const parsed = JSON.parse(saved)

        return Array.isArray(parsed) ? parsed : []
    } catch (error) {
        console.error('Error al cargar reservas:', error)
        return []
    }
}

function AdminSection({
                          products,
                          onSaveProduct,
                          onToggleStock,
                      }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem('adminAuth') === 'true',
    )

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reservations, setReservations] = useState(loadReservations)
    const [drafts, setDrafts] = useState({})

    useEffect(() => {
        const newDrafts = {}

        products.forEach((product) => {
            newDrafts[product.id] = {
                description: product.description,
                price: product.price,
            }
        })

        setDrafts(newDrafts)
    }, [products])

    const handleLogin = (event) => {
        event.preventDefault()

        if (
            email === 'vicente@admin.cl' &&
            password === 'admin123'
        ) {
            sessionStorage.setItem('adminAuth', 'true')
            setIsAuthenticated(true)
            setReservations(loadReservations())

            setEmail('')
            setPassword('')
            return
        }

        window.alert(
            'Credenciales incorrectas. Acceso denegado.',
        )
    }

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth')
        setIsAuthenticated(false)
    }

    const handleDraftChange = (
        productId,
        field,
        value,
    ) => {
        setDrafts((currentDrafts) => ({
            ...currentDrafts,
            [productId]: {
                ...currentDrafts[productId],
                [field]: value,
            },
        }))
    }

    const handleSave = (productId) => {
        const draft = drafts[productId]

        if (!draft) {
            return
        }

        const numericPrice = Number(draft.price)

        if (
            !draft.description.trim() ||
            Number.isNaN(numericPrice) ||
            numericPrice <= 0
        ) {
            window.alert(
                'La descripción y el precio deben ser válidos.',
            )
            return
        }

        onSaveProduct(
            productId,
            draft.description.trim(),
            numericPrice,
        )

        window.alert('Producto actualizado correctamente.')
    }

    const handleDeleteReservation = (index) => {
        const confirmed = window.confirm(
            '¿Estás seguro de marcar esta reserva como lista/eliminada?',
        )

        if (!confirmed) {
            return
        }

        const updatedReservations =
            reservations.filter(
                (_, reservationIndex) =>
                    reservationIndex !== index,
            )

        localStorage.setItem(
            'bajon_db_reservas',
            JSON.stringify(updatedReservations),
        )

        setReservations(updatedReservations)
    }

    return (
        <section
            id="admin"
            className="py-5 bg-black"
        >
            <div className="container py-4">

                {!isAuthenticated ? (
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-5">

                            <div className="bg-dark border border-secondary rounded p-4 shadow">
                                <div className="text-center mb-4">
                                    <p className="text-warning fw-bold mb-2">
                                        PANEL INTERNO
                                    </p>

                                    <h2 className="text-light fw-bold">
                                        ACCESO ADMINISTRADOR
                                    </h2>

                                    <p className="text-secondary">
                                        Ingreso administrativo simulado
                                        para fines académicos.
                                    </p>
                                </div>

                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="adminEmail"
                                            className="form-label text-light"
                                        >
                                            Correo corporativo
                                        </label>

                                        <input
                                            type="email"
                                            id="adminEmail"
                                            className="form-control"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="adminPassword"
                                            className="form-label text-light"
                                        >
                                            Contraseña
                                        </label>

                                        <input
                                            type="password"
                                            id="adminPassword"
                                            className="form-control"
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(event.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-warning fw-bold w-100 py-3"
                                    >
                                        Entrar al sistema
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                ) : (
                    <>
                        {/* CABECERA ADMIN */}
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                            <div>
                                <p className="text-warning fw-bold mb-1">
                                    PANEL DE CONTROL
                                </p>

                                <h2 className="text-light fw-bold mb-0">
                                    Gestión de Productos
                                </h2>
                            </div>

                            <button
                                type="button"
                                className="btn btn-outline-light"
                                onClick={handleLogout}
                            >
                                Cerrar sesión admin
                            </button>
                        </div>

                        {/* PRODUCTOS */}
                        <div className="table-responsive">
                            <table className="table table-dark table-bordered align-middle">
                                <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th style={{ minWidth: '300px' }}>
                                        Descripción
                                    </th>
                                    <th style={{ minWidth: '130px' }}>
                                        Precio ($)
                                    </th>
                                    <th>Stock</th>
                                    <th>Acción</th>
                                </tr>
                                </thead>

                                <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <strong className="text-warning">
                                                {product.name}
                                            </strong>
                                        </td>

                                        <td>
                        <textarea
                            className="form-control"
                            rows="4"
                            value={
                                drafts[product.id]
                                    ?.description ?? ''
                            }
                            onChange={(event) =>
                                handleDraftChange(
                                    product.id,
                                    'description',
                                    event.target.value,
                                )
                            }
                        />
                                        </td>

                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                value={
                                                    drafts[product.id]?.price ?? ''
                                                }
                                                onChange={(event) =>
                                                    handleDraftChange(
                                                        product.id,
                                                        'price',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className={
                                                    product.stock
                                                        ? 'btn btn-success btn-sm'
                                                        : 'btn btn-danger btn-sm'
                                                }
                                                onClick={() =>
                                                    onToggleStock(product.id)
                                                }
                                            >
                                                {product.stock
                                                    ? 'En Stock (Ocultar)'
                                                    : 'Agotado (Mostrar)'}
                                            </button>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-warning btn-sm fw-bold"
                                                onClick={() =>
                                                    handleSave(product.id)
                                                }
                                            >
                                                Guardar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* RESERVAS */}
                        <div className="mt-5">
                            <h2 className="text-light fw-bold mb-4">
                                Gestión de Reservas
                            </h2>

                            <div className="table-responsive">
                                <table className="table table-dark table-bordered align-middle">
                                    <thead>
                                    <tr>
                                        <th>Cliente</th>
                                        <th>Sucursal</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Personas</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {reservations.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center text-secondary py-4"
                                            >
                                                No hay reservas pendientes.
                                            </td>
                                        </tr>
                                    ) : (
                                        reservations.map(
                                            (reservation, index) => (
                                                <tr key={`${reservation.correo}-${index}`}>
                                                    <td>
                                                        <strong>
                                                            {reservation.correo}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {reservation.sucursal}
                                                    </td>

                                                    <td>
                                                        {reservation.fecha}
                                                    </td>

                                                    <td>
                                                        {reservation.hora}
                                                    </td>

                                                    <td>
                                                        {reservation.personas}
                                                    </td>

                                                    <td>
                                                        <div className="d-flex flex-column gap-2">
                                                            <a
                                                                href={`mailto:${reservation.correo}?subject=Sobre tu reserva en El Bajón del Vicho`}
                                                                className="btn btn-warning btn-sm fw-bold"
                                                            >
                                                                Contactar
                                                            </a>

                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() =>
                                                                    handleDeleteReservation(
                                                                        index,
                                                                    )
                                                                }
                                                            >
                                                                Marcar Lista (Eliminar)
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ),
                                        )
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </section>
    )
}

export default AdminSection