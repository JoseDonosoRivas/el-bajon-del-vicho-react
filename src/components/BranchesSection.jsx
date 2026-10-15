function BranchesSection() {
    return (
        <section id="sucursales" className="py-5 bg-black">
            <div className="container py-4">

                <div className="text-center mb-5">
                    <p className="text-warning fw-bold mb-2">
                        ENCUÉNTRANOS
                    </p>

                    <h2 className="display-5 fw-bold text-light">
                        NUESTRAS SUCURSALES
                    </h2>
                </div>

                <div className="row g-4 justify-content-center">

                    {/* VIÑA DEL MAR */}
                    <div className="col-12 col-lg-6">
                        <article className="card bg-dark text-light border-secondary h-100 shadow">
                            <img
                                src="/assets/sede_vina.png"
                                className="card-img-top"
                                alt="Sucursal Viña del Mar"
                                style={{
                                    height: '300px',
                                    objectFit: 'cover',
                                }}
                            />

                            <div className="card-body d-flex flex-column p-4">
                                <h3 className="text-warning fw-bold">
                                    Viña del Mar
                                </h3>

                                <p className="text-secondary">
                                    📍 14 Nte. 821, Av. Libertad 1348,
                                    Viña del Mar, Valparaíso
                                </p>

                                <p className="text-light">
                                    🕐 Lunes a Domingo
                                    <br />
                                    <strong>12:00 - 23:00</strong>
                                </p>

                                <a
                                    href="https://maps.app.goo.gl/gBv29EThxjiRvUTA9"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-warning fw-bold mt-auto"
                                >
                                    Ver ubicación
                                </a>
                            </div>
                        </article>
                    </div>

                    {/* PUENTE ALTO */}
                    <div className="col-12 col-lg-6">
                        <article className="card bg-dark text-light border-secondary h-100 shadow">
                            <img
                                src="/assets/sede_puente_alto.png"
                                className="card-img-top"
                                alt="Sucursal Puente Alto"
                                style={{
                                    height: '300px',
                                    objectFit: 'cover',
                                }}
                            />

                            <div className="card-body d-flex flex-column p-4">
                                <h3 className="text-warning fw-bold">
                                    Puente Alto
                                </h3>

                                <p className="text-secondary">
                                    📍 Metro Estación Las Mercedes -
                                    Av. Concha y Toro 1064, Puente Alto,
                                    Región Metropolitana
                                </p>

                                <p className="text-light">
                                    🕐 Lunes a Domingo
                                    <br />
                                    <strong>12:00 - 23:00</strong>
                                </p>

                                <a
                                    href="https://maps.app.goo.gl/gQGtiKcHUo6ZeocC8"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-warning fw-bold mt-auto"
                                >
                                    Ver ubicación
                                </a>
                            </div>
                        </article>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default BranchesSection