'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Timer, 
  Zap, 
  Users, 
  Bell, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Menu
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Timer className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-primary font-display">My Turn</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="font-medium hover:text-primary transition-colors" suppressHydrationWarning>Features</a>
              <a href="#how-it-works" className="font-medium hover:text-primary transition-colors" suppressHydrationWarning>How it Works</a>
              <a href="#pricing" className="font-medium hover:text-primary transition-colors" suppressHydrationWarning>Pricing</a>
              <Link href="/login" className="font-medium hover:text-primary transition-colors" suppressHydrationWarning>Login</Link>
              <Link 
                href="/register" 
                className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-primary/20"
                suppressHydrationWarning
              >
                Get Started
              </Link>
            </div>
            <div className="md:hidden">
              <Menu className="w-6 h-6" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center lg:text-left flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 mb-6 backdrop-blur-sm"
            >
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-bold uppercase tracking-wider">New: Automatic Booking v2.0</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 font-display"
            >
              Skip the Lines, <br/>
              <span className="text-secondary">Enjoy the Magic.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-200 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              The ultimate SaaS companion for theme park enthusiasts. We handle your Lightning Lane reservations automatically, so you can spend your time making memories, not staring at your phone.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link 
                href="/register" 
                className="w-full sm:w-auto bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all group"
                suppressHydrationWarning
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-4 rounded-xl font-bold text-lg border border-white/30 transition-all" suppressHydrationWarning>
                Watch Demo
              </button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:w-1/2 mt-16 lg:mt-0 relative"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/disney-plaza/800/1000" 
                alt="Disney Plaza" 
                className="rounded-2xl shadow-inner object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm">Reservation Confirmed!</span>
                </div>
                <p className="text-xs text-slate-500">Space Mountain secured for 2:45 PM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Powerful Automation</h2>
            <h3 className="text-4xl font-extrabold mb-4 font-display">Designed for the Die-Hard Fan</h3>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We built My Turn because we were tired of being glued to our phones during family vacations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">Instant Re-Booking</h4>
              <p className="text-slate-600">If a ride breaks down, we&apos;re already finding your next pass before you even know it.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">Large Party Support</h4>
              <p className="text-slate-600">Coordinate bookings for up to 12 people effortlessly with group syncing.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Bell className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">Smart Notifications</h4>
              <p className="text-slate-600">Get text or push alerts only when a booking is made. No more noise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Simple & Automated</h2>
              <h3 className="text-4xl font-extrabold mb-6 font-display">How My Turn Works</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Connect Your Account</h4>
                    <p className="text-slate-600">Securely link your theme park credentials to our encrypted vault.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Set Your Preferences</h4>
                    <p className="text-slate-600">Choose the rides you want and your preferred time windows.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Relax and Enjoy</h4>
                    <p className="text-slate-600">Our bots monitor availability 24/7 and book the second a slot opens up.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/disney-main-street/800/600" 
                  alt="Disney Main Street Plaza" 
                  className="rounded-3xl shadow-2xl border-8 border-white"
                />
                <div className="absolute -top-4 -right-4 bg-secondary text-white p-4 rounded-2xl shadow-lg font-bold">
                  90% Faster Booking
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Timer className="text-white w-6 h-6" />
            <span className="text-2xl font-bold tracking-tight font-display">My Turn</span>
          </div>
          <p className="text-slate-400 mb-8">© 2024 My Turn SaaS. All rights reserved. Not affiliated with any theme park brand.</p>
          <div className="flex justify-center space-x-6 text-slate-400">
            <a href="#" className="hover:text-white transition-colors" suppressHydrationWarning>Privacy</a>
            <a href="#" className="hover:text-white transition-colors" suppressHydrationWarning>Terms</a>
            <a href="#" className="hover:text-white transition-colors" suppressHydrationWarning>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
