import React from 'react';

const CategorySelector = ({ categories, selected, toggle, icons }) => {
    return (
        <div className="category-selector">
            {categories.map(category => (
                <div
                    key={category}
                    className={`category-btn ${selected.includes(category) ? 'selected' : ''}`}
                    onClick={() => toggle(category)}
                >
                    <i className={icons[category] || 'fas fa-tag'}></i>
                    {category}
                </div>
            ))}
        </div>
    );
};

export default CategorySelector;
