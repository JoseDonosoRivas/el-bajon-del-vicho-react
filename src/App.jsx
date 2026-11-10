
import { useEffect, useState } from 'react'
import { iniciarSesion, registrarCliente } from './services/authApi.js'

import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Menu from './components/Menu.jsx'
import ReservationSection from './components/ReservationSection.jsx'
import BranchesSection from './components/BranchesSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import AdminSection from './components/AdminSection.jsx'
import Cart from './components/Cart.jsx'
import DeliveryOptionsModal from './components/DeliveryOptionsModal.jsx'
import PickupBranchModal from './components/PickupBranchModal.jsx'
import OrderSuccessModal from './components/OrderSuccessModal.jsx'
import LoginModal from './components/LoginModal.jsx'
import RegisterModal from './components/RegisterModal.jsx'
import AddressModal from './components/AddressModal.jsx'

function loadCart() {
    try {
        const saved = localStorage.getItem('carritoBajon')
        if (!saved) return []

        const parsed = JSON.parse(saved)
        return Array.isArray(parsed) ? parsed : []
    } catch (error) {
        console.error('Error al cargar carrito:', error)
        return []
    }
}

function App() {
    // Carrito
    const [cart, setCart] = useState(loadCart)
    const [isCartOpen, setIsCartOpen] = useState(false)

    // Autenticación JWT
    const [userEmail, setUserEmail] = useState('')
    const [authToken, setAuthToken] = useState(null)
    const [authUser, setAuthUser] = useState(null)

    // Catálogo desde MySQL
    const [products, setProducts] = useState([])
    const [productsStatus, setProductsStatus] = useState('loading')
    const [productsRetry, setProductsRetry] = useState(0)

    // Ventanas
    const [isDeliveryOptionsOpen, setIsDeliveryOptionsOpen] =
        useState(false)

    const [isPickupBranchOpen, setIsPickupBranchOpen] =
        useState(false)

    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)
    const [isAddressOpen, setIsAddressOpen] = useState(false)

    // Pedidos
    const [selectedBranch, setSelectedBranch] = useState('')
    const [orderSummary, setOrderSummary] = useState(null)

    // Guardar carrito localmente
    useEffect(() => {
        localStorage.setItem(
            'carritoBajon',
            JSON.stringify(cart)
        )
    }, [cart])

    // Obtener productos reales desde Spring Boot
    useEffect(() => {
        const controller = new AbortController()

        async function fetchProducts() {
            setProductsStatus('loading')

            try {
                const response = await fetch('/api/v1/productos', {
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error(
                        `Error HTTP ${response.status}`
                    )
                }

                const data = await response.json()

                if (!Array.isArray(data)) {
                    throw new Error(
                        'La API no devolvió una lista de productos.'
                    )
                }

                const apiProducts = data.map((item) => ({
                    ...item,
                    price: Number(item.price),
                }))

                if (
                    apiProducts.some(
                        (item) =>
                            !item.id ||
                            !item.name ||
                            !item.category ||
                            !Number.isFinite(item.price)
                    )
                ) {
                    throw new Error(
                        'La API devolvió productos inválidos.'
                    )
                }

                apiProducts.sort((a, b) =>
                    a.id.localeCompare(
                        b.id,
                        'es',
                        { numeric: true }
                    )
                )

                if (!controller.signal.aborted) {
                    setProducts(apiProducts)
                    setProductsStatus('success')
                }
            } catch (error) {
                if (controller.signal.aborted) return

                console.error(
                    'Error al cargar catálogo:',
                    error
                )

                setProductsStatus('error')
            }
        }

        fetchProducts()

        return () => controller.abort()
    }, [productsRetry])

    // Agregar producto al carrito
    const handleAddToCart = (product) => {
        if (!product.stock) return

        setCart((currentCart) => {
            const existing = currentCart.find(
                (item) => item.id === product.id
            )

            if (existing) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                )
            }

            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1,
                },
            ]
        })

        setIsCartOpen(true)
    }

    const handleIncreaseQuantity = (productId) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        )
    }

    const handleDecreaseQuantity = (productId) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === productId && item.quantity > 1
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                    }
                    : item
            )
        )
    }

    const handleRemoveFromCart = (productId) => {
        setCart((currentCart) =>
            currentCart.filter(
                (item) => item.id !== productId
            )
        )
    }

    // LOGIN REAL CON SPRING BOOT
    const handleLogin = async (email, password) => {
        const result = await iniciarSesion(email, password)

        if (!result.token || !result.usuario?.email) {
            throw new Error(
                'El servidor no devolvió una sesión válida.'
            )
        }

        setAuthToken(result.token)
        setAuthUser(result.usuario)
        setUserEmail(result.usuario.email)
        setIsLoginOpen(false)
    }

    // REGISTRO REAL EN MYSQL
    const handleRegister = async ({
                                      name,
                                      email,
                                      password,
                                  }) => {
        await registrarCliente({
            nombre: name,
            email,
            password,
        })

        await handleLogin(email, password)

        setIsRegisterOpen(false)
        return true
    }

    // Invitado
    const handleGuest = () => {
        setAuthToken(null)
        setAuthUser(null)
        setUserEmail('Invitado')
        setIsLoginOpen(false)
    }

    // Cerrar sesión
    const handleLogout = () => {
        setAuthToken(null)
        setAuthUser(null)
        setUserEmail('')

        localStorage.removeItem('userEmail')
        localStorage.removeItem('userAddress')
        localStorage.removeItem('carritoBajon')
        localStorage.removeItem('adminAuth')
        sessionStorage.removeItem('adminAuth')

        setCart([])
        setIsCartOpen(false)
    }

    // Confirmación del carrito
    const handleConfirmOrder = () => {
        setIsCartOpen(false)
        setIsDeliveryOptionsOpen(true)
    }

    // Opción despacho
    const handleDeliveryChoice = () => {
        setIsDeliveryOptionsOpen(false)

        if (!authToken) {
            window.alert(
                'Para solicitar despacho debes iniciar sesión.'
            )

            setIsLoginOpen(true)
            return
        }

        setIsAddressOpen(true)
    }

    // Opción retiro
    const handlePickupChoice = () => {
        setIsDeliveryOptionsOpen(false)
        setIsPickupBranchOpen(true)
    }

    // Resumen del carrito
    const getCartSummary = () => {
        const itemCount = cart.reduce(
            (total, item) => total + item.quantity,
            0
        )

        const total = cart.reduce(
            (sum, item) =>
                sum + Number(item.price) * item.quantity,
            0
        )

        return { itemCount, total }
    }

    // Selección de sucursal
    const handleSelectBranch = (branch) => {
        const { itemCount, total } = getCartSummary()

        const orderNumber =
            Math.floor(Math.random() * 9000) + 1000

        setSelectedBranch(branch)
        setIsPickupBranchOpen(false)

        setOrderSummary({
            orderNumber,
            itemCount,
            total,
            deliveryType: 'pickup',
            branch,
            address: '',
            userEmail,
        })

        setCart([])
    }

    // Confirmación de dirección
    const handleConfirmAddress = (address) => {
        localStorage.setItem('userAddress', address)

        const { itemCount, total } = getCartSummary()

        const orderNumber =
            Math.floor(Math.random() * 9000) + 1000

        setIsAddressOpen(false)

        setOrderSummary({
            orderNumber,
            itemCount,
            total,
            deliveryType: 'delivery',
            branch: '',
            address,
            userEmail,
        })

        setCart([])
    }

    const handleContinueShopping = () => {
        setOrderSummary(null)
    }

    // ACTUALIZAR PRODUCTO MEDIANTE JWT
    const actualizarProducto = async (producto) => {
        if (!authToken || authUser?.rol !== 'ADMIN') {
            throw new Error(
                'Solo ADMIN puede modificar productos.'
            )
        }

        const respuesta = await fetch(
            `/api/v1/productos/${encodeURIComponent(producto.id)}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    name: producto.name,
                    description: producto.description,
                    price: Number(producto.price),
                    image: producto.image,
                    stock: Boolean(producto.stock),
                    category: producto.category,
                }),
            }
        )

        if (!respuesta.ok) {
            if (
                respuesta.status === 401 ||
                respuesta.status === 403
            ) {
                throw new Error(
                    'Sesión vencida o sin permisos. Vuelve a iniciar sesión.'
                )
            }

            throw new Error(
                `No se pudo guardar el producto (HTTP ${respuesta.status}).`
            )
        }

        const guardado = await respuesta.json()

        const actualizado = {
            ...guardado,
            price: Number(guardado.price),
        }

        setProducts((actuales) =>
            actuales.map((p) =>
                p.id === actualizado.id ? actualizado : p
            )
        )

        return actualizado
    }

    // Guardar precio y descripción
    const handleSaveProduct = async (
        productId,
        description,
        price
    ) => {
        const producto = products.find(
            (p) => p.id === productId
        )

        if (!producto) {
            throw new Error('Producto no encontrado.')
        }

        return actualizarProducto({
            ...producto,
            description,
            price,
        })
    }

    // Cambiar disponibilidad
    const handleToggleStock = async (productId) => {
        const producto = products.find(
            (p) => p.id === productId
        )

        if (!producto) {
            throw new Error('Producto no encontrado.')
        }

        return actualizarProducto({
            ...producto,
            stock: !producto.stock,
        })
    }

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    )

    return (
        <>
            <Header
                cartCount={cartCount}
                isLoggedIn={Boolean(userEmail)}
                onLogin={() => {
                    setIsRegisterOpen(false)
                    setIsLoginOpen(true)
                }}
                onRegister={() => {
                    setIsLoginOpen(false)
                    setIsRegisterOpen(true)
                }}
                onLogout={handleLogout}
                onCartClick={() => setIsCartOpen(true)}
            />

            <Hero />

            {productsStatus === 'success' ? (
                <Menu
                    products={products}
                    onAddToCart={handleAddToCart}
                />
            ) : (
                <section
                    id="menu"
                    className="py-5 bg-black"
                >
                    <div className="container py-4 text-center text-light">
                        {productsStatus === 'loading' ? (
                            <p
                                role="status"
                                className="text-warning fw-bold"
                            >
                                Cargando menú desde nuestra base de datos...
                            </p>
                        ) : (
                            <div role="alert">
                                <p className="text-warning fw-bold mb-3">
                                    No se pudo cargar el menú.
                                    Verifica que Spring Boot esté ejecutándose.
                                </p>

                                <button
                                    type="button"
                                    className="btn btn-warning fw-bold"
                                    onClick={() =>
                                        setProductsRetry(
                                            (value) => value + 1
                                        )
                                    }
                                >
                                    Reintentar
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            )}

            <ReservationSection
                userEmail={userEmail}
                onRequireLogin={() => {
                    setIsRegisterOpen(false)
                    setIsLoginOpen(true)
                }}
            />

            <BranchesSection />

            <ContactSection />

            {/* Panel solo visible para ADMIN */}
            {authUser?.rol === 'ADMIN' && authToken && (
                <AdminSection
                    products={products}
                    onSaveProduct={handleSaveProduct}
                    onToggleStock={handleToggleStock}
                    onLogout={handleLogout}
                />
            )}

            <Cart
                cart={cart}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                onRemove={handleRemoveFromCart}
                onConfirm={handleConfirmOrder}
            />

            <DeliveryOptionsModal
                isOpen={isDeliveryOptionsOpen}
                onClose={() =>
                    setIsDeliveryOptionsOpen(false)
                }
                onDelivery={handleDeliveryChoice}
                onPickup={handlePickupChoice}
            />

            <PickupBranchModal
                isOpen={isPickupBranchOpen}
                onClose={() =>
                    setIsPickupBranchOpen(false)
                }
                onSelectBranch={handleSelectBranch}
            />

            <AddressModal
                isOpen={isAddressOpen}
                onClose={() => setIsAddressOpen(false)}
                initialAddress={
                    localStorage.getItem('userAddress') || ''
                }
                onConfirm={handleConfirmAddress}
            />

            <OrderSuccessModal
                isOpen={orderSummary !== null}
                orderNumber={orderSummary?.orderNumber || ''}
                itemCount={orderSummary?.itemCount || 0}
                total={orderSummary?.total || 0}
                deliveryType={orderSummary?.deliveryType || ''}
                branch={
                    orderSummary?.branch || selectedBranch
                }
                address={orderSummary?.address || ''}
                userEmail={orderSummary?.userEmail || ''}
                onContinue={handleContinueShopping}
            />

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={handleLogin}
                onGuest={handleGuest}
            />

            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onRegister={handleRegister}
            />
        </>
    )
}

export default App
