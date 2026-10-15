import { useEffect, useState } from 'react'

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

import {
    products as initialProducts,
} from './data/products.js'


function loadCart() {
    try {
        const savedCart =
            localStorage.getItem('carritoBajon')

        if (!savedCart) {
            return []
        }

        const parsedCart =
            JSON.parse(savedCart)

        return Array.isArray(parsedCart)
            ? parsedCart
            : []
    } catch (error) {
        console.error(
            'Error al cargar el carrito:',
            error,
        )

        return []
    }
}


function loadUser() {
    return (
        localStorage.getItem('userEmail') || ''
    )
}


function loadProducts() {
    try {
        const savedProducts =
            localStorage.getItem(
                'bajon_db_productos',
            )

        if (!savedProducts) {
            return initialProducts
        }

        const parsedProducts =
            JSON.parse(savedProducts)

        if (!Array.isArray(parsedProducts)) {
            return initialProducts
        }

        return initialProducts.map(
            (baseProduct) => {
                const savedProduct =
                    parsedProducts.find(
                        (product) =>
                            product.id === baseProduct.id,
                    )

                if (!savedProduct) {
                    return baseProduct
                }

                const savedPrice = Number(
                    savedProduct.price ??
                    savedProduct.precio ??
                    baseProduct.price,
                )

                return {
                    ...baseProduct,

                    name:
                        savedProduct.name ??
                        savedProduct.nombre ??
                        baseProduct.name,

                    description:
                        savedProduct.description ??
                        savedProduct.desc ??
                        baseProduct.description,

                    price: Number.isNaN(savedPrice)
                        ? baseProduct.price
                        : savedPrice,

                    stock:
                        typeof savedProduct.stock ===
                        'boolean'
                            ? savedProduct.stock
                            : baseProduct.stock,
                }
            },
        )
    } catch (error) {
        console.error(
            'Error al cargar los productos:',
            error,
        )

        return initialProducts
    }
}


function App() {
    const [cart, setCart] =
        useState(loadCart)

    const [userEmail, setUserEmail] =
        useState(loadUser)

    const [products, setProducts] =
        useState(loadProducts)

    const [isCartOpen, setIsCartOpen] =
        useState(false)

    const [
        isDeliveryOptionsOpen,
        setIsDeliveryOptionsOpen,
    ] = useState(false)

    const [
        isPickupBranchOpen,
        setIsPickupBranchOpen,
    ] = useState(false)

    const [
        isLoginOpen,
        setIsLoginOpen,
    ] = useState(false)

    const [
        isRegisterOpen,
        setIsRegisterOpen,
    ] = useState(false)

    const [
        isAddressOpen,
        setIsAddressOpen,
    ] = useState(false)

    const [
        selectedBranch,
        setSelectedBranch,
    ] = useState('')

    const [
        orderSummary,
        setOrderSummary,
    ] = useState(null)


    useEffect(() => {
        localStorage.setItem(
            'carritoBajon',
            JSON.stringify(cart),
        )
    }, [cart])


    useEffect(() => {
        localStorage.setItem(
            'bajon_db_productos',
            JSON.stringify(products),
        )
    }, [products])


    const handleAddToCart = (product) => {
        if (!product.stock) {
            return
        }

        setCart((currentCart) => {
            const existingProduct =
                currentCart.find(
                    (item) =>
                        item.id === product.id,
                )

            if (existingProduct) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity:
                                item.quantity + 1,
                        }
                        : item,
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


    const handleIncreaseQuantity = (
        productId,
    ) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity:
                            item.quantity + 1,
                    }
                    : item,
            ),
        )
    }


    const handleDecreaseQuantity = (
        productId,
    ) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === productId &&
                item.quantity > 1
                    ? {
                        ...item,
                        quantity:
                            item.quantity - 1,
                    }
                    : item,
            ),
        )
    }


    const handleRemoveFromCart = (
        productId,
    ) => {
        setCart((currentCart) =>
            currentCart.filter(
                (item) =>
                    item.id !== productId,
            ),
        )
    }


    const handleLogin = (email) => {
        localStorage.setItem(
            'userEmail',
            email,
        )

        setUserEmail(email)
        setIsLoginOpen(false)
    }


    const handleRegister = ({
                                name,
                                email,
                            }) => {
        try {
            const savedUsers =
                localStorage.getItem(
                    'bajon_db_usuarios',
                )

            const parsedUsers = savedUsers
                ? JSON.parse(savedUsers)
                : []

            const users =
                Array.isArray(parsedUsers)
                    ? parsedUsers
                    : []

            const normalizedEmail =
                email.trim().toLowerCase()

            const alreadyExists =
                users.some(
                    (user) =>
                        String(user.email)
                            .trim()
                            .toLowerCase() ===
                        normalizedEmail,
                )

            if (alreadyExists) {
                return false
            }

            const newUser = {
                id: Date.now(),
                name: name.trim(),
                email: normalizedEmail,
                createdAt:
                    new Date().toISOString(),
            }

            const updatedUsers = [
                ...users,
                newUser,
            ]

            localStorage.setItem(
                'bajon_db_usuarios',
                JSON.stringify(updatedUsers),
            )

            localStorage.setItem(
                'userEmail',
                normalizedEmail,
            )

            setUserEmail(normalizedEmail)
            setIsRegisterOpen(false)

            return true
        } catch (error) {
            console.error(
                'Error al registrar usuario:',
                error,
            )

            window.alert(
                'No fue posible registrar la cuenta. Intenta nuevamente.',
            )

            return false
        }
    }


    const handleGuest = () => {
        localStorage.setItem(
            'userEmail',
            'Invitado',
        )

        setUserEmail('Invitado')
        setIsLoginOpen(false)
    }


    const handleLogout = () => {
        localStorage.removeItem('userEmail')

        localStorage.removeItem(
            'userAddress',
        )

        localStorage.removeItem(
            'carritoBajon',
        )

        sessionStorage.clear()

        setUserEmail('')
        setCart([])
        setIsCartOpen(false)
    }


    const handleConfirmOrder = () => {
        setIsCartOpen(false)

        setIsDeliveryOptionsOpen(true)
    }


    const handleDeliveryChoice = () => {
        setIsDeliveryOptionsOpen(false)

        if (
            !userEmail ||
            userEmail === 'Invitado'
        ) {
            window.alert(
                'Para la opción de despacho debes iniciar sesión con tu correo.',
            )

            setIsLoginOpen(true)

            return
        }

        setIsAddressOpen(true)
    }


    const handlePickupChoice = () => {
        setIsDeliveryOptionsOpen(false)

        setIsPickupBranchOpen(true)
    }


    const handleSelectBranch = (
        branch,
    ) => {
        const itemCount =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0,
            )

        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    item.price *
                    item.quantity,
                0,
            )

        const orderNumber =
            Math.floor(
                Math.random() * 9000,
            ) + 1000

        const savedEmail =
            localStorage.getItem(
                'userEmail',
            ) || ''

        setSelectedBranch(branch)
        setIsPickupBranchOpen(false)

        setOrderSummary({
            orderNumber,
            itemCount,
            total,
            deliveryType: 'pickup',
            branch,
            address: '',
            userEmail: savedEmail,
        })

        setCart([])
    }


    const handleConfirmAddress = (
        address,
    ) => {
        localStorage.setItem(
            'userAddress',
            address,
        )

        const itemCount =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0,
            )

        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    item.price *
                    item.quantity,
                0,
            )

        const orderNumber =
            Math.floor(
                Math.random() * 9000,
            ) + 1000

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


    const handleSaveProduct = (
        productId,
        description,
        price,
    ) => {
        setProducts(
            (currentProducts) =>
                currentProducts.map(
                    (product) =>
                        product.id === productId
                            ? {
                                ...product,
                                description,
                                price,
                            }
                            : product,
                ),
        )
    }


    const handleToggleStock = (
        productId,
    ) => {
        setProducts(
            (currentProducts) =>
                currentProducts.map(
                    (product) =>
                        product.id === productId
                            ? {
                                ...product,
                                stock:
                                    !product.stock,
                            }
                            : product,
                ),
        )
    }


    const cartCount =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0,
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
                onCartClick={() =>
                    setIsCartOpen(true)
                }
            />

            <Hero />

            <Menu
                products={products}
                onAddToCart={
                    handleAddToCart
                }
            />

            <ReservationSection
                userEmail={userEmail}
                onRequireLogin={() => {
                    setIsRegisterOpen(false)
                    setIsLoginOpen(true)
                }}
            />

            <BranchesSection />

            <ContactSection />

            <AdminSection
                products={products}
                onSaveProduct={
                    handleSaveProduct
                }
                onToggleStock={
                    handleToggleStock
                }
            />

            <Cart
                cart={cart}
                isOpen={isCartOpen}
                onClose={() =>
                    setIsCartOpen(false)
                }
                onIncrease={
                    handleIncreaseQuantity
                }
                onDecrease={
                    handleDecreaseQuantity
                }
                onRemove={
                    handleRemoveFromCart
                }
                onConfirm={
                    handleConfirmOrder
                }
            />

            <DeliveryOptionsModal
                isOpen={
                    isDeliveryOptionsOpen
                }
                onClose={() =>
                    setIsDeliveryOptionsOpen(
                        false,
                    )
                }
                onDelivery={
                    handleDeliveryChoice
                }
                onPickup={
                    handlePickupChoice
                }
            />

            <PickupBranchModal
                isOpen={
                    isPickupBranchOpen
                }
                onClose={() =>
                    setIsPickupBranchOpen(
                        false,
                    )
                }
                onSelectBranch={
                    handleSelectBranch
                }
            />

            <AddressModal
                isOpen={isAddressOpen}
                onClose={() =>
                    setIsAddressOpen(false)
                }
                initialAddress={
                    localStorage.getItem(
                        'userAddress',
                    ) || ''
                }
                onConfirm={
                    handleConfirmAddress
                }
            />

            <OrderSuccessModal
                isOpen={
                    orderSummary !== null
                }
                orderNumber={
                    orderSummary
                        ?.orderNumber || ''
                }
                itemCount={
                    orderSummary
                        ?.itemCount || 0
                }
                total={
                    orderSummary?.total || 0
                }
                deliveryType={
                    orderSummary
                        ?.deliveryType || ''
                }
                branch={
                    orderSummary?.branch ||
                    selectedBranch
                }
                address={
                    orderSummary?.address || ''
                }
                userEmail={
                    orderSummary
                        ?.userEmail || ''
                }
                onContinue={
                    handleContinueShopping
                }
            />

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() =>
                    setIsLoginOpen(false)
                }
                onLogin={handleLogin}
                onGuest={handleGuest}
            />

            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() =>
                    setIsRegisterOpen(false)
                }
                onRegister={handleRegister}
            />
        </>
    )
}

export default App