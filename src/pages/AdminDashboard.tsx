import React, { useState, useEffect } from 'react';
import { Users, Package, CheckCircle, AlertTriangle, TrendingUp, Eye, Ban, Trash2 } from 'lucide-react';
import { Item, User as UserType } from '../types';
import { format } from 'date-fns';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    activeMatches: 0,
    resolvedItems: 0
  });
  const [recentItems, setRecentItems] = useState<Item[]>([]);
  const [recentUsers, setRecentUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API calls
    const mockStats = {
      totalUsers: 1247,
      totalItems: 3456,
      activeMatches: 89,
      resolvedItems: 2341
    };

    const mockRecentItems: Item[] = [
      {
        id: '1',
        userId: '1',
        type: 'lost',
        title: 'iPhone 14 Pro',
        description: 'Black iPhone with blue case',
        category: 'Electronics',
        location: { address: 'Central Mall' },
        dateReported: new Date('2025-01-10'),
        dateLostFound: new Date('2025-01-09'),
        images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
        status: 'active',
        contactInfo: { email: 'user@example.com', preferredContact: 'email' },
        tags: ['phone', 'iphone']
      }
    ];

    const mockRecentUsers: UserType[] = [
      {
        id: '1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        role: 'user',
        createdAt: new Date('2025-01-10')
      }
    ];

    setTimeout(() => {
      setStats(mockStats);
      setRecentItems(mockRecentItems);
      setRecentUsers(mockRecentUsers);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, items, and system operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalItems.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Matches</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeMatches}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.resolvedItems.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Items</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    {item.images.length > 0 && (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.category} • {item.location.address}</p>
                      <p className="text-xs text-gray-500">{format(item.dateReported, 'MMM d, yyyy')}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors duration-200">
                        <Ban className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role} • {format(user.createdAt, 'MMM d, yyyy')}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors duration-200">
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
              <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">View Analytics</h3>
              <p className="text-sm text-gray-600">Detailed system analytics and reports</p>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
              <Users className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Manage Users</h3>
              <p className="text-sm text-gray-600">User management and permissions</p>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
              <Package className="w-6 h-6 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">System Settings</h3>
              <p className="text-sm text-gray-600">Configure system parameters</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;