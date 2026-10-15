function ProductCard({ product, onAdd }) {
    return (
        <div className="col">
            <article
                className={`card h-100 bg-dark text-light border-secondary ${
                    !product.stock ? 'opacity-50' : ''
                }`}
            >
                <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{
                        height: '240px',
                        objectFit: 'cover',
                    }}
                />

                <div className="card-body d-flex flex-column">
                    <h3 className="h5 text-warning fw-bold">
                        {product.name}
                    </h3>

                    <p className="card-text text-light flex-grow-1">
                        {product.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center gap-3 mt-3">
                        <strong className="fs-5">
                            ${product.price.toLocaleString('es-CL')}
                        </strong>

                        <button
                            type="button"
                            className="btn btn-warning fw-bold"
                            disabled={!product.stock}
                            onClick={() => onAdd(product)}
                        >
                            {product.stock ? '+ AGREGAR' : 'AGOTADO'}
                        </button>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default ProductCard