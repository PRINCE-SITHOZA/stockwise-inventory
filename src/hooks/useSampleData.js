import { useState, useEffect } from 'react';

// Fallback data in case the JSON file doesn't load
const fallbackData = {
  users: [
    {
      id: 1,
      name: "Prince Musa",
      email: "prince@sa-warehouse.co.za",
      password: "admin123",
      role: "admin",
      department: "Management",
      phone: "+27 11 123 4567",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@sa-warehouse.co.za",
      password: "manager123",
      role: "manager",
      department: "Inventory",
      phone: "+27 11 123 4568",
      createdAt: "2024-02-20"
    }
  ],
  products: [
    {
      id: 1,
      name: "Samsung Galaxy S24",
      category: "Electronics",
      price: 15999.99,
      stock: 45,
      minStock: 10,
      supplier: "Samsung SA",
      sku: "ELEC-SAMS-S24-001",
      lastRestocked: "2024-10-01"
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: 22999.99,
      stock: 28,
      minStock: 8,
      supplier: "Apple South Africa",
      sku: "ELEC-APPL-15P-002",
      lastRestocked: "2024-09-28"
    }
  ],
  inventory: [],
  sales: [],
  activityLog: [],
  analytics: {
    monthlyRevenue: [],
    categoryDistribution: [],
    topProducts: []
  }
};

export const useSampleData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to import the sample data
        let importedData;
        try {
          importedData = await import('../data/sampleData.json');
        } catch (importError) {
          console.warn('Sample data file not found, using fallback data');
          importedData = { default: fallbackData };
        }
        
        // Simulate API call delay
        setTimeout(() => {
          setData(importedData.default || fallbackData);
          setLoading(false);
          
          // Also store in localStorage for persistence
          localStorage.setItem('sa-warehouse-data', JSON.stringify(importedData.default || fallbackData));
        }, 1000);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load sample data');
        setData(fallbackData);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem('sa-warehouse-data', JSON.stringify(newData));
  };

  const addUser = (user) => {
    if (!data) return null;
    
    const newUser = {
      ...user,
      id: Math.max(...data.users.map(u => u.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedData = {
      ...data,
      users: [...data.users, newUser]
    };
    
    updateData(updatedData);
    return newUser;
  };

  const addProduct = (product) => {
    if (!data) return null;
    
    const newProduct = {
      ...product,
      id: Math.max(...data.products.map(p => p.id)) + 1,
      lastRestocked: new Date().toISOString().split('T')[0]
    };
    
    const updatedData = {
      ...data,
      products: [...data.products, newProduct]
    };
    
    updateData(updatedData);
    return newProduct;
  };

  const recordActivity = (user, action, details) => {
    if (!data) return null;
    
    const newActivity = {
      id: Math.max(...(data.activityLog?.map(a => a.id) || [0])) + 1,
      user,
      action,
      timestamp: new Date().toISOString(),
      details
    };
    
    const updatedData = {
      ...data,
      activityLog: [newActivity, ...(data.activityLog || []).slice(0, 49)]
    };
    
    updateData(updatedData);
  };

  return {
    data,
    loading,
    error,
    addUser,
    addProduct,
    recordActivity,
    updateData
  };
};
