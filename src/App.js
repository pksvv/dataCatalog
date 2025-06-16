import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataCatalogPage from './pages/DataCatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <div className="App">
      <Router basename="/dataCatalog">
        <Routes>
          <Route path="/" element={<DataCatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; 