import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/index';
import Category from './components/categories/index';
import AddVideoForm from './components/newVideo/index';
import Footer from './components/footer/index';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="" element={<Category />} />
          <Route path="/newvideo" element={<AddVideoForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
