import React from 'react';

const RecommendationCard = ({ item, icon, onClick }) => {
    return (
        <div className="content-card" onClick={onClick}>
            <div className="card-img" style={{ backgroundColor: item.color }}>
                {item.title.charAt(0)}
                <div className="match-score"><i className="fas fa-check-circle"></i>{Math.round(item.score)}% Match</div>
            </div>
            <div className="card-body">
                <h3>{item.title}</h3>
                <div className="card-meta">
                    <span><i className={icon}></i>{item.category}</span>
                    <span><i className="fas fa-fire"></i>{item.popularity}%</span>
                </div>
                <div className="card-tags">
                    {item.tags.map(tag => <span key={tag} className="card-tag">#{tag}</span>)}
                </div>
            </div>
        </div>
    );
};

export default RecommendationCard;
