import React, { useState, useEffect} from 'react';
import { Pencil, Trash, Plus } from 'react-bootstrap-icons';
import api from '../../axios/api';
import "./dashboard.css";
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('productos');
    const [productos, setProductos] = useState([]);
    const [talleres, setTalleres] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filteredTalleres, setFilteredTalleres] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [typeForm, setTypeForm] = useState({ type: '' });
    const [imageFile, setImageFile] = useState(null);
    const [images, setImages] = useState([]);
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);

    

    const [productForm, setProductForm] = useState({
        title: '',
        description: '',
        price: '',
        type: '',
        stock: '',
        rating: 0,
        barcode: '',
        status: 1,
        grapeType: '',
        region: '',
        harvestYear: '',
        pairing: '',
        alcoholContent: ''
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const [tallerForm, setTallerForm] = useState({
        title: '', description: '', price: '', skills: [], link: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    useEffect(() => {
        const fetchUserAuth= async () => {
            try {
                const currentUserResponse = await api.get('/auth/sessions/current');
                if(currentUserResponse.data === 'user not found') {
                    setError(new Error("Not authenticated"));
                }else if(currentUserResponse.data.success) {
                    return
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAuth();
    }, []);
    useEffect(() => {
        const fetchInitialData = async () => {
            if (activeTab === 'productos') {
                await handleSearch();
            } else {
                await fetchData();
            }
        };
        fetchInitialData();
    }, [activeTab, currentPage, searchTerm]);

    useEffect(() => {
        if (activeTab === 'talleres') {
            setFilteredTalleres(talleres);
        }
    }, [talleres, activeTab]);
    
    const fetchData = async () => {
        setLoading(true);
        try {
            let response;
            switch (activeTab) {
                case 'productos':
                    handleSearch()
                case 'talleres':
                    response = await api.get('/api/talleres');
                    setTalleres(response.data);
                    break;
                case 'users':
                    response = await api.get('/api/users');
                    setUsers(response.data);
                    break;
                case 'types':
                    response = await api.get('/api/productos/type');
                    setProductTypes(response.data);
                    break;
                default:
                    break;
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await api.get('/api/nosotros/pictures'); 
                
                setImages(response.data.pictures);
                
            } catch (err) {
                setError(err.message);
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        const fetchText = async () => {
            try {
                const response = await api.get('/api/nosotros/text');
                setText(response.data.text);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchText();
    }, []);

    const handleDeleteImage = async (imageId) => {
        try {
            await api.delete(`/api/nosotros/images/${imageId}`);
            const response = await api.get('/api/nosotros/pictures');
            setImages(response.data.pictures);
        } catch (err) {
            console.log(err);
            
            setError(err.message);
        }
    };

    const handleUpdateText = async () => {
        try {
            await api.patch('/api/nosotros/text', { text });
            alert('Text updated successfully');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            
            if (activeTab === 'images') {
                if (!imageFile) {
                    console.log('No image file selected');
                    return;
                }
                const formData = new FormData();
                formData.append('image', imageFile);
                
                console.log('Image file:', imageFile);
                console.log('FormData entries:', [...formData.entries()]);
                
                try {
                    const response = await api.post('/api/nosotros/images', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    const getPicturesResponse = await api.get('/api/nosotros/pictures');
                    setImages(getPicturesResponse.data.pictures);
                    setImageFile(null);
                    setShowModal(false);
                } catch (err) {
                    console.error('Upload error:', err);
                    setError(err.message);
                }
                return;
            }


            
            if (activeTab === 'productos') {
                const formData = new FormData();
                
                if (editingId) {
                    try {
                        // Update existing product
                    const productData = {};
                    
                    // Handle all fields, including those that might be 0
                    productData.title = String(productForm.title || '').trim();
                    productData.description = String(productForm.description || '').trim();
                    productData.price = Number(productForm.price);
                    productData.type = String(productForm.type || '').trim();
                    productData.stock = Number(productForm.stock);
                    productData.rating = Number(productForm.rating);
                    productData.barCode = String(productForm.barcode || '').trim();
                    productData.status = Number(productForm.status);
                    
                    // Optional fields - only include if they exist and convert to string if needed
                    if (productForm.grapeType != null) productData.grapeType = String(productForm.grapeType).trim();
                    if (productForm.region != null) productData.region = String(productForm.region).trim();
                    if (productForm.harvestYear != null) productData.harvestYear = String(productForm.harvestYear).trim();
                    if (productForm.pairing != null) productData.pairing = String(productForm.pairing).trim();
                    if (productForm.alcoholContent != null) productData.alcoholContent = String(productForm.alcoholContent).trim();

                    // Append all product data
                    Object.entries(productData).forEach(([key, value]) => {
                        formData.append(key, value);
                    });
                    
                    // Append the image file if exists
                    if (imageFile) {
                        formData.append('image', imageFile);
                    }

                    await api.patch(`/api/${activeTab}/${editingId}`, formData); 
                    } catch (error) {
                        console.log(error);
                        
                    }
                } else {
                    // Create new product
                    formData.append('title', productForm.title.trim());
                    formData.append('description', productForm.description.trim());
                    formData.append('price', Number(productForm.price));
                    formData.append('type', productForm.type.trim());
                    formData.append('stock', Number(productForm.stock));
                    formData.append('rating', Number(productForm.rating));
                    formData.append('barCode', productForm.barcode.trim());
                    formData.append('status', Number(productForm.status));
                    formData.append('grapeType', productForm.grapeType.trim());
                    formData.append('region', productForm.region.trim());
                    formData.append('harvestYear', productForm.harvestYear.trim());
                    formData.append('pairing', productForm.pairing.trim());
                    formData.append('alcoholContent', productForm.alcoholContent.trim());

                    if (imageFile) {
                        formData.append('image', imageFile);
                    }

                    await api.post(`/api/${activeTab}`, formData);
                }
            } else if (activeTab === 'talleres') {
                const formData = new FormData();
                
                // Handle basic fields
                formData.append('title', tallerForm.title);
                formData.append('description', tallerForm.description);
                formData.append('price', Number(tallerForm.price));
                formData.append('link', tallerForm.link);

                
                formData.append('skills', tallerForm.skills);
                
                // Append image if exists
                if (imageFile) {
                    formData.append('image', imageFile);
                }

                if (editingId) {
                    await api.patch(`/api/${activeTab}/${editingId}`, formData);
                } else {
                    await api.post(`/api/${activeTab}`, formData);
                }
            } else if (activeTab === 'types'){
                await api.post(`/api/productos/type`, typeForm)
            } 

            fetchData();
            setShowForm(false);
            setEditingId(null);
            setProductForm({
                title: '',
                description: '',
                price: '',
                type: '',
                stock: '',
                rating: 0,
                barcode: '',
                status: 1,
                grapeType: '',
                region: '',
                harvestYear: '',
                pairing: '',
                alcoholContent: ''
            });
            setImageFile(null)
            setTallerForm({ title: '', description: '', price: '', skills: [], link: '' });
            setTypeForm({ type: '' });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
            setLoading(true);
            try {
                if(activeTab === 'types'){
                    await api.delete(`/api/productos/type/${id}`)
                } else {
                    await api.delete(`/api/${activeTab}/${id}`);
                    
                }
                fetchData();
                alert('Elemento eliminado con éxito');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (activeTab === 'productos') {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get('/api/productos', {
                    params: {
                        query: searchTerm,
                        page: currentPage,
                    }
                });
                setProductos(response.data.productos);
                setTotalPages(Math.ceil(response.data.total / 10));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } else if (activeTab === 'talleres') {
            const filtered = talleres.filter(taller => 
                taller.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                taller.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTalleres(filtered);
        } else if (activeTab === 'users') {
            const filtered = users.filter(user => 
                user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setUsers(filtered);
        }
    };
    

    const handleRoleChange = async (userId, newRole) => {
        try {
            if (!userId || !newRole) return; 
            
            await api.patch(`/api/users/changeRol/${userId}`, { 
                role: newRole.toLowerCase() 
            });
            fetchData();
            alert('Rol actualizado con éxito');
        } catch (err) {
            setError(err.message);
            alert('Error al actualizar el rol: ' + err.message);
        }
    };
    const closeForm = async () => {
        setEditingId(null);
        setProductForm({
            title: '',
            description: '',
            price: '',
            type: '',
            stock: '',
            rating: 0,
            barcode: '',
            status: 1,
            grapeType: '',
            region: '',
            harvestYear: '',
            pairing: '',
            alcoholContent: ''
        });
        setTallerForm({ title: '', description: '', price: '', skills: [], link: '' });
        setImageFile(null);
        setShowForm(false);
    }

    if (error) return (
        <div className="notLogged">
            <p>Inicia sesión para ver el dashboard</p>
            <Link to="/login"><button className='Login'>Iniciar sesión</button></Link>
        </div>
    );

    return (
        <div className="dashboard">
            <div className="dashboard-nav">
                <button 
                    className={activeTab === 'productos' ? 'active' : ''} 
                    onClick={() => setActiveTab('productos')}
                >
                    Productos
                </button>
                <button 
                    className={activeTab === 'talleres' ? 'active' : ''} 
                    onClick={() => setActiveTab('talleres')}
                >
                    Talleres
                </button>
                <button 
                    className={activeTab === 'users' ? 'active' : ''} 
                    onClick={() => setActiveTab('users')}
                >
                    Usuarios
                </button>
                <button 
                    className={activeTab === 'types' ? 'active' : ''} 
                    onClick={() => setActiveTab('types')}
                >
                    Tipos de Vino
                </button>
                <button 
                    className={activeTab === 'images' ? 'active' : ''} 
                    onClick={() => setActiveTab('images')}
                >
                    Nosotros Info
                </button>
            </div>

            <div className="dashboard-content">
                {activeTab !== 'users' || activeTab !== 'types' && (
                    <div className="search-section">
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                placeholder={`Buscar ${activeTab}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit">Buscar</button>
                            <button type="button" onClick={() => {
                                setSearchTerm('');
                                if (activeTab === 'productos') {
                                    setCurrentPage(1);
                                    fetchData();
                                } else {
                                    setFilteredTalleres(talleres);
                                }
                            }}>Resetear</button>
                        </form>
                    </div>
                )}

                {activeTab !== 'users' && (
                    <button className="add-button" onClick={() => setShowForm(true)}>
                        <Plus /> Crear
                    </button>
                )}
                {activeTab === 'images' && (
                    <div className="image-upload-section">
                        
                        <div className="text-section">
                            <h2>Texto de Nosotros Page</h2>
                            <textarea 
                                value={text} 
                                onChange={(e) => setText(e.target.value)} 
                                rows="4" 
                                cols="50"
                            />
                            <button onClick={handleUpdateText}><Pencil /></button>
                        </div>
                    </div>
                )}


                {showForm && (
                                    <div className="form-overlay">
                                        <form onSubmit={handleSubmit} className="dashboard-form">
                                        {activeTab === 'productos' && (
                                        <>
                                            <h2>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                                            <input
                                                type="text"
                                                placeholder="Título del producto"
                                                value={productForm.title}
                                                onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                                            />
                                            <textarea
                                                placeholder="Descripción"
                                                value={productForm.description}
                                                onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Precio"
                                                value={productForm.price}
                                                onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Tipo"
                                                value={productForm.type}
                                                onChange={(e) => setProductForm({...productForm, type: e.target.value})}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Stock"
                                                value={productForm.stock}
                                                onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                                            />
                                            
                                            <input
                                                type="text"
                                                placeholder="Código de barras"
                                                value={productForm.barcode}
                                                onChange={(e) => setProductForm({...productForm, barcode: e.target.value})}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Tipo de uva"
                                                value={productForm.grapeType}
                                                onChange={(e) => setProductForm({...productForm, grapeType: e.target.value})}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Región"
                                                value={productForm.region}
                                                onChange={(e) => setProductForm({...productForm, region: e.target.value})}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Año de cosecha"
                                                value={productForm.harvestYear}
                                                onChange={(e) => setProductForm({...productForm, harvestYear: e.target.value})}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Maridaje"
                                                value={productForm.pairing}
                                                onChange={(e) => setProductForm({...productForm, pairing: e.target.value})}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Contenido de alcohol"
                                                value={productForm.alcoholContent}
                                                onChange={(e) => setProductForm({...productForm, alcoholContent: e.target.value})}
                                            />
                                            <div className="image-upload">
                                                <label htmlFor="product-image">Imagen del producto:</label>
                                                <input
                                                    type="file"
                                                    id="product-image"
                                                    accept="image/*"
                                                    onChange={(e) => setImageFile(e.target.files[0])}
                                                />
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'talleres' && (
                                        <>
                                            <h2>Nuevo taller</h2>

                                            <input
                                                type="text"
                                                placeholder="Título del taller"
                                                value={tallerForm.title}
                                                onChange={(e) => setTallerForm({...tallerForm, title: e.target.value})}
                                            />
                                            <textarea
                                                placeholder="Descripción"
                                                value={tallerForm.description}
                                                onChange={(e) => setTallerForm({...tallerForm, description: e.target.value})}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Precio"
                                                value={tallerForm.price}
                                                onChange={(e) => setTallerForm({...tallerForm, price: e.target.value})}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Skills (separadas por coma)"
                                                value={tallerForm.skills.join(',')}
                                                onChange={(e) => setTallerForm({...tallerForm, skills: e.target.value.split(',')})}
                                            />
                                            <input
                                                type="url"
                                                placeholder="Link del taller"
                                                value={tallerForm.link}
                                                onChange={(e) => setTallerForm({...tallerForm, link: e.target.value})}
                                            />
                                            <div className="image-upload">
                                                <label htmlFor="taller-image">Imagen del taller:</label>
                                                <input
                                                    type="file"
                                                    id="taller-image"
                                                    accept="image/*"
                                                    onChange={(e) => setImageFile(e.target.files[0])}
                                                />
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'images' && (
                                        <>
                                            <h2>Subir Nueva Imagen</h2>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setImageFile(e.target.files[0])}
                                            />
                                        </>
                                    )}
                                    {activeTab === 'types' && (
                                        <>
                                            <h2>Nuevo Tipo de Vino</h2>
                                            <input
                                                type="text"
                                                placeholder="Nombre del tipo"
                                                value={typeForm.type}
                                                onChange={(e) => setTypeForm({...typeForm, type: e.target.value})}
                                            />
                                        </>
                                    )}

                                    <div className="form-buttons">
                                        <button type="submit">
                                            {editingId ? 'Actualizar' : 'Crear'}
                                        </button>
                                        <button type="button" onClick={closeForm}>
                                            Cancelar
                                        </button>
                                    </div>
                        </form>
                    </div>
                )}

                <div className="items-grid">
                    {loading ? (
                        <div className="loader"></div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : (
                        <>
                            {activeTab === 'productos' ? productos.map(product => (
                                <div key={product.id} className="item-card">
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                    <p>Precio: ${product.price}</p>
                                    <p>Stock: {product.stock}</p>
                                    <p>Tipo: {product.type}</p>
                                    {product.grapeType && <p>Tipo de uva: {product.grapeType}</p>}
                                    {product.region && <p>Región: {product.region}</p>}
                                    {product.harvestYear && <p>Año de cosecha: {product.harvestYear}</p>}
                                    {product.pairing && <p>Maridaje: {product.pairing}</p>}
                                    {product.alcoholContent && <p>Contenido de alcohol: {product.alcoholContent}</p>}
                                    <div className="card-actions">
                                        <button onClick={() => {
                                            setProductForm(product);
                                            setEditingId(product.id);
                                            setShowForm(true);
                                        }}>
                                            <Pencil />
                                        </button>
                                        <button onClick={() => handleDelete(product.id)}>
                                            <Trash />
                                        </button>
                                    </div>
                                </div>
                            )) : activeTab === 'talleres' ? filteredTalleres.map(taller => (
                                <div key={taller.id} className="item-card">
                                    <h3>{taller.title}</h3>
                                    <p>{taller.description}</p>
                                    <p>Precio: ${taller.price}</p>
                                    <p>Link: {taller.link}</p>
                                    <p>Skills: {taller.skills.join(', ')}</p>
                                    <div className="card-actions">
                                        <button onClick={() => {
                                            setTallerForm(taller);
                                            setEditingId(taller.id);
                                            setShowForm(true);
                                        }}>
                                            <Pencil />
                                        </button>
                                        <button onClick={() => handleDelete(taller.id)}>
                                            <Trash />
                                        </button>
                                    </div>
                                </div>
                            )) : activeTab === 'types' ? productTypes.map(type => (
                                    <div key={type.id} className="item-card">
                                        <h3>{type.type}</h3>
                                        <div className="card-actions">
                                            <button onClick={() => handleDelete(type.id)}>
                                                <Trash />
                                            </button>
                                        </div>
                                    </div>
                            )) : activeTab === 'images' ? images.map(img => (
                                    <div key={img.id} className="image-container">
                                        <img src={img.url} alt={`Imagen ${img.id}`} />
                                        <button onClick={() => handleDeleteImage(img.id)}>
                                            <Trash />
                                        </button>
                                    </div>
                            )) : users.map(user => (
                                <div key={user.id} className="item-card">
                                    <h3>{user.name}</h3>
                                    <p>{user.email}</p>
                                    <div className="user-actions">
                                        <div className="role-section">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            >
                                                <option value="user">Usuario</option>
                                                <option value="admin">Administrador</option>
                                                <option value="owner">Propietario</option>
                                            </select>
                                        </div>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            <Trash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            
                        </>
                    )}
                </div>
                    {activeTab === 'productos' && (
                        <div className="pagination">
                            <button 
                                className={`pageButton ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <span className="page-info">
                                Página {currentPage} de {totalPages || 1}
                            </span>
                            <button 
                                className={`pageButton ${currentPage === totalPages ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                    
            </div>
        </div>
    );
};

export default Dashboard;