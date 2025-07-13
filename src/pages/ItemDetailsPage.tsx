import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, Mail, Phone, Tag, DollarSign, Flag, Heart } from 'lucide-react';
import { Item } from '../types';
import { format } from 'date-fns';

const ItemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Get the correct item based on ID
    const mockItems: Item[] = [
      {
        id: '1',
        userId: '1',
        type: 'lost',
        title: 'iPhone 14 Pro',
        description: 'Black iPhone 14 Pro with a blue case. Lost near the food court around 3 PM.',
        category: 'Electronics',
        location: { address: 'Central Mall, Food Court Area' },
        dateReported: new Date('2025-01-10'),
        dateLostFound: new Date('2025-01-09'),
        images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
        status: 'active',
        contactInfo: { email: 'user@example.com', preferredContact: 'email' },
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
        location: { address: 'University Library, 2nd Floor' },
        dateReported: new Date('2025-01-08'),
        dateLostFound: new Date('2025-01-08'),
        images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg'],
        status: 'active',
        contactInfo: { email: 'finder@example.com', preferredContact: 'email' },
        tags: ['wallet', 'leather', 'cards']
      },
      {
        id: '3',
        userId: '3',
        type: 'lost',
        title: 'Blue Backpack',
        description: 'Navy blue backpack with laptop compartment. Contains important documents.',
        category: 'Bags',
        location: { address: 'Metro Station Platform 2' },
        dateReported: new Date('2025-01-07'),
        dateLostFound: new Date('2025-01-06'),
        images: ['https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg'],
        status: 'active',
        contactInfo: { email: 'student@example.com', preferredContact: 'email' },
        tags: ['backpack', 'blue', 'laptop']
      },
      {
        id: '4',
        userId: '4',
        type: 'found',
        title: 'Silver Watch',
        description: 'Found a silver wristwatch near the park entrance.',
        category: 'Accessories',
        location: { address: 'City Park Main Entrance' },
        dateReported: new Date('2025-01-06'),
        dateLostFound: new Date('2025-01-05'),
        images: ['https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg'],
        status: 'active',
        contactInfo: { email: 'parkgoer@example.com', preferredContact: 'email' },
        tags: ['watch', 'silver', 'jewelry']
      }
    ];

    // Find the specific item by ID
    const foundItem = mockItems.find(item => item.id === id);

    setTimeout(() => {
      setItem(foundItem || null);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item not found</h2>
          <p className="text-gray-600 mb-6">The item you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/search')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Images */}
            <div>
              {item.images.length > 0 ? (
                <div>
                  <img
                    src={item.images[currentImageIndex]}
                    alt={item.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  {item.images.length > 1 && (
                    <div className="flex space-x-2 mt-4">
                      {item.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                            currentImageIndex === index
                              ? 'border-blue-500'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${item.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  item.type === 'lost' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                </span>
                <span className="text-sm text-gray-500">{item.category}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>

              {item.reward && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Reward: ${item.reward}
                  </span>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">{item.location.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Date {item.type === 'lost' ? 'Lost' : 'Found'}
                    </p>
                    <p className="text-gray-600">{format(item.dateLostFound, 'MMMM d, yyyy')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Date Reported</p>
                    <p className="text-gray-600">{format(item.dateReported, 'MMMM d, yyyy')}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Tag className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Contact Owner
                </button>
                <button className="inline-flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="inline-flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Flag className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <span className="font-medium text-gray-900">Preferred Contact Method</span>
              </div>
              <div className="ml-8 space-y-2">
                {item.contactInfo.preferredContact === 'email' && item.contactInfo.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Email (Preferred)</span>
                  </div>
                )}
                {item.contactInfo.preferredContact === 'phone' && item.contactInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Phone (Preferred)</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Contact details will be shared when you click "Contact Owner"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;


/*import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, Mail, Phone, Tag, DollarSign, Flag, Heart } from 'lucide-react';
import { Item } from '../types';
import { format } from 'date-fns';

const ItemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Mock data - replace with API call
    const mockItem: Item = {
      id: id || '1',
      userId: '1',
      type: 'lost',
      title: 'iPhone 14 Pro',
      description: 'Black iPhone 14 Pro with a blue case. Lost near the food court around 3 PM. The phone has a small scratch on the back and a screen protector. It contains important work contacts and family photos. Please contact me if found.',
      category: 'Electronics',
      location: {
        address: 'Central Mall, Food Court Area, Near Starbucks'
      },
      dateReported: new Date('2025-01-10'),
      dateLostFound: new Date('2025-01-09'),
      images: [
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
        'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg'
      ],
      status: 'active',
      contactInfo: {
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        preferredContact: 'email'
      },
      tags: ['phone', 'iphone', 'electronics', 'black', 'blue case'],
      reward: 50
    };

    setTimeout(() => {
      setItem(mockItem);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item not found</h2>
          <p className="text-gray-600 mb-6">The item you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/search')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button }
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Images }
            <div>
              {item.images.length > 0 ? (
                <div>
                  <img
                    src={item.images[currentImageIndex]}
                    alt={item.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  {item.images.length > 1 && (
                    <div className="flex space-x-2 mt-4">
                      {item.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                            currentImageIndex === index
                              ? 'border-blue-500'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${item.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>

            {/* Details }
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  item.type === 'lost' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                </span>
                <span className="text-sm text-gray-500">{item.category}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>

              {item.reward && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Reward: ${item.reward}
                  </span>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">{item.location.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Date {item.type === 'lost' ? 'Lost' : 'Found'}
                    </p>
                    <p className="text-gray-600">{format(item.dateLostFound, 'MMMM d, yyyy')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Date Reported</p>
                    <p className="text-gray-600">{format(item.dateReported, 'MMMM d, yyyy')}</p>
                  </div>
                </div>
              </div>

              {/* Tags }
              {item.tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Tag className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons }
              <div className="flex space-x-4 mb-6">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Contact Owner
                </button>
                <button className="inline-flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="inline-flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Flag className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Description }
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Contact Information }
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <span className="font-medium text-gray-900">Preferred Contact Method</span>
              </div>
              <div className="ml-8 space-y-2">
                {item.contactInfo.preferredContact === 'email' && item.contactInfo.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Email (Preferred)</span>
                  </div>
                )}
                {item.contactInfo.preferredContact === 'phone' && item.contactInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Phone (Preferred)</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Contact details will be shared when you click "Contact Owner"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
*/