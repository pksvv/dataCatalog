import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataCatalogPage from './pages/DataCatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dataCatalog" element={<DataCatalogPage />} />
          <Route path="/dataCatalog/product/:id" element={<ProductDetailPage />} />
          <Route path="/" element={<DataCatalogPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; 