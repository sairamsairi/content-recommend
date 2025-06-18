import React, { useState, useEffect } from 'react';
import { Film, Book, Play, Star, Heart, Clock, TrendingUp, User, Settings } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('movies');
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
      favoriteGenres: ['Action', 'Sci-Fi', 'Thriller'],
      watchTime: '2h 30m',
      readingGoal: 24,
      currentStreak: 7
    }
  });

  // Mock data for different content types
  const [moviesData, setMoviesData] = useState([
    {
      id: 1,
      title: 'The Matrix',
      year: 1999,
      genre: 'Sci-Fi',
      rating: 4.5,
      poster: '/api/placeholder/150/220',
      status: 'watched',
      userRating: 5,
      watchedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Inception',
      year: 2010,
      genre: 'Thriller',
      rating: 4.8,
      poster: '/api/placeholder/150/220',
      status: 'watchlist',
      userRating: null,
      addedDate: '2024-02-01'
    },
    {
      id: 3,
      title: 'Interstellar',
      year: 2014,
      genre: 'Sci-Fi',
      rating: 4.6,
      poster: '/api/placeholder/150/220',
      status: 'watched',
      userRating: 4,
      watchedDate: '2024-01-20'
    }
  ]);

  const [booksData, setBooksData] = useState([
    {
      id: 1,
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Sci-Fi',
      rating: 4.7,
      cover: '/api/placeholder/150/220',
      status: 'read',
      userRating: 5,
      pages: 688,
      readDate: '2024-01-10',
      progress: 100
    },
    {
      id: 2,
      title: 'The Martian',
      author: 'Andy Weir',
      genre: 'Sci-Fi',
      rating: 4.4,
      cover: '/api/placeholder/150/220',
      status: 'reading',
      userRating: null,
      pages: 369,
      progress: 65
    },
    {
      id: 3,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      genre: 'Sci-Fi',
      rating: 4.6,
      cover: '/api/placeholder/150/220',
      status: 'to-read',
      userRating: null,
      pages: 496,
      progress: 0
    }
  ]);

  const [netflixData, setNetflixData] = useState([
    {
      id: 1,
      title: 'Stranger Things',
      type: 'series',
      season: 4,
      episode: 5,
      totalEpisodes: 9,
      genre: 'Horror',
      rating: 4.8,
      thumbnail: '/api/placeholder/300/180',
      watchProgress: 75,
      lastWatched: '2024-02-15',
      status: 'watching'
    },
    {
      id: 2,
      title: 'The Crown',
      type: 'series',
      season: 6,
      episode: 10,
      totalEpisodes: 10,
      genre: 'Drama',
      rating: 4.5,
      thumbnail: '/api/placeholder/300/180',
      watchProgress: 100,
      lastWatched: '2024-02-10',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Red Notice',
      type: 'movie',
      duration: '118 min',
      genre: 'Action',
      rating: 4.2,
      thumbnail: '/api/placeholder/300/180',
      watchProgress: 45,
      lastWatched: '2024-02-12',
      status: 'paused'
    }
  ]);

  const [reviewsData, setReviewsData] = useState([
    {
      id: 1,
      itemTitle: 'The Matrix',
      itemType: 'movie',
      rating: 5,
      review: 'A groundbreaking sci-fi masterpiece that redefined cinema. The action sequences and philosophical themes are perfectly balanced.',
      date: '2024-01-15',
      helpful: 12,
      sentiment: 'positive'
    },
    {
      id: 2,
      itemTitle: 'Dune',
      itemType: 'book',
      rating: 5,
      review: 'Herbert created an incredibly detailed universe. The world-building is phenomenal and the political intrigue keeps you engaged.',
      date: '2024-01-10',
      helpful: 8,
      sentiment: 'positive'
    },
    {
      id: 3,
      itemTitle: 'Stranger Things S4',
      itemType: 'netflix',
      rating: 4,
      review: 'Great continuation of the series. The 80s nostalgia hits perfectly and the character development is solid.',
      date: '2024-02-15',
      helpful: 15,
      sentiment: 'positive'
    }
  ]);

  const handleRating = (itemId, rating, type) => {
    if (type === 'movies') {
      setMoviesData(prev => prev.map(item => 
        item.id === itemId ? { ...item, userRating: rating } : item
      ));
    } else if (type === 'books') {
      setBooksData(prev => prev.map(item => 
        item.id === itemId ? { ...item, userRating: rating } : item
      ));
    }
  };

  const StarRating = ({ rating, onRate, readonly = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${!readonly ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => !readonly && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const MoviesSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Movies</h2>
        <div className="flex space-x-4 text-sm text-gray-600">
          <span>Watched: {moviesData.filter(m => m.status === 'watched').length}</span>
          <span>Watchlist: {moviesData.filter(m => m.status === 'watchlist').length}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moviesData.map(movie => (
          <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                movie.status === 'watched' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
              }`}>
                {movie.status === 'watched' ? 'Watched' : 'Watchlist'}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{movie.year} • {movie.genre}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Rating:</span>
                  <StarRating rating={movie.rating} readonly />
                  <span className="text-sm text-gray-600">({movie.rating})</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Your Rating:</span>
                  <StarRating 
                    rating={movie.userRating || 0} 
                    onRate={(rating) => handleRating(movie.id, rating, 'movies')}
                  />
                </div>
              </div>

              {movie.status === 'watched' && (
                <p className="text-xs text-gray-500 mt-2">
                  Watched on {new Date(movie.watchedDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const BooksSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Books</h2>
        <div className="flex space-x-4 text-sm text-gray-600">
          <span>Read: {booksData.filter(b => b.status === 'read').length}</span>
          <span>Reading: {booksData.filter(b => b.status === 'reading').length}</span>
          <span>To Read: {booksData.filter(b => b.status === 'to-read').length}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksData.map(book => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={book.cover} 
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                book.status === 'read' ? 'bg-green-500 text-white' : 
                book.status === 'reading' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
              }`}>
                {book.status === 'read' ? 'Read' : book.status === 'reading' ? 'Reading' : 'To Read'}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
              <p className="text-gray-600 text-sm mb-3">{book.genre} • {book.pages} pages</p>
              
              {book.status === 'reading' && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{book.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${book.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Rating:</span>
                  <StarRating rating={book.rating} readonly />
                  <span className="text-sm text-gray-600">({book.rating})</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Your Rating:</span>
                  <StarRating 
                    rating={book.userRating || 0} 
                    onRate={(rating) => handleRating(book.id, rating, 'books')}
                  />
                </div>
              </div>

              {book.status === 'read' && (
                <p className="text-xs text-gray-500 mt-2">
                  Read on {new Date(book.readDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const NetflixSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Netflix Activity</h2>
        <div className="flex space-x-4 text-sm text-gray-600">
          <span>Watching: {netflixData.filter(n => n.status === 'watching').length}</span>
          <span>Completed: {netflixData.filter(n => n.status === 'completed').length}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {netflixData.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                item.status === 'watching' ? 'bg-red-500 text-white' : 
                item.status === 'completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
              }`}>
                {item.status === 'watching' ? 'Watching' : item.status === 'completed' ? 'Completed' : 'Paused'}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="w-full bg-gray-300 rounded-full h-1 mb-2">
                  <div 
                    className="bg-red-600 h-1 rounded-full transition-all duration-300" 
                    style={{ width: `${item.watchProgress}%` }}
                  ></div>
                </div>
                <p className="text-white text-xs">{item.watchProgress}% complete</p>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.genre}</p>
              
              {item.type === 'series' ? (
                <p className="text-gray-600 text-sm mb-3">
                  Season {item.season}, Episode {item.episode} of {item.totalEpisodes}
                </p>
              ) : (
                <p className="text-gray-600 text-sm mb-3">
                  Movie • {item.duration}
                </p>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Rating:</span>
                  <StarRating rating={item.rating} readonly />
                  <span className="text-sm text-gray-600">({item.rating})</span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Last watched: {new Date(item.lastWatched).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ReviewsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Reviews</h2>
        <div className="text-sm text-gray-600">
          Total Reviews: {reviewsData.length}
        </div>
      </div>
      
      <div className="space-y-4">
        {reviewsData.map(review => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{review.itemTitle}</h3>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    review.itemType === 'movie' ? 'bg-blue-100 text-blue-800' :
                    review.itemType === 'book' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {review.itemType.charAt(0).toUpperCase() + review.itemType.slice(1)}
                  </span>
                  <StarRating rating={review.rating} readonly />
                  <span className="text-sm text-gray-600">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{review.helpful} helpful</span>
                </button>
              </div>
              
              <div className={`px-2 py-1 rounded text-xs font-semibold ${
                review.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                review.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {review.sentiment}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{userData.name}</h1>
                <p className="text-gray-600">{userData.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-600">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {userData.preferences.watchTime} today
                  </span>
                  <span className="text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    {userData.preferences.currentStreak} day streak
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            {[
              { id: 'movies', label: 'Movies', icon: Film },
              { id: 'books', label: 'Books', icon: Book },
              { id: 'netflix', label: 'Netflix', icon: Play },
              { id: 'reviews', label: 'Reviews', icon: Star }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-gray-50">
          {activeTab === 'movies' && <MoviesSection />}
          {activeTab === 'books' && <BooksSection />}
          {activeTab === 'netflix' && <NetflixSection />}
          {activeTab === 'reviews' && <ReviewsSection />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;