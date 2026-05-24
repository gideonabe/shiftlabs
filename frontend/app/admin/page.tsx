"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/app/api/client';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Activity,
  DollarSign,
  Zap,
  ArrowLeft,
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [analytics, setAnalytics] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [analyticsRes, usersRes] = await Promise.all([
        apiClient.getAnalytics(),
        apiClient.getUsers({ limit: 10 }),
      ]);
      setAnalytics(analyticsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-neutral-600">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-4 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-6 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ArrowLeft size={20} /> Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-neutral-600">Monitor platform activity and manage users</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card variant="elevated">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-600 text-sm mb-2">Total Users</p>
                    <p className="text-3xl font-bold text-foreground">
                      {analytics?.total_users || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-600 text-sm mb-2">Active Gigs</p>
                    <p className="text-3xl font-bold text-foreground">
                      {analytics?.active_gigs || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-accent-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-600 text-sm mb-2">Total Volume</p>
                    <p className="text-3xl font-bold text-foreground">
                      ${(analytics?.total_volume || 0).toFixed(0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-600 text-sm mb-2">Flagged Content</p>
                    <p className="text-3xl font-bold text-foreground">
                      {analytics?.flagged_items || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Users */}
            <div className="lg:col-span-2">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.length > 0 ? (
                      users.map((u) => (
                        <div
                          key={u.id}
                          className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-foreground">{u.name}</p>
                            <p className="text-sm text-neutral-600">{u.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              u.verified
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-neutral-200 text-neutral-700'
                            }`}>
                              {u.verified ? 'Verified' : 'Pending'}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                // Handle user action
                              }}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral-600 text-center py-8">No users yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Platform Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-neutral-600">Completion Rate</p>
                      <p className="font-bold">{analytics?.completion_rate || 0}%</p>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500"
                        style={{ width: `${analytics?.completion_rate || 0}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-neutral-600">User Growth</p>
                      <p className="font-bold">+{analytics?.user_growth || 0}%</p>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-500"
                        style={{ width: `${Math.min(analytics?.user_growth || 0, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-neutral-600">Avg. Rating</p>
                      <p className="font-bold">{analytics?.avg_rating || 0}/5.0</p>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(analytics?.avg_rating || 0) * 20}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
