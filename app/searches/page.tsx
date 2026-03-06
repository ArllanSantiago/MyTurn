'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Timer, 
  Plus, 
  Radar, 
  Clock, 
  Pause, 
  Play, 
  Trash2, 
  ChevronLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export default function SearchesPage() {
  const [searches, setSearches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const res = await fetch('/api/searches');
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        if (res.ok) setSearches(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSearches();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-500 hover:text-primary transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg text-white">
                <Radar className="w-5 h-5" />
              </div>
              <h1 className="font-display font-bold text-xl text-primary">My Searches</h1>
            </div>
          </div>
          <Link 
            href="/searches/new" 
            className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            New
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {searches.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
            <Radar className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No active searches</h2>
            <p className="text-slate-500 mb-8">Start monitoring attractions to skip the lines.</p>
            <Link 
              href="/searches/new" 
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20"
            >
              <Plus className="w-5 h-5" />
              Create First Search
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searches.map((search) => (
              <motion.div 
                key={search.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400 text-lg">
                      {search.attraction.park.code}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl leading-tight">{search.attraction.name}</h4>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4" />
                        {search.timeWindow} window
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                    search.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
                    search.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {search.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <AlertCircle className="w-3 h-3" />
                    <span>Last checked: Just now</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleStatus(search.id, search.status)}
                      className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                    >
                      {search.status === 'ACTIVE' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button 
                      onClick={() => deleteSearch(search.id)}
                      className="p-2.5 hover:bg-red-50 rounded-xl text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
