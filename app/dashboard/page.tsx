'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Timer, 
  Plus, 
  History, 
  Users, 
  Settings, 
  LogOut, 
  Radar, 
  Clock, 
  Star,
  ChevronRight,
  Pause,
  Play,
  Trash2,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';

export default function DashboardPage() {
  const [searches, setSearches] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize polling service
        fetch('/api/init').catch(console.error);

        const [searchesRes, bookingsRes] = await Promise.all([
          fetch('/api/searches'),
          fetch('/api/bookings')
        ]);
        
        if (searchesRes.status === 401 || bookingsRes.status === 401) {
          router.push('/login');
          return;
        }

        if (searchesRes.ok) setSearches(await searchesRes.json());
        if (bookingsRes.ok) setBookings(await bookingsRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    try {
      const res = await fetch(`/api/searches/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setSearches(searches.map(s => s.id === id ? { ...s, status: newStatus } : s));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSearch = async (id: string) => {
    if (!confirm('Are you sure you want to delete this search?')) return;
    try {
      const res = await fetch(`/api/searches/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSearches(searches.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <Timer className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight font-display text-primary">My Turn</span>
          </div>
        </div>
        
        <nav className="flex-1 px-3 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary/10 text-primary font-semibold">
            <Radar className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/searches" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <Plus className="w-5 h-5" />
            My Searches
          </Link>
          <Link href="/history" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <History className="w-5 h-5" />
            Booking History
          </Link>
          <Link href="/party" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <Users className="w-5 h-5" />
            My Party
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors mt-1"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Dashboard</h1>
            <p className="text-slate-500">Welcome back! Here&apos;s your park overview.</p>
          </div>
          <Link 
            href="/searches/new" 
            className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            New Search
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Radar className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Searches</p>
            <h3 className="text-3xl font-bold">{searches.filter(s => s.status === 'ACTIVE').length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Bookings</p>
            <h3 className="text-3xl font-bold">{bookings.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Star className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Plan Status</p>
            <h3 className="text-3xl font-bold">Premium</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Searches */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Active Searches</h2>
              <Link href="/searches" className="text-primary text-sm font-semibold hover:underline">View all</Link>
            </div>
            <div className="space-y-4">
              {searches.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center">
                  <Radar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No active searches. Start one to skip the lines!</p>
                </div>
              ) : (
                searches.map((search) => (
                  <motion.div 
                    key={search.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400">
                          {search.attraction.park.code}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg leading-tight">{search.attraction.name}</h4>
                          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {search.timeWindow} window
                          </p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${
                        search.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {search.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-400">Updated just now</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleStatus(search.id, search.status)}
                          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                        >
                          {search.status === 'ACTIVE' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => deleteSearch(search.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          {/* Recent Bookings */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Bookings</h2>
              <Link href="/history" className="text-primary text-sm font-semibold hover:underline">View all</Link>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {bookings.length === 0 ? (
                <div className="p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No bookings yet. They&apos;ll appear here once confirmed.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{booking.attraction.name}</p>
                          <p className="text-xs text-slate-500">
                            {new Date(booking.returnTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
