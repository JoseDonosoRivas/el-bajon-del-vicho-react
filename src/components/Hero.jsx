function Hero() {
    return (
        <section id="inicio" className="bg-black py-5">
            <div className="container py-lg-5">
                <div className="row align-items-center">

                    <div className="col-lg-6 text-center text-lg-start">
                        <p className="text-warning fw-bold text-uppercase mb-3">
                            HAMBURGUESAS · DELIVERY · RESERVAS
                        </p>

                        <h1 className="display-1 fw-bold text-warning lh-1">
                            EL BAJÓN
                            <br />
                            DEL VICHO
                        </h1>

                        <p className="lead text-light my-4">
                            Hamburguesas monstruosas para esos ataques
                            de hambre que no perdonan.
                        </p>

                        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                            <a
                                href="#menu"
                                className="btn btn-warning fw-bold px-4 py-3"
                            >
                                Ver menú
                            </a>

                            <a
                                href="#reservas"
                                className="btn btn-outline-light fw-bold px-4 py-3"
                            >
                                Reservar mesa
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-6 text-center mt-5 mt-lg-0">
                        <img
                            src="/assets/logo.png"
                            alt="Hamburguesa El Bajón del Vicho"
                            className="img-fluid"
                            style={{ maxWidth: '500px' }}
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero