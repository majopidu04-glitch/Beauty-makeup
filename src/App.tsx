import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/ToastContainer';
import { PRODUCTS } from './data/products';
import { Product } from './types';

const StoreContent: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSearch = () => {
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
      // Focus on search input after scroll
      setTimeout(() => {
        const input = catalogEl.querySelector('input');
        if (input) input.focus();
      }, 400);
    }
  };

  const handleExploreClick = () => {
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-stone-900 selection:bg-[#F3E7C4] selection:text-stone-900 font-sans">
      {/* 1. Slim Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Bar Contract Navbar */}
      <Navbar
        onSelectCategory={handleSelectCategory}
        onOpenSearch={handleOpenSearch}
      />

      {/* 3. Main Storefront Content */}
      <main className="flex-1">
        {/* Editorial Luxury Hero */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Product Catalog with Categories, Search & Filters */}
        <Catalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenDetail={(product: Product) => setSelectedProductForDetail(product)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Brand Story & Philosophy */}
        <BrandPhilosophy />

        {/* Customer Proof & Verified Reviews */}
        <CustomerReviews />
      </main>

      {/* 4. Minimalist Luxury Footer */}
      <Footer />

      {/* 5. Modals, Drawers & Overlays */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
      />

      <CartDrawer />

      <CheckoutModal />

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <StoreContent />
    </CartProvider>
  );
}
