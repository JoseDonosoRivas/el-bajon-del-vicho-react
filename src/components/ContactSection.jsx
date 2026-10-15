import { useState } from 'react'

function ContactSection() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        const destinationEmail = 'contacto@elbajondelvicho.cl'

        const subject = encodeURIComponent(
            `Nuevo mensaje de contacto de: ${name}`,
        )

        const emailBody = encodeURIComponent(
            `¡Hola! Me llamo ${name}.\n\n` +
            `Mi correo de contacto es: ${email}\n\n` +
            `${message}`,
        )

        const mailtoUrl =
            `mailto:${destinationEmail}` +
            `?subject=${subject}` +
            `&body=${emailBody}`

        window.location.href = mailtoUrl

        setName('')
        setEmail('')
        setMessage('')
    }

    return (
        <section id="contacto" className="py-5 bg-dark">
            <div className="container py-4">
                <div className="row align-items-center g-5">

                    {/* INFORMACIÓN */}
                    <div className="col-12 col-lg-5">
                        <p className="text-warning fw-bold mb-2">
                            ¿NECESITAS AYUDA?
                        </p>

                        <h2 className="display-5 fw-bold text-light">
                            HABLEMOS
                        </h2>

                        <p className="text-secondary fs-5 mb-4">
                            ¿Tienes alguna duda, problema con tu pedido
                            o simplemente quieres hablar con nosotros?
                        </p>

                        <a
                            href="https://wa.me/56967671234?text=Hola,%20estoy%20viendo%20la%20página%20de%20El%20Bajón%20del%20Vicho%20y%20tengo%20una%20duda."
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-success fw-bold px-4 py-3"
                        >
                            💬 Hablar por WhatsApp
                        </a>
                    </div>

                    {/* FORMULARIO */}
                    <div className="col-12 col-lg-7">
                        <form
                            className="bg-black border border-secondary rounded p-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-3">
                                <label
                                    htmlFor="contactName"
                                    className="form-label text-light"
                                >
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    id="contactName"
                                    className="form-control"
                                    placeholder="Tu nombre"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="contactEmail"
                                    className="form-label text-light"
                                >
                                    Correo electrónico
                                </label>

                                <input
                                    type="email"
                                    id="contactEmail"
                                    className="form-control"
                                    placeholder="correo@ejemplo.com"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="contactMessage"
                                    className="form-label text-light"
                                >
                                    Mensaje
                                </label>

                                <textarea
                                    id="contactMessage"
                                    className="form-control"
                                    rows="5"
                                    placeholder="Escribe tu mensaje..."
                                    value={message}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-warning fw-bold w-100 py-3"
                            >
                                Enviar correo
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ContactSection