import React, { useEffect, useState } from 'react';
import './App.css';
import { contentDatabase } from './data/contentDatabase';
import CategorySelector from './components/CategorySelector';
import TagSelector from './components/TagSelector';
import RecommendationCard from './components/RecommendationCard';
import Profile  from './components/Profile';
const categoryIcons = {
    Technology: 'fas fa-laptop-code',
    Cooking: 'fas fa-utensils',
    Design: 'fas fa-drafting-compass',
    Finance: 'fas fa-chart-line',
    Health: 'fas fa-heartbeat',
    Business: 'fas fa-briefcase',
    Education: 'fas fa-graduation-cap',
    Art: 'fas fa-palette',
    Lifestyle: 'fas fa-leaf',
    Travel: 'fas fa-plane',
    Psychology: 'fas fa-brain',
};

function App() {
    const allCategories = [...new Set(contentDatabase.map(item => item.category))];
    const allTags = [...new Set(contentDatabase.flatMap(item => item.tags))];

    const [userPreferences, setUserPreferences] = useState({
        selectedCategories: [],
        selectedTags: [],
        popularityWeight: 50,
        similarityWeight: 70,
        viewedContent: []
    });

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        updateRecommendations();
    }, [userPreferences]);

    const toggleCategory = (category) => {
        setUserPreferences(prev => ({
            ...prev,
            selectedCategories: prev.selectedCategories.includes(category)
                ? prev.selectedCategories.filter(c => c !== category)
                : [...prev.selectedCategories, category]
        }));
    };

    const toggleTag = (tag) => {
        setUserPreferences(prev => ({
            ...prev,
            selectedTags: prev.selectedTags.includes(tag)
                ? prev.selectedTags.filter(t => t !== tag)
                : [...prev.selectedTags, tag]
        }));
    };

    const calculateRecommendationScore = (item) => {
        const categoryScore = userPreferences.selectedCategories.length === 0 ||
            userPreferences.selectedCategories.includes(item.category) ? 1 : 0;

        let tagScore = 0.5;
        if (userPreferences.selectedTags.length > 0) {
            const matchingTags = item.tags.filter(tag => userPreferences.selectedTags.includes(tag));
            tagScore = matchingTags.length / userPreferences.selectedTags.length;
        }

        const popularityScore = item.popularity / 100;

        let similarityScore = 0.5;
        if (userPreferences.viewedContent.length > 0) {
            const similarities = userPreferences.viewedContent.map(viewedId => {
                const viewedItem = contentDatabase.find(c => c.id === viewedId);
                if (!viewedItem) return 0;

                const catMatch = item.category === viewedItem.category ? 1 : 0;
                const commonTags = item.tags.filter(tag => viewedItem.tags.includes(tag)).length;
                const tagOverlap = (commonTags / Math.max(1, item.tags.length + viewedItem.tags.length - commonTags));

                return (catMatch + tagOverlap) / 2;
            });
            similarityScore = similarities.reduce((sum, val) => sum + val, 0) / similarities.length;
        }

        const popW = userPreferences.popularityWeight / 100;
        const simW = userPreferences.similarityWeight / 100;
        const baseMatch = (categoryScore * 0.6) + (tagScore * 0.4);
        const finalScore = (baseMatch * 0.4) + (popularityScore * popW * 0.3) + (similarityScore * simW * 0.3);
        return finalScore * 100;
    };

    const updateRecommendations = () => {
        const scored = contentDatabase.map(item => ({
            ...item,
            score: calculateRecommendationScore(item)
        }));
        const sorted = scored.sort((a, b) => b.score - a.score).slice(0, 8);
        setRecommendations(sorted);
    };

    const handleViewed = (id) => {
        setUserPreferences(prev => ({
            ...prev,
            viewedContent: prev.viewedContent.includes(id) ? prev.viewedContent : [...prev.viewedContent, id]
        }));
    };

    return (
        <div className="App">
            <h1>Personalized Content Recommender</h1>
            <div className="controls">
                <Profile/>
                <CategorySelector categories={allCategories} selected={userPreferences.selectedCategories} toggle={toggleCategory} icons={categoryIcons} />
                <TagSelector tags={allTags} selected={userPreferences.selectedTags} toggle={toggleTag} />
                <div className="sliders">
                    <label>Popularity Weight: {userPreferences.popularityWeight}%</label>
                    <input type="range" min="0" max="100" value={userPreferences.popularityWeight} onChange={e => setUserPreferences({ ...userPreferences, popularityWeight: +e.target.value })} />
                    <label>Similarity Weight: {userPreferences.similarityWeight}%</label>
                    <input type="range" min="0" max="100" value={userPreferences.similarityWeight} onChange={e => setUserPreferences({ ...userPreferences, similarityWeight: +e.target.value })} />
                </div>
            </div>
            <div className="recommendations">
                {recommendations.map(item => (
                    <RecommendationCard key={item.id} item={item} icon={categoryIcons[item.category]} onClick={() => handleViewed(item.id)} />
                ))}
            </div>
        </div>
    );
}

export default App;
