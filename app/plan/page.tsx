'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Timer, 
  CheckCircle2, 
  Star, 
  Zap, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const PLANS = [
  {
    id: 'FREE',
    name: 'Free',
    price: '$0',
    desc: 'Basic park monitoring',
    features: [
      'Real-time wait time alerts',
      'View standby levels for 1 park',
    ],
    notIncluded: [
      'Auto-skipping features',
      'Multi-park access',
    ],
    buttonText: 'Start for free',
    popular: false,
  },
  {
    id: 'DAY',
    name: 'Day Pass',
    price: '$25',
    period: '/day',
    desc: 'Perfect for a single visit',
    features: [
      'Unlimited skips for 24 hours',
      'Multi-park access included',
      'AI-optimized route planning',
      'Priority support',
    ],
    buttonText: 'Select Plan',
    popular: false,
  },
  {
    id: 'WEEK',
    name: 'Week Pass',
    price: '$45',
    period: '/7 days',
    desc: 'The ultimate vacation companion',
    features: [
      'Everything in Day Pass',
      'Full week of unlimited skips',
      'Family sharing (up to 5 people)',
      'Early reservation access',
    ],
    buttonText: 'Get Best Value',
    popular: true,
  },
];

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Timer className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight font-display text-primary">My Turn</span>
            </Link>
            <Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight font-display">
            Simple, transparent <span className="text-primary">pricing.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stop waiting in lines. Choose the plan that fits your vacation style and start skipping the wait today.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`relative flex flex-col p-8 bg-white border rounded-3xl transition-all hover:shadow-xl ${
                plan.popular 
                ? 'border-secondary border-4 scale-105 shadow-2xl z-10' 
                : 'border-slate-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  Best Value
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.desc}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-slate-500">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.notIncluded?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <ShieldCheck className="text-slate-200 w-5 h-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 px-4 rounded-xl font-bold transition-all ${
                plan.popular
                ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:opacity-95'
                : 'border-2 border-slate-200 hover:bg-slate-50'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <h2 className="text-3xl font-bold text-center mb-12 font-display">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <h4 className="text-lg font-bold mb-2">How does auto-skipping work?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                My Turn uses proprietary AI to monitor park traffic in real-time. When it detects a drop in wait times, it automatically reserves your spot.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <h4 className="text-lg font-bold mb-2">Can I cancel my Week Pass?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Passes are activated upon first use. You can request a full refund any time before your first skip is used.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
