import { useState } from 'react'

function Header({
                    cartCount = 0,
                    isLoggedIn = false,
                    onLogin,
                    onRegister,
                    onLogout,
                    onCartClick,
                }) {
    const [menuOpen, setMenuOpen] =
        useState(false)

    return (
        <header className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary">
                <div className="container">
                    {/* LOGO */}
                    <a
                        className="navbar-brand"
                        href="#inicio"
                    >
                        <img
                            src="/assets/logo.png"
                            alt="El Bajón del Vicho"
                            width="80"
                        />
                    </a>

                    {/* BOTÓN MENÚ MÓVIL */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        aria-expanded={menuOpen}
                        aria-label="Abrir menú"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* NAVEGACIÓN */}
                    <div
                        className={`collapse navbar-collapse ${
                            menuOpen ? 'show' : ''
                        }`}
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#inicio"
                                >
                                    Inicio
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#menu"
                                >
                                    Menú
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#reservas"
                                >
                                    Reservas
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#sucursales"
                                >
                                    Sucursales
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#contacto"
                                >
                                    Contacto
                                </a>
                            </li>
                        </ul>

                        {/* ACCIONES */}
                        <div className="d-flex flex-wrap gap-2">
                            {isLoggedIn ? (
                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    onClick={onLogout}
                                >
                                    Cerrar sesión
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="btn btn-outline-light"
                                        onClick={onLogin}
                                    >
                                        Iniciar sesión
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-warning"
                                        onClick={onRegister}
                                    >
                                        Registrarse
                                    </button>
                                </>
                            )}

                            <button
                                type="button"
                                className="btn btn-warning position-relative"
                                onClick={onCartClick}
                                aria-label="Abrir carrito"
                            >
                                🛒

                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                  {cartCount}
                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header