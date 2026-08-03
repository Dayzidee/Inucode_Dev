"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  Clock, 
  CheckCircle2, 
  X,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Mock Data
const MOCK_JOURNAL_ENTRIES = [
  { id: 1, title: "The Future of AI in Design", date: "2026-05-12", status: "published", readTime: "5 min", author: "Admin" },
  { id: 2, title: "Minimalism: A Core Principle", date: "2026-05-18", status: "draft", readTime: "3 min", author: "Admin" },
  { id: 3, title: "Understanding Cognitive Load", date: "2026-05-22", status: "published", readTime: "7 min", author: "Admin" },
  { id: 4, title: "Designing for Accessibility", date: "2026-06-01", status: "draft", readTime: "4 min", author: "Admin" },
];

export default function JournalAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-zinc-900">Journal Entries</h1>
            <p className="text-sm text-zinc-500 mt-1 font-medium tracking-wide">Manage and curate your publications</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>New Entry</span>
          </button>
        </header>

        {/* Toolbar Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-2 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text" 
              placeholder="Search entries..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-zinc-50/50 hover:bg-zinc-50 focus:bg-white rounded-xl border border-transparent focus:border-zinc-200 outline-none text-sm transition-all placeholder:text-zinc-400"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto px-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-colors">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Data Grid Section */}
        <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Title</th>
                  <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Meta</th>
                  <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {MOCK_JOURNAL_ENTRIES.filter(entry => entry.title.toLowerCase().includes(searchTerm.toLowerCase())).map((entry) => (
                  <tr key={entry.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{entry.title}</p>
                          <p className="text-xs text-zinc-500 mt-0.5">{entry.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={entry.status === 'published' 
                        ? "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100/50"
                        : "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100/50"
                      }>
                        {entry.status === 'published' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-600">
                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-500">
                      {entry.readTime} read
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
                          <Edit3 size={16} />
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Slide-over Modal for New Entry */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col border-l border-zinc-100"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                <h2 className="text-xl font-medium tracking-tight text-zinc-900">Create New Entry</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700">Title</label>
                  <input type="text" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all" placeholder="E.g., The Future of UI Design" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700">Content</label>
                  <textarea rows={8} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all resize-none" placeholder="Write your thoughts..."></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Status</label>
                    <select className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all appearance-none">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Publish Date</label>
                    <input type="date" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all" />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 flex justify-end gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-medium transition-all shadow-sm">
                  Save Entry
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
