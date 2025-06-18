import React, { useState } from 'react';

const TagSelector = ({ tags, selected, toggle }) => {
    const [search, setSearch] = useState('');
    const filtered = tags.filter(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className="tag-selector">
            <input placeholder="Search tags..." value={search} onChange={e => setSearch(e.target.value)} />
            <div className="tags">
                {filtered.slice(0, 20).map(tag => (
                    <span key={tag} className={`tag ${selected.includes(tag) ? 'selected' : ''}`} onClick={() => toggle(tag)}>
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;
