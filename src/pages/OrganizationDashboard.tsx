import React, { useState, useEffect } from 'react';
import { Building, Package, Users, TrendingUp, MapPin, Calendar, Eye, Edit } from 'lucide-react';
import { Item } from '../types';
import { format } from 'date-fns';

const OrganizationDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    activeItems: 0,
    resolvedItems: 0,
    totalStaff: 0
  });
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API calls
    const mockStats = {
      totalItems: 156,
      activeItems: 23,
      resolvedItems: 133,
      totalStaff: 8
    };

    const mockItems: Item[] = [
      {
        id: '1',
        userId: '1',
        type: 'found',
        title: 'Black Laptop Bag',
        description: 'Found in Terminal 2, Gate B12',
        category: 'Bags',
        location: { address: 'Airport Terminal 2, Gate B12' },
        dateReported: new Date('2025-01-10'),
        dateLostFound: new Date('2025-01-10'),
        images: ['https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg'],
        status: 'active',
        contactInfo: { email: 'security@airport.com', preferredContact: 'email' },
        tags: ['laptop', 'bag', 'black'],
        organizationId: 'org1'
      },
      {
        id: '2',
        userId: '2',
        type: 'found',
        title: 'Silver Watch',
        description: 'Found in security checkpoint area',
        category: 'Accessories',
        location: { address: 'Airport Security Checkpoint A' },
        dateReported: new Date('2025-01-09'),
        dateLostFound: new Date('2025-01-09'),
        images: ['https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg'],
        status: 'resolved',
        contactInfo: { email: 'security@airport.com', preferredContact: 'email' },
        tags: ['watch', 'silver', 'jewelry'],
        organizationId: 'org1'
      }
    ];

    setTimeout(() => {
      setStats(mockStats);
      setItems(mockItems);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading organization dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Building className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Organization Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage your organization's lost & found operations</p>
        </div>

        {/* Organization Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">International Airport Authority</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 Airport Blvd, Terminal Complex</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>✓ Verified Organization</span>
                <span>Airport</span>
                <span>Member since 2023</span>
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.resolvedItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Staff Members</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStaff}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Items</h2>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
              Add New Item
            </button>
          </div>
          <div className="p-6">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
                <p className="text-gray-600">Start by adding found items to your inventory.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    {item.images.length > 0 && (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'active' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{item.location.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{format(item.dateLostFound, 'MMM d, yyyy')}</span>
                        </div>
                        <span className="capitalize">{item.category}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <TrendingUp className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600 mb-4">View detailed reports and analytics for your lost & found operations.</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              View Analytics →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Users className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Staff Management</h3>
            <p className="text-gray-600 mb-4">Manage staff access and permissions for your organization.</p>
            <button className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
              Manage Staff →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Package className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulk Import</h3>
            <p className="text-gray-600 mb-4">Import multiple items at once using CSV or Excel files.</p>
            <button className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
              Import Items →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;