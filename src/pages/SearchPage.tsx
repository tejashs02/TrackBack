import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Item, ITEM_CATEGORIES } from '../types';
import { format } from 'date-fns';

const SearchPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all' as 'all' | 'lost' | 'found',
    category: '',
    location: '',
    dateFrom: '',
    dateTo: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Mock data - replace with API call
    const mockItems: Item[] = [
      {
        id: '1',
        userId: '1',
        type: 'lost',
        title: 'iPhone 14 Pro',
        description: 'Black iPhone 14 Pro with a blue case. Lost near the food court.',
        category: 'Electronics',
        location: {
          address: 'Central Mall, Food Court Area'
        },
        dateReported: new Date('2025-01-10'),
        dateLostFound: new Date('2025-01-09'),
        images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
        status: 'active',
        contactInfo: {
          email: 'user@example.com',
          preferredContact: 'email'
        },
        tags: ['phone', 'iphone', 'electronics'],
        reward: 50
      },
      {
        id: '2',
        userId: '2',
        type: 'found',
        title: 'Brown Leather Wallet',
        description: 'Found a brown leather wallet with some cards inside. No cash taken.',
        category: 'Accessories',
        location: {
          address: 'University Library, 2nd Floor'
        },
        dateReported: new Date('2025-01-08'),
        dateLostFound: new Date('2025-01-08'),
        images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg'],
        status: 'active',
        contactInfo: {
          email: 'finder@example.com',
          preferredContact: 'email'
        },
        tags: ['wallet', 'leather', 'cards']
      },
      {
        id: '3',
        userId: '3',
        type: 'lost',
        title: 'Blue Backpack',
        description: 'Navy blue backpack with laptop compartment. Contains important documents.',
        category: 'Bags',
        location: {
          address: 'Metro Station Platform 2'
        },
        dateReported: new Date('2025-01-07'),
        dateLostFound: new Date('2025-01-06'),
        images: ['https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg'],
        status: 'active',
        contactInfo: {
          email: 'student@example.com',
          preferredContact: 'email'
        },
        tags: ['backpack', 'blue', 'laptop']
      },
      {
        id: '4',
        userId: '4',
        type: 'found',
        title: 'Silver Watch',
        description: 'Found a silver wristwatch near the park entrance.',
        category: 'Accessories',
        location: {
          address: 'City Park Main Entrance'
        },
        dateReported: new Date('2025-01-06'),
        dateLostFound: new Date('2025-01-05'),
        images: ['https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg'],
        status: 'active',
        contactInfo: {
          email: 'parkgoer@example.com',
          preferredContact: 'email'
        },
        tags: ['watch', 'silver', 'jewelry']
      }
    ];

    setTimeout(() => {
      setItems(mockItems);
      setFilteredItems(mockItems);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = items;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(item => item.type === filters.type);
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(item =>
        item.location.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter(item =>
        item.dateLostFound >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(item =>
        item.dateLostFound <= new Date(filters.dateTo)
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, filters, items]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      category: '',
      location: '',
      dateFrom: '',
      dateTo: ''
    });
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Lost & Found Items</h1>
          <p className="text-gray-600">Find items that match what you're looking for</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Items</option>
                    <option value="lost">Lost Items</option>
                    <option value="found">Found Items</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {ITEM_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters to find more items.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                {item.images.length > 0 && (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.type === 'lost' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.type === 'lost' ? 'Lost' : 'Found'}
                    </span>
                    <span className="text-xs text-gray-500">{item.category}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="truncate">{item.location.address}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{format(item.dateLostFound, 'MMM d, yyyy')}</span>
                  </div>

                  {item.reward && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Reward: ${item.reward}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/item/${item.id}`}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Link>
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;