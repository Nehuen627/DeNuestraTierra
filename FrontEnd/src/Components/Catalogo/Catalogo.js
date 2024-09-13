import React, { useState, useEffect } from 'react';
import api from "../../axios/api.js";
import ProductoSee from './ProductoSee/ProductSee.js';
import "./Catalogo.css";

const Catalogo = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [productos, setProductos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [priceSort, setPriceSort] = useState('lowToHigh');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [type, setType] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    // Fetch product types (categories)
    useEffect(() => {
        const fetchTypeData = async () => {
            try {
                const response = await api.get('/api/productos/type');
                setType(response.data);
            } catch (err) {
                setError(err);
            }
        };
        fetchTypeData();
    }, []);

    // Handle form submission to search for products
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/api/productos', {
                params: {
                    query: searchQuery,
                    rating: rating,
                    category: category,
                    sortPrice: priceSort
                }
            });
            setProductos(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Map products to display
    const createVisualizator = productos.map((producto) => (
        <ProductoSee
            key={producto.Id}
            Title={producto.Title}
            Id={producto.Id}
            Price={producto.Price}
            Img={producto.ImgUrl}
            Rating={producto.Rating}
        />
    ));

    // Options for category selector
    const optionsSelector = type.map((option) => (
        <option key={option.Id} value={option.Name}>{option.Name}</option>
    ));

    // Toggle rating selection
    const handleRatingClick = (ratingValue) => {
        setRating(prevRating => (prevRating === ratingValue ? 0 : ratingValue));
    };

    // Toggle modal
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div className='catalogoContent'>
            <button className="settingsButton" onClick={toggleModal}>
                Filtros
            </button>

            {modalOpen && (
                <div className="modal">
                    <div className="modalContent">
                        <h3>Filtros:</h3>
                        <label htmlFor="rating">Puntuación:</label>
                        <div className="starRating">
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => handleRatingClick(ratingValue)}
                                            style={{ display: 'none' }}
                                        />
                                        <span
                                            className="star"
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                            style={{
                                                cursor: 'pointer',
                                                color: ratingValue <= (hover || rating) ? "#8e173d" : "#f996b5"
                                            }}
                                        >
                                            ★
                                        </span>
                                    </label>
                                );
                            })}
                        </div>

                        <label htmlFor="price">Precio:</label>
                        <select
                            name="price"
                            onChange={(e) => setPriceSort(e.target.value)}
                        >
                            <option value="lowToHigh">Menor - Mayor</option>
                            <option value="highToLow">Mayor - Menor</option>
                        </select>

                        <label htmlFor="category">Categoría:</label>
                        <select
                            name="category"
                            onChange={(e) => setCategory(e.target.value === "all" ? '' : e.target.value)}
                        >
                            <option value="all">Todas</option>
                            {optionsSelector}
                        </select>

                        <button className="closeModal" onClick={toggleModal}>Cerrar</button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSearch} className='form'>
                <div className='settingSearch'>
                    <h3>Filtros:</h3>

                    <label htmlFor="rating">Puntuación:</label>
                    <div className="starRating">
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => handleRatingClick(ratingValue)}
                                        style={{ display: 'none' }}
                                    />
                                    <span
                                        className="star"
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                        style={{
                                            cursor: 'pointer',
                                            color: ratingValue <= (hover || rating) ? "#8e173d" : "#f996b5"
                                        }}
                                    >
                                        ★
                                    </span>
                                </label>
                            );
                        })}
                    </div>

                    <label htmlFor="price">Precio:</label>
                    <select
                        name="price"
                        onChange={(e) => setPriceSort(e.target.value)}
                    >
                        <option value="lowToHigh">Menor - Mayor</option>
                        <option value="highToLow">Mayor - Menor</option>
                    </select>

                    <label htmlFor="category">Categoría:</label>
                    <select
                        name="category"
                        className='categorySelect'
                        onChange={(e) => setCategory(e.target.value === "all" ? '' : e.target.value)}
                    >
                        <option value="all">Todas</option>
                        {optionsSelector}
                    </select>
                </div>

                <div className='displaySearchs'>
                    <div className='searchBar'>
                        <input
                            type='text'
                            name='searchQuery'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Buscar productos'
                        />
                        <button type='submit'>Buscar</button>
                    </div>

                    <div className='productsDisplay'>
                        {loading ? <div className="loader"></div> : createVisualizator}
                        {error ? <p>Error loading productos: {error.message}</p> : ""}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Catalogo;
