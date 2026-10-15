import { useState } from 'react'
import ProductCard from './ProductCard.jsx'

function Menu({
                  products,
                  onAddToCart,
              }) {
    const [category, setCategory] = useState('hamburguesas')

    const filteredProducts = products.filter(
        (product) => product.category === category,
    )

    return (
        <section
            id="menu"
            className="py-5 bg-black"
        >
            <div className="container py-4">

                <div className="text-center mb-4">
                    <p className="text-warning fw-bold mb-2">
                        ELIGE TU BAJÓN
                    </p>

                    <h2 className="display-5 fw-bold text-light">
                        NUESTRO MENÚ
                    </h2>
                </div>

                <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                    <button
                        type="button"
                        className={
                            category === 'hamburguesas'
                                ? 'btn btn-warning fw-bold'
                                : 'btn btn-outline-warning fw-bold'
                        }
                        onClick={() =>
                            setCategory('hamburguesas')
                        }
                    >
                        Hamburguesas
                    </button>

                    <button
                        type="button"
                        className={
                            category === 'acompanamientos'
                                ? 'btn btn-warning fw-bold'
                                : 'btn btn-outline-warning fw-bold'
                        }
                        onClick={() =>
                            setCategory('acompanamientos')
                        }
                    >
                        Acompañamientos
                    </button>

                    <button
                        type="button"
                        className={
                            category === 'bebidas'
                                ? 'btn btn-warning fw-bold'
                                : 'btn btn-outline-warning fw-bold'
                        }
                        onClick={() =>
                            setCategory('bebidas')
                        }
                    >
                        Bebidas
                    </button>
                </div>

                <div className="row g-4">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="col-12 col-md-6 col-xl-3"
                        >
                            <ProductCard
                                product={product}
                                onAdd={onAddToCart}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Menu