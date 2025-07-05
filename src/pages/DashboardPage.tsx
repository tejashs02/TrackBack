import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MapPin, Calendar, Eye, Edit, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Item } from '../types';
import { format } from 'date-fns';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockItems: Item[] = [
      {
        id: '1',
        userId: user?.id || '1',
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
          email: user?.email,
          preferredContact: 'email'
        },
        tags: ['phone', 'iphone', 'electronics'],
        reward: 50
      },
      {
        id: '2',
        userId: user?.id || '1',
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
        status: 'matched',
        contactInfo: {
          email: user?.email,
          preferredContact: 'email'
        },
        tags: ['wallet', 'leather', 'cards']
      }
    ];

    setTimeout(() => {
      setItems(mockItems);
      setLoading(false);
    }, 1000);
  }, [user]);

  const filteredItems = items.filter(item => item.type === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'matched': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertCircle className="w-4 h-4" />;
      case 'matched': return <Search className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Manage your lost and found items</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lost Items</p>
                <p className="text-2xl font-bold text-gray-900">
                  {items.filter(item => item.type === 'lost').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Found Items</p>
                <p className="text-2xl font-bold text-gray-900">
                  {items.filter(item => item.type === 'found').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Matches</p>
                <p className="text-2xl font-bold text-gray-900">
                  {items.filter(item => item.status === 'matched').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {items.filter(item => item.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            to="/report"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Report New Item
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Items
          </Link>
          <Link
            to="/matches"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            View Matches
          </Link>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('lost')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'lost'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Lost Items ({items.filter(item => item.type === 'lost').length})
              </button>
              <button
                onClick={() => setActiveTab('found')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'found'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Found Items ({items.filter(item => item.type === 'found').length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab} items yet
                </h3>
                <p className="text-gray-600 mb-6">
                  {activeTab === 'lost' 
                    ? "You haven't reported any lost items yet."
                    : "You haven't reported any found items yet."
                  }
                </p>
                <Link
                  to="/report"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Report {activeTab === 'lost' ? 'Lost' : 'Found'} Item
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                    {item.images.length > 0 && (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1 capitalize">{item.status}</span>
                        </span>
                        <span className="text-xs text-gray-500">{item.category}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      
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
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="inline-flex items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;