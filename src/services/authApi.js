
const API_URL = '/api/v1/auth'

export async function iniciarSesion(email, password) {
    const respuesta = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    if (!respuesta.ok) {
        throw new Error(
            respuesta.status === 401
                ? 'Correo o contraseña incorrectos.'
                : 'No se pudo iniciar sesión.'
        )
    }

    return respuesta.json()
}

export async function obtenerPerfil(token) {
    const respuesta = await fetch(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!respuesta.ok) {
        throw new Error('Sesión inválida o expirada.')
    }

    return respuesta.json()
}

export async function registrarCliente(datos) {
    const respuesta = await fetch(`${API_URL}/registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })

    if (!respuesta.ok) {
        throw new Error(
            respuesta.status === 409
                ? 'Este correo ya está registrado.'
                : 'No se pudo registrar la cuenta.'
        )
    }

    return respuesta.json()
}
