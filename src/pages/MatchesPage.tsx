import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Match, Item } from '../types';
import { format } from 'date-fns';

interface MatchWithItems extends Match {
  lostItem: Item;
  foundItem: Item;
}

const MatchesPage: React.FC = () => {
  const [matches, setMatches] = useState<MatchWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'rejected'>('pending');

  useEffect(() => {
    // Mock data - replace with API call
    const mockMatches: MatchWithItems[] = [
      {
        id: '1',
        lostItemId: '1',
        foundItemId: '2',
        similarity: 85,
        status: 'pending',
        createdAt: new Date('2025-01-10'),
        lostItem: {
          id: '1',
          userId: '1',
          type: 'lost',
          title: 'iPhone 14 Pro',
          description: 'Black iPhone 14 Pro with blue case',
          category: 'Electronics',
          location: { address: 'Central Mall' },
          dateReported: new Date('2025-01-09'),
          dateLostFound: new Date('2025-01-08'),
          images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
          status: 'active',
          contactInfo: { email: 'user@example.com', preferredContact: 'email' },
          tags: ['phone', 'iphone']
        },
        foundItem: {
          id: '2',
          userId: '2',
          type: 'found',
          title: 'Black iPhone with Case',
          description: 'Found black iPhone with blue protective case',
          category: 'Electronics',
          location: { address: 'Central Mall Food Court' },
          dateReported: new Date('2025-01-09'),
          dateLostFound: new Date('2025-01-08'),
          images: ['https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg'],
          status: 'active',
          contactInfo: { email: 'finder@example.com', preferredContact: 'email' },
          tags: ['phone', 'iphone', 'case']
        }
      },
      {
        id: '2',
        lostItemId: '3',
        foundItemId: '4',
        similarity: 92,
        status: 'confirmed',
        createdAt: new Date('2025-01-08'),
        verifiedBy: 'admin',
        lostItem: {
          id: '3',
          userId: '1',
          type: 'lost',
          title: 'Brown Leather Wallet',
          description: 'Brown leather wallet with cards',
          category: 'Accessories',
          location: { address: 'University Library' },
          dateReported: new Date('2025-01-07'),
          dateLostFound: new Date('2025-01-06'),
          images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg'],
          status: 'resolved',
          contactInfo: { email: 'user@example.com', preferredContact: 'email' },
          tags: ['wallet', 'leather']
        },
        foundItem: {
          id: '4',
          userId: '3',
          type: 'found',
          title: 'Leather Wallet',
          description: 'Found brown leather wallet',
          category: 'Accessories',
          location: { address: 'University Library 2nd Floor' },
          dateReported: new Date('2025-01-07'),
          dateLostFound: new Date('2025-01-06'),
          images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg'],
          status: 'resolved',
          contactInfo: { email: 'finder2@example.com', preferredContact: 'email' },
          tags: ['wallet', 'brown']
        }
      }
    ];

    setTimeout(() => {
      setMatches(mockMatches);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredMatches = matches.filter(match => match.status === activeTab);

  const handleMatchAction = (matchId: string, action: 'confirm' | 'reject') => {
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, status: action === 'confirm' ? 'confirmed' : 'rejected' }
        : match
    ));
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 80) return 'text-green-600 bg-green-100';
    if (similarity >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Item Matches</h1>
          <p className="text-gray-600">Review potential matches for your lost and found items</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'pending'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending ({matches.filter(m => m.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('confirmed')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'confirmed'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Confirmed ({matches.filter(m => m.status === 'confirmed').length})
              </button>
              <button
                onClick={() => setActiveTab('rejected')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'rejected'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Rejected ({matches.filter(m => m.status === 'rejected').length})
              </button>
            </nav>
          </div>
        </div>

        {/* Matches List */}
        {filteredMatches.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} matches
            </h3>
            <p className="text-gray-600">
              {activeTab === 'pending' 
                ? "You don't have any pending matches to review."
                : `You don't have any ${activeTab} matches.`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredMatches.map((match) => (
              <div key={match.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(match.status)}
                    <span className="font-medium text-gray-900 capitalize">{match.status} Match</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSimilarityColor(match.similarity)}`}>
                      {match.similarity}% Match
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(match.createdAt, 'MMM d, yyyy')}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Lost Item */}
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-center mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Lost Item
                      </span>
                    </div>
                    <div className="flex space-x-4">
                      {match.lostItem.images.length > 0 && (
                        <img
                          src={match.lostItem.images[0]}
                          alt={match.lostItem.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{match.lostItem.title}</h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{match.lostItem.description}</p>
                        <p className="text-xs text-gray-500">{match.lostItem.location.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Found Item */}
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex items-center mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Found Item
                      </span>
                    </div>
                    <div className="flex space-x-4">
                      {match.foundItem.images.length > 0 && (
                        <img
                          src={match.foundItem.images[0]}
                          alt={match.foundItem.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{match.foundItem.title}</h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{match.foundItem.description}</p>
                        <p className="text-xs text-gray-500">{match.foundItem.location.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                  <div className="flex space-x-4">
                    <Link
                      to={`/item/${match.lostItem.id}`}
                      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Lost Item
                    </Link>
                    <Link
                      to={`/item/${match.foundItem.id}`}
                      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Found Item
                    </Link>
                  </div>

                  {match.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleMatchAction(match.id, 'reject')}
                        className="inline-flex items-center px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleMatchAction(match.id, 'confirm')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm Match
                      </button>
                    </div>
                  )}

                  {match.status === 'confirmed' && (
                    <div className="text-sm text-green-600 font-medium">
                      ✓ Match confirmed - Contact details shared
                    </div>
                  )}

                  {match.status === 'rejected' && (
                    <div className="text-sm text-red-600 font-medium">
                      ✗ Match rejected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;