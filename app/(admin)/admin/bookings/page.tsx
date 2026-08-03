"use client";

import { useRef } from "react";
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, XCircle, AlertCircle, Filter, Search } from "lucide-react";
import { gsap, useGSAP } from "../../../../lib/use-gsap";

export default function BookingsPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".admin-header > *", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" })
      .from(".stats-card", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from(".booking-row", { x: -20, opacity: 0, stagger: 0.05, duration: 0.6, ease: "power2.out" }, "-=0.4");
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col gap-8 h-full">
      {/* Header */}
      <section className="admin-header flex flex-col gap-1 shrink-0">
        <h1 className="text-6xl font-bold tracking-tightest leading-none text-white">BOOKINGS</h1>
        <p className="text-neutral-500 font-medium uppercase tracking-superwide text-xs">Schedule & Consultation Management</p>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
        <div className="stats-card bg-surface-low p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <CalendarIcon className="text-white" size={20} />
            <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase">Total</span>
          </div>
          <div className="text-3xl font-bold text-white">142</div>
        </div>
        <div className="stats-card bg-surface-low p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <CheckCircle2 className="text-accent-success" size={20} />
            <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase">Confirmed</span>
          </div>
          <div className="text-3xl font-bold text-white">89</div>
        </div>
        <div className="stats-card bg-surface-low p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <AlertCircle className="text-accent-warning" size={20} />
            <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase">Pending</span>
          </div>
          <div className="text-3xl font-bold text-white">24</div>
        </div>
        <div className="stats-card bg-surface-low p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <XCircle className="text-accent-error" size={20} />
            <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase">Cancelled</span>
          </div>
          <div className="text-3xl font-bold text-white">29</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-surface-low rounded-xl border border-white/5 flex flex-col min-h-0">
        {/* Toolbar */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
              <input 
                type="text" 
                className="bg-surface-lowest border border-white/10 focus:ring-1 focus:ring-white rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-neutral-600 w-64" 
                placeholder="Search bookings..." 
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-lowest border border-white/10 rounded-lg text-sm text-neutral-400 hover:text-white transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Export</button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto custom-scrollbar" tabIndex={0}>
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-surface-low z-10">
              <tr className="text-xs font-bold uppercase tracking-widest text-neutral-600 border-b border-white/5">
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { name: "Elena Rostova", email: "elena@example.com", date: "Oct 24, 2023", time: "14:00 GMT", service: "Strategy", status: "Confirmed", statusColor: "text-accent-success" },
                { name: "Marcus Thorne", email: "marcus@example.com", date: "Oct 24, 2023", time: "16:30 GMT", service: "Design", status: "Pending", statusColor: "text-accent-warning" },
                { name: "Julian Vane", email: "julian@example.com", date: "Oct 25, 2023", time: "09:00 GMT", service: "Audit", status: "Confirmed", statusColor: "text-accent-success" },
                { name: "Sophia Chen", email: "sophia@example.com", date: "Oct 25, 2023", time: "11:30 GMT", service: "Review", status: "Cancelled", statusColor: "text-accent-error" },
                { name: "David Kim", email: "david@example.com", date: "Oct 26, 2023", time: "10:00 GMT", service: "Strategy", status: "Confirmed", statusColor: "text-accent-success" },
                { name: "Sarah Jenkins", email: "sarah@example.com", date: "Oct 26, 2023", time: "13:00 GMT", service: "Design", status: "Pending", statusColor: "text-accent-warning" },
                { name: "Michael Chang", email: "michael@example.com", date: "Oct 27, 2023", time: "15:00 GMT", service: "Audit", status: "Confirmed", statusColor: "text-accent-success" },
              ].map((booking, i) => (
                <tr key={i} className="booking-row border-b border-white/5 hover:bg-surface-high transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-highest flex items-center justify-center text-neutral-400">
                        <User size={14} />
                      </div>
                      <div>
                        <div className="text-white font-medium">{booking.name}</div>
                        <div className="text-neutral-500 text-xs">{booking.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <CalendarIcon size={14} className="text-neutral-500" />
                      {booking.date}
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 text-xs mt-1">
                      <Clock size={14} />
                      {booking.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-surface-highest text-neutral-300 text-xs rounded font-medium">{booking.service}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase ${booking.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-current shadow-glow`}></span>
                      {booking.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-neutral-500 hover:text-white transition-colors text-xs font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
