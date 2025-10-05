import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const PredictiveAnalytics = () => {
  const [predictions, setPredictions] = useState([]);
  const [seasonalTrends, setSeasonalTrends] = useState([]);
  const [demandForecast, setDemandForecast] = useState([]);

  // Predictive data
  const predictiveData = {
    salesForecast: [
      { month: 'Jan', actual: 1200000, predicted: 1180000 },
      { month: 'Feb', actual: 1350000, predicted: 1320000 },
      { month: 'Mar', actual: 1420000, predicted: 1450000 },
      { month: 'Apr', actual: 1280000, predicted: 1250000 },
      { month: 'May', actual: 1560000, predicted: 1580000 },
      { month: 'Jun', actual: 1680000, predicted: 1650000 },
      { month: 'Jul', actual: 1750000, predicted: 1720000 },
      { month: 'Aug', actual: 1820000, predicted: 1850000 },
      { month: 'Sep', actual: 1950000, predicted: 1980000 },
      { month: 'Oct', actual: 2080000, predicted: 2100000 },
      { month: 'Nov', predicted: 2250000 },
      { month: 'Dec', predicted: 2450000 },
      { month: 'Jan 2025', predicted: 2600000 },
      { month: 'Feb 2025', predicted: 2750000 }
    ],
    inventoryPredictions: [
      { product: 'Samsung A54', current: 15, predicted: 8, risk: 'Medium' },
      { product: 'Koo Beans', current: 8, predicted: 2, risk: 'High' },
      { product: 'Office Chair', current: 12, predicted: 18, risk: 'Low' },
      { product: 'Game Laptop', current: 0, predicted: 0, risk: 'Critical' },
      { product: 'Woolworths T-shirt', current: 25, predicted: 32, risk: 'Low' }
    ],
    seasonalTrends: [
      { quarter: 'Q1', electronics: 45, furniture: 32, clothing: 23 },
      { quarter: 'Q2', electronics: 52, furniture: 28, clothing: 20 },
      { quarter: 'Q3', electronics: 48, furniture: 35, clothing: 17 },
      { quarter: 'Q4', electronics: 65, furniture: 25, clothing: 10 }
    ]
  };

  const formatZAR = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return '#10B981';
      case 'Medium': return '#F59E0B';
      case 'High': return '#EF4444';
      case 'Critical': return '#DC2626';
      default: return '#6B7280';
    }
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
      padding: "1.5rem",
      borderRadius: "1rem",
      border: "1px solid #334155",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      marginBottom: "2rem"
    }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.5rem", color: "#F8FAFC" }}>
        ?? Predictive Analytics & AI Insights
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        {/* Sales Forecast */}
        <div>
          <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem", color: "#F8FAFC" }}>
            Sales Forecast vs Actual
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={predictiveData.salesForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" tickFormatter={value => `R${value / 1000000}M`} />
              <Tooltip formatter={value => [formatZAR(value), 'Revenue']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Actual Sales"
                dot={{ fill: '#3B82F6', r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#10B981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="AI Prediction"
                dot={{ fill: '#10B981', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Risk Assessment */}
        <div>
          <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem", color: "#F8FAFC" }}>
            Inventory Risk Assessment
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {predictiveData.inventoryPredictions.map((item, index) => (
              <div key={index} style={{
                padding: "0.75rem",
                backgroundColor: "#0F172A",
                borderRadius: "0.5rem",
                border: `1px solid ${getRiskColor(item.risk)}30`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: "500", color: "#F8FAFC" }}>
                    {item.product}
                  </span>
                  <span style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: getRiskColor(item.risk) + "20",
                    color: getRiskColor(item.risk),
                    borderRadius: "0.25rem",
                    fontWeight: "600"
                  }}>
                    {item.risk}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#94A3B8" }}>
                  <span>Current: {item.current}</span>
                  <span>Predicted: {item.predicted}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seasonal Trends */}
      <div>
        <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem", color: "#F8FAFC" }}>
          Seasonal Category Trends
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={predictiveData.seasonalTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="quarter" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip />
            <Legend />
            <Bar dataKey="electronics" fill="#3B82F6" name="Electronics" />
            <Bar dataKey="furniture" fill="#10B981" name="Furniture" />
            <Bar dataKey="clothing" fill="#EC4899" name="Clothing" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insights */}
      <div style={{
        marginTop: "1.5rem",
        padding: "1rem",
        backgroundColor: "#0F172A",
        borderRadius: "0.5rem",
        border: "1px solid #334155"
      }}>
        <h4 style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", color: "#F8FAFC" }}>
          ?? AI Recommendations
        </h4>
        <div style={{ fontSize: "0.75rem", color: "#94A3B8", lineHeight: "1.5" }}>
          • <strong>Reorder Koo Beans</strong> - High risk of stockout in 2 weeks<br/>
          • <strong>Promote Electronics</strong> - Expected 15% growth in Q4<br/>
          • <strong>Optimize Furniture stock</strong> - Seasonal demand decreasing<br/>
          • <strong>Consider Game Laptop alternative</strong> - Continuous supply issues
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
