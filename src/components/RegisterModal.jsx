import { useState } from 'react'

function RegisterModal({
                           isOpen,
                           onClose,
                           onRegister,
                       }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] =
        useState('')
    const [errorMessage, setErrorMessage] =
        useState('')

    if (!isOpen) {
        return null
    }

    const resetForm = () => {
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setErrorMessage('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const cleanName = name.trim()
        const cleanEmail = email
            .trim()
            .toLowerCase()

        if (
            !cleanName ||
            !cleanEmail ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            setErrorMessage(
                'Debes completar todos los campos.',
            )
            return
        }

        if (password.length < 6) {
            setErrorMessage(
                'La contraseña debe tener al menos 6 caracteres.',
            )
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage(
                'Las contraseñas no coinciden.',
            )
            return
        }

        const registered = onRegister({
            name: cleanName,
            email: cleanEmail,
        })

        if (!registered) {
            setErrorMessage(
                'El correo ingresado ya se encuentra registrado.',
            )
            return
        }

        resetForm()
    }

    const handleClose = () => {
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
                }}
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-outline-light btn-sm"
                        onClick={handleClose}
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
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
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
                                setConfirmPassword(
                                    event.target.value,
                                )
                            }
                            required
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
                    >
                        CREAR CUENTA
                    </button>
                </form>

                <p className="text-secondary small text-center mt-3 mb-0">
                    Registro simulado para fines académicos.
                </p>
            </div>
        </div>
    )
}

export default RegisterModal