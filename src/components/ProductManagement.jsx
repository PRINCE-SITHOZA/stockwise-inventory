import React, { useState, useEffect } from 'react';
import './ProductManagement.css';

const ProductManagement = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [notification, setNotification] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Sample initial data
    const initialProducts = [
        { id: 1, name: 'Laptop', sku: 'LP-001', category: 'electronics', price: 999.99, quantity: 15, description: 'High-performance laptop' },
        { id: 2, name: 'T-Shirt', sku: 'TS-001', category: 'clothing', price: 19.99, quantity: 100, description: 'Cotton t-shirt' },
        { id: 3, name: 'JavaScript Book', sku: 'BK-001', category: 'books', price: 29.99, quantity: 25, description: 'Learn JavaScript programming' }
    ];

    useEffect(() => {
        // Load products from localStorage or use initial data
        const savedProducts = localStorage.getItem('warehouseProducts');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(initialProducts);
            localStorage.setItem('warehouseProducts', JSON.stringify(initialProducts));
        }
    }, []);

    const showFeature = (feature) => {
        const notifications = {
            'view': `Viewing ${products.length} products`,
            'add': () => setShowAddModal(true),
            'edit': 'Select a product to edit',
            'reports': `Generating report for ${products.length} products`,
            'export': `Exporting ${products.length} products to CSV`
        };

        if (feature === 'add') {
            notifications[feature]();
        } else {
            showNotification(notifications[feature]);
        }
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newProduct = {
            id: Date.now(), // Simple ID generation
            name: formData.get('productName'),
            sku: formData.get('productSKU'),
            category: formData.get('productCategory'),
            price: parseFloat(formData.get('productPrice')),
            quantity: parseInt(formData.get('productQuantity')),
            description: formData.get('productDescription')
        };

        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        localStorage.setItem('warehouseProducts', JSON.stringify(updatedProducts));
        
        showNotification('Product added successfully!');
        setShowAddModal(false);
        e.target.reset();
    };

    const refreshData = () => {
        // Simulate data refresh
        const refreshedProducts = [...products];
        setProducts(refreshedProducts);
        showNotification('Data refreshed successfully!');
    };

    const closeWindow = () => {
        if (window.confirm('Are you sure you want to close the window?')) {
            showNotification('Window closed - in a real app this would close the window');
        }
    };

    const deleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const updatedProducts = products.filter(product => product.id !== productId);
            setProducts(updatedProducts);
            localStorage.setItem('warehouseProducts', JSON.stringify(updatedProducts));
            showNotification('Product deleted successfully!');
        }
    };

    const exportToCSV = () => {
        const headers = ['ID', 'Name', 'SKU', 'Category', 'Price', 'Quantity', 'Description'];
        const csvData = products.map(product => [
            product.id,
            product.name,
            product.sku,
            product.category,
            product.price,
            product.quantity,
            product.description
        ]);

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += headers.join(',') + '\\n';
        csvData.forEach(row => {
            csvContent += row.join(',') + '\\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "products_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Products exported to CSV successfully!');
    };

    return (
        <div className="product-management">
            <div className="container">
                <div className="header">
                    <h1>SA Warehouse - Product Management</h1>
                    <p>This is the products management interface</p>
                </div>

                <div className="content">
                    {/* Statistics Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>Total Products</h3>
                            <p className="stat-number">{products.length}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Total Value</h3>
                            <p className="stat-number">${products.reduce((sum, product) => sum + (product.price * product.quantity), 0).toFixed(2)}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Low Stock</h3>
                            <p className="stat-number">{products.filter(p => p.quantity < 10).length}</p>
                        </div>
                    </div>

                    <h2>Features Available:</h2>
                    
                    <div className="features-grid">
                        <div className="feature-card" onClick={() => showFeature('view')}>
                            <div className="feature-icon">??</div>
                            <h3>View All Products</h3>
                            <p>Browse and search through all product data with advanced filtering options</p>
                        </div>

                        <div className="feature-card" onClick={() => showFeature('add')}>
                            <div className="feature-icon">?</div>
                            <h3>Add New Products</h3>
                            <p>Create new product entries with detailed information and specifications</p>
                        </div>

                        <div className="feature-card" onClick={() => showFeature('edit')}>
                            <div className="feature-icon">??</div>
                            <h3>Edit Products</h3>
                            <p>Modify existing product details, pricing, and inventory information</p>
                        </div>

                        <div className="feature-card" onClick={() => showFeature('reports')}>
                            <div className="feature-icon">??</div>
                            <h3>Generate Reports</h3>
                            <p>Create comprehensive reports on inventory, sales, and performance</p>
                        </div>

                        <div className="feature-card" onClick={exportToCSV}>
                            <div className="feature-icon">??</div>
                            <h3>Export Data</h3>
                            <p>Export product data in various formats (CSV, Excel, PDF)</p>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="products-table-section">
                        <h3>Current Products ({products.length})</h3>
                        <div className="table-container">
                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>SKU</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.sku}</td>
                                            <td>{product.category}</td>
                                            <td>${product.price}</td>
                                            <td className={product.quantity < 10 ? 'low-stock' : ''}>
                                                {product.quantity}
                                            </td>
                                            <td>
                                                <button className="btn-small btn-warning">Edit</button>
                                                <button 
                                                    className="btn-small btn-danger"
                                                    onClick={() => deleteProduct(product.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="button-group">
                        <button className="btn btn-primary" onClick={refreshData}>Refresh Data</button>
                        <button className="btn btn-secondary" onClick={closeWindow}>Close Window</button>
                    </div>
                </div>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="modal" onClick={() => setShowAddModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-btn" onClick={() => setShowAddModal(false)}>&times;</span>
                        <h2>Add New Product</h2>
                        <form onSubmit={handleAddProduct}>
                            <div className="form-group">
                                <label htmlFor="productName">Product Name</label>
                                <input type="text" id="productName" name="productName" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productSKU">SKU</label>
                                <input type="text" id="productSKU" name="productSKU" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productCategory">Category</label>
                                <select id="productCategory" name="productCategory" required>
                                    <option value="">Select Category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="books">Books</option>
                                    <option value="home">Home & Garden</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="productPrice">Price ($)</label>
                                <input type="number" id="productPrice" name="productPrice" step="0.01" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productQuantity">Quantity</label>
                                <input type="number" id="productQuantity" name="productQuantity" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productDescription">Description</label>
                                <textarea id="productDescription" name="productDescription" rows="3"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Product</button>
                        </form>
                    </div>
                </div>
            )}

            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}
        </div>
    );
};

export default ProductManagement;
