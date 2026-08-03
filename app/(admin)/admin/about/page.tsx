"use client";

import React, { useState } from "react";
import { 
  Plus, 
  MapPin, 
  Zap, 
  Edit3, 
  Trash2, 
  GripVertical,
  Target,
  ArrowRight
} from "lucide-react";

const MOCK_MILESTONES = [
  { id: 1, year: "2024", title: "Global Expansion", description: "Expanded operations into 3 new continents." },
  { id: 2, year: "2025", title: "AI Integration", description: "Successfully rolled out AI-driven workflows across all core products." },
];

const MOCK_CAPABILITIES = [
  { id: 1, name: "Advanced Analytics", level: "Expert", status: "Active" },
  { id: 2, name: "Cloud Infrastructure", level: "Intermediate", status: "Scaling" },
  { id: 3, name: "UX Engineering", level: "Expert", status: "Active" },
];

export default function AboutAdminPage() {
  const [activeTab, setActiveTab] = useState<'milestones' | 'capabilities'>('milestones');

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-zinc-900">About Page Content</h1>
            <p className="text-sm text-zinc-500 mt-2 font-medium tracking-wide">Manage company milestones and core capabilities</p>
          </div>
          
          <div className="flex bg-zinc-100/80 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('milestones')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'milestones' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              Milestones
            </button>
            <button 
              onClick={() => setActiveTab('capabilities')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'capabilities' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              Capabilities
            </button>
          </div>
        </header>

        {/* Content Section */}
        <div className="mt-8">
          {activeTab === 'milestones' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-zinc-800 flex items-center gap-2">
                  <MapPin className="text-zinc-400" size={18} />
                  Timeline Milestones
                </h2>
                <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors">
                  <Plus size={16} /> Add Milestone
                </button>
              </div>
              
              <div className="grid gap-4">
                {MOCK_MILESTONES.map((item) => (
                  <div key={item.id} className="group flex items-start gap-4 p-5 bg-white border border-zinc-100 rounded-2xl hover:border-zinc-200 hover:shadow-sm transition-all">
                    <button className="mt-1 cursor-grab active:cursor-grabbing text-zinc-300 hover:text-zinc-500 transition-colors">
                      <GripVertical size={18} />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 text-xs font-bold text-zinc-600 bg-zinc-100 rounded-md">{item.year}</span>
                        <h3 className="text-base font-medium text-zinc-900">{item.title}</h3>
                      </div>
                      <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-zinc-400 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 rounded-lg transition-colors">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'capabilities' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-zinc-800 flex items-center gap-2">
                  <Zap className="text-zinc-400" size={18} />
                  Core Capabilities
                </h2>
                <button className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors">
                  <Plus size={16} /> Add Capability
                </button>
              </div>

              <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50/50">
                      <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Capability Name</th>
                      <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Proficiency</th>
                      <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                      <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {MOCK_CAPABILITIES.map((cap) => (
                      <tr key={cap.id} className="hover:bg-zinc-50/50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">
                              <Target size={14} />
                            </div>
                            <span className="text-sm font-medium text-zinc-900">{cap.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-zinc-600 font-medium">
                          {cap.level}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            cap.status === 'Active' ? 'bg-indigo-50 text-indigo-700' : 'bg-sky-50 text-sky-700'
                          }`}>
                            {cap.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100">
                            Edit <ArrowRight size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
