import { useState } from 'react'

function LoginModal({
                        isOpen,
                        onClose,
                        onLogin,
                        onGuest,
                    }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    if (!isOpen) {
        return null
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const cleanEmail = email.trim()

        if (!cleanEmail || !password.trim()) {
            return
        }

        onLogin(cleanEmail)

        setEmail('')
        setPassword('')
    }

    const handleGuest = () => {
        onGuest()

        setEmail('')
        setPassword('')
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
                        ¡Hola! ¿Cómo quieres continuar?
                    </p>

                    <h2 className="text-warning fw-bold mb-4">
                        INICIO SESIÓN
                    </h2>

                    <button
                        type="button"
                        className="btn btn-outline-warning fw-bold w-100 py-3"
                        onClick={handleGuest}
                    >
                        INGRESAR COMO INVITADO
                    </button>

                    <div className="my-4 text-secondary">
                        o ingresa con tu correo
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Ingresa tu correo"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-warning fw-bold w-100 py-3"
                        >
                            INGRESAR
                        </button>
                    </form>

                    <p className="text-secondary small mt-3 mb-0">
                        Sesión simulada para fines académicos.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginModal