import { useState } from 'react'

function getDateRange() {
    const today = new Date()
    const limit = new Date()

    limit.setDate(today.getDate() + 30)

    const formatDate = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    return {
        minDate: formatDate(today),
        maxDate: formatDate(limit),
    }
}

function ReservationSection({
                                userEmail,
                                onRequireLogin,
                            }) {
    const [people, setPeople] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [branch, setBranch] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const { minDate, maxDate } = getDateRange()

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!userEmail || userEmail === 'Invitado') {
            window.alert(
                'Debes iniciar sesión con tu correo para poder reservar una mesa.',
            )

            onRequireLogin()
            return
        }

        const peopleNumber = Number(people)

        if (
            peopleNumber < 1 ||
            peopleNumber > 5 ||
            !date ||
            !time ||
            !branch
        ) {
            window.alert(
                'Por favor completa correctamente todos los datos de la reserva.',
            )
            return
        }

        const newReservation = {
            correo: userEmail,
            personas: peopleNumber,
            fecha: date,
            hora: time,
            sucursal: branch,
        }

        try {
            const savedReservations =
                JSON.parse(
                    localStorage.getItem('bajon_db_reservas'),
                ) || []

            const reservations = Array.isArray(savedReservations)
                ? savedReservations
                : []

            reservations.push(newReservation)

            localStorage.setItem(
                'bajon_db_reservas',
                JSON.stringify(reservations),
            )

            setSuccessMessage(
                `Reserva confirmada para ${userEmail}.`,
            )

            setPeople('')
            setDate('')
            setTime('')
            setBranch('')
        } catch (error) {
            console.error('Error al guardar la reserva:', error)

            window.alert(
                'No fue posible guardar la reserva. Intenta nuevamente.',
            )
        }
    }

    return (
        <section id="reservas" className="py-5 bg-dark">
            <div className="container py-4">
                <div className="row align-items-center g-5">

                    {/* INFORMACIÓN */}
                    <div className="col-lg-5">
                        <p className="text-warning fw-bold mb-2">
                            ¿VAS A VENIR?
                        </p>

                        <h2 className="display-5 fw-bold text-light">
                            RESERVA TU MESA
                        </h2>

                        <p className="text-secondary fs-5">
                            Junta a los tuyos y ven a pegarte
                            el bajón en nuestras sucursales.
                        </p>
                    </div>

                    {/* FORMULARIO */}
                    <div className="col-lg-7">
                        <form
                            className="bg-black border border-secondary rounded p-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="row g-3">

                                {/* PERSONAS */}
                                <div className="col-md-6">
                                    <label
                                        htmlFor="people"
                                        className="form-label text-light"
                                    >
                                        Cantidad de personas
                                    </label>

                                    <input
                                        type="number"
                                        id="people"
                                        className="form-control"
                                        min="1"
                                        max="5"
                                        placeholder="Ej: 4"
                                        value={people}
                                        onChange={(event) =>
                                            setPeople(event.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {/* FECHA */}
                                <div className="col-md-6">
                                    <label
                                        htmlFor="date"
                                        className="form-label text-light"
                                    >
                                        Fecha
                                    </label>

                                    <input
                                        type="date"
                                        id="date"
                                        className="form-control"
                                        min={minDate}
                                        max={maxDate}
                                        value={date}
                                        onChange={(event) =>
                                            setDate(event.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {/* HORA */}
                                <div className="col-md-6">
                                    <label
                                        htmlFor="time"
                                        className="form-label text-light"
                                    >
                                        Hora
                                    </label>

                                    <input
                                        type="time"
                                        id="time"
                                        className="form-control"
                                        min="12:00"
                                        max="23:00"
                                        value={time}
                                        onChange={(event) =>
                                            setTime(event.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {/* SUCURSAL */}
                                <div className="col-md-6">
                                    <label
                                        htmlFor="branch"
                                        className="form-label text-light"
                                    >
                                        Sucursal
                                    </label>

                                    <select
                                        id="branch"
                                        className="form-select"
                                        value={branch}
                                        onChange={(event) =>
                                            setBranch(event.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Seleccionar sucursal
                                        </option>

                                        <option value="Sucursal Viña del Mar">
                                            Sucursal Viña del Mar
                                        </option>

                                        <option value="Sucursal Puente Alto">
                                            Sucursal Puente Alto
                                        </option>
                                    </select>
                                </div>

                                {/* BOTÓN */}
                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="btn btn-warning fw-bold w-100 py-3 mt-2"
                                    >
                                        Reservar mesa
                                    </button>
                                </div>
                            </div>

                            {/* CONFIRMACIÓN */}
                            {successMessage && (
                                <div
                                    className="alert alert-success mt-3 mb-0"
                                    role="alert"
                                >
                                    {successMessage}
                                </div>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ReservationSection