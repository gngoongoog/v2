// src/components/Categories.js
// a
import React from 'react';
import { List, Grid, Filter } from 'lucide-react';

const Categories = ({ selectedCategory, setSelectedCategory, categories, viewMode, setViewMode, setCurrentPage }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'جميع المنتجات' : category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {viewMode === 'grid' ? <List size={16} /> : <Grid size={16} />}
            </button>
            <Filter size={16} className="text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
