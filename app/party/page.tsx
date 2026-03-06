'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Timer, 
  Users, 
  Plus, 
  ChevronLeft, 
  UserPlus, 
  Trash2, 
  CheckCircle2,
  User
} from 'lucide-react';

export default function PartyPage() {
  const [members, setMembers] = useState([
    { id: '1', name: 'John Doe (Me)', status: 'ACTIVE', isMe: true },
    { id: '2', name: 'Jane Doe', status: 'ACTIVE', isMe: false },
    { id: '3', name: 'Billy Smith', status: 'PENDING', isMe: false },
  ]);

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
                <Users className="w-5 h-5" />
              </div>
              <h1 className="font-display font-bold text-xl text-primary">My Party</h1>
            </div>
          </div>
          <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
            <UserPlus className="w-4 h-4" />
            Invite
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold">Party Members</h2>
            <p className="text-sm text-slate-500">Manage who you can book attractions for.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {members.map((member) => (
              <div key={member.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">{member.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-2 h-2 rounded-full ${member.status === 'ACTIVE' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{member.status}</span>
                    </div>
                  </div>
                </div>
                {!member.isMe && (
                  <button className="p-2 hover:bg-red-50 rounded-xl text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-primary">How Party Booking Works</h3>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              When you start a search, you can select any active party member. We&apos;ll automatically attempt to book for everyone selected in a single reservation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
