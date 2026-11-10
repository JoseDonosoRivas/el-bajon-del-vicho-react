
import { useState } from 'react'

function RegisterModal({
                           isOpen,
                           onClose,
                           onRegister,
                       }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null

    const resetForm = () => {
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setErrorMessage('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (loading) return

        const cleanName = name.trim()
        const cleanEmail = email.trim().toLowerCase()

        if (!cleanName || !cleanEmail ||
            !password || !confirmPassword) {
            setErrorMessage('Debes completar todos los campos.')
            return
        }

        if (password.length < 8) {
            setErrorMessage(
                'La contraseña debe tener al menos 8 caracteres.'
            )
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.')
            return
        }

        setLoading(true)
        setErrorMessage('')

        try {
            await onRegister({
                name: cleanName,
                email: cleanEmail,
                password,
            })

            resetForm()
        } catch (error) {
            setErrorMessage(
                error.message || 'No se pudo registrar la cuenta.'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        if (loading) return
        resetForm()
        onClose()
    }

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 3000,
            }}
            onClick={handleClose}
        >
            <div
                className="bg-dark text-light border border-secondary rounded p-4 shadow"
                style={{
                    width: '450px',
                    maxWidth: '90%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-outline-light btn-sm"
                        onClick={handleClose}
                        disabled={loading}
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-secondary mb-2">
                        Crea tu cuenta para continuar
                    </p>

                    <h2 className="text-warning fw-bold mb-4">
                        REGISTRO DE USUARIO
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="registerName"
                            className="form-label"
                        >
                            Nombre
                        </label>

                        <input
                            type="text"
                            id="registerName"
                            className="form-control"
                            placeholder="Tu nombre"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                            maxLength={120}
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="registerEmail"
                            className="form-label"
                        >
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            id="registerEmail"
                            className="form-control"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                            maxLength={150}
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="registerPassword"
                            className="form-label"
                        >
                            Contraseña
                        </label>

                        <input
                            type="password"
                            id="registerPassword"
                            className="form-control"
                            placeholder="Mínimo 8 caracteres"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                            minLength={8}
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="registerConfirmPassword"
                            className="form-label"
                        >
                            Confirmar contraseña
                        </label>

                        <input
                            type="password"
                            id="registerConfirmPassword"
                            className="form-control"
                            placeholder="Repite tu contraseña"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            required
                            disabled={loading}
                        />
                    </div>

                    {errorMessage && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                        >
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-warning fw-bold w-100 py-3"
                        disabled={loading}
                    >
                        {loading ? 'REGISTRANDO...' : 'CREAR CUENTA'}
                    </button>
                </form>

                <p className="text-secondary small text-center mt-3 mb-0">
                    Registro mediante Spring Boot y MySQL.
                </p>
            </div>
        </div>
    )
}

export default RegisterModal
