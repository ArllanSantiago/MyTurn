'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Timer, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Users, 
  Clock, 
  MapPin,
  Zap,
  Sun,
  CloudSun,
  Sunset,
  Moon,
  Calendar,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TIME_WINDOWS = [
  { id: 'ASAP', name: 'ASAP', icon: Zap, label: 'Immediate', desc: 'Book the first available slot' },
  { id: 'MORNING', name: 'Morning', icon: Sun, label: '8AM - 12PM', desc: 'Early morning slots' },
  { id: 'AFTERNOON', name: 'Afternoon', icon: CloudSun, label: '12PM - 4PM', desc: 'Mid-day slots' },
  { id: 'EVENING', name: 'Evening', icon: Sunset, label: '4PM - 8PM', desc: 'Late afternoon slots' },
  { id: 'NIGHT', name: 'Night', icon: Moon, label: '8PM - Close', desc: 'Evening and night slots' },
  { id: 'ANYTIME', name: 'Anytime', icon: Calendar, label: 'All Day', desc: 'Any available slot today' },
];

export default function NewSearchPage() {
  const [step, setStep] = useState(1);
  const [parks, setParks] = useState<any[]>([]);
  const [selectedPark, setSelectedPark] = useState<any>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null);
  const [selectedTimeWindow, setSelectedTimeWindow] = useState('ASAP');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const res = await fetch('/api/parks');
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setParks(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchParks();
  }, [router]);

  const handleCreateSearch = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/searches', {
        method: 'POST',
        body: JSON.stringify({
          attractionId: selectedAttraction.id,
          timeWindow: selectedTimeWindow,
          partyMemberIds: [] // Default to just the user for now
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
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
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <Timer className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-primary">New Search</span>
          </div>
          <button 
            onClick={() => router.back()}
            className="text-slate-500 hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  step >= s ? 'text-primary' : 'text-slate-400'
                }`}>
                  {s === 1 ? 'Park' : s === 2 ? 'Attraction' : 'Configure'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-slate-200 rounded-full relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold font-display">Select a Park</h2>
              {parks.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
                  <MapPin className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No parks available</h3>
                  <p className="text-slate-500">We couldn&apos;t find any parks in our database. Please try again later.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {parks.map((park) => (
                    <button
                      key={park.id}
                      onClick={() => {
                        setSelectedPark(park);
                        setStep(2);
                      }}
                      className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary hover:shadow-lg transition-all text-left group"
                    >
                      <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{park.name}</h3>
                        <p className="text-sm text-slate-500">{park.attractions.length} Attractions</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-display">Select Attraction</h2>
                <button 
                  onClick={() => setStep(1)}
                  className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Change Park
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedPark?.attractions.map((attr: any) => (
                  <button
                    key={attr.id}
                    onClick={() => {
                      setSelectedAttraction(attr);
                      setStep(3);
                    }}
                    className="flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-primary hover:shadow-lg transition-all overflow-hidden text-left group"
                  >
                    <div className="h-32 bg-slate-100 relative">
                      <img 
                        src={attr.imageUrl || 'https://picsum.photos/seed/ride/400/300'} 
                        alt={attr.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg leading-tight">{attr.name}</h3>
                      <div className="flex items-center gap-1 mt-2 text-emerald-600">
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="text-xs font-bold">Lightning Lane Eligible</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-display">Configure Search</h2>
                <button 
                  onClick={() => setStep(2)}
                  className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Change Attraction
                </button>
              </div>

              {/* Time Window Selection */}
              <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Select Time Window
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TIME_WINDOWS.map((window) => (
                    <button
                      key={window.id}
                      onClick={() => setSelectedTimeWindow(window.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        selectedTimeWindow === window.id 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-slate-100 hover:border-slate-200 text-slate-500'
                      }`}
                    >
                      <window.icon className={`w-6 h-6 mb-2 ${selectedTimeWindow === window.id ? 'text-primary' : 'text-slate-400'}`} />
                      <span className="font-bold text-sm">{window.name}</span>
                      <span className="text-[10px] uppercase tracking-wider opacity-60">{window.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Summary & Submit */}
              <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={selectedAttraction?.imageUrl} 
                      alt={selectedAttraction?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Confirming Search</p>
                    <h3 className="text-2xl font-bold font-display leading-tight">{selectedAttraction?.name}</h3>
                    <p className="text-slate-400 text-sm mt-1">{selectedPark?.name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Window</p>
                    <p className="font-bold">{TIME_WINDOWS.find(w => w.id === selectedTimeWindow)?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Party</p>
                    <p className="font-bold">Me Only</p>
                  </div>
                </div>

                <button
                  onClick={handleCreateSearch}
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Start Search'}
                  {!submitting && <Zap className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
