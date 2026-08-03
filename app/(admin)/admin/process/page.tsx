import { MoreHorizontal, Plus, GripVertical, CheckCircle2, Clock, CircleDashed } from "lucide-react";

const PIPELINE_COLUMNS = [
  {
    id: "col-1",
    title: "Inbound Leads",
    count: 3,
    status: "todo",
    items: [
      { id: "lead-1", client: "Nexus Corp", project: "E-Commerce Replatform", value: "$45k", date: "Oct 12" },
      { id: "lead-2", client: "Aura Health", project: "Mobile App MVP", value: "$28k", date: "Oct 14" },
      { id: "lead-3", client: "Void Dynamics", project: "Brand Identity", value: "$15k", date: "Oct 15" },
    ]
  },
  {
    id: "col-2",
    title: "Discovery & Scope",
    count: 2,
    status: "in-progress",
    items: [
      { id: "disc-1", client: "Ozone Labs", project: "Marketing Site", value: "$12k", date: "Oct 10" },
      { id: "disc-2", client: "Syntax AI", project: "Dashboard Redesign", value: "$34k", date: "Oct 11" },
    ]
  },
  {
    id: "col-3",
    title: "Active Development",
    count: 4,
    status: "active",
    items: [
      { id: "dev-1", client: "Core Financial", project: "Web Application", value: "$85k", date: "Sep 20", progress: 65 },
      { id: "dev-2", client: "Lumina", project: "Design System", value: "$22k", date: "Sep 28", progress: 40 },
      { id: "dev-3", client: "Horizon", project: "API Integration", value: "$18k", date: "Oct 02", progress: 80 },
      { id: "dev-4", client: "Vertex", project: "Landing Page", value: "$8k", date: "Oct 05", progress: 20 },
    ]
  },
  {
    id: "col-4",
    title: "Review & QA",
    count: 1,
    status: "review",
    items: [
      { id: "qa-1", client: "Prism Studios", project: "Portfolio Site", value: "$10k", date: "Sep 15", progress: 95 },
    ]
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "todo": return <CircleDashed size={16} className="text-zinc-500" />;
    case "in-progress": return <Clock size={16} className="text-blue-500" />;
    case "active": return <CircleDashed size={16} className="text-emerald-500" />;
    case "review": return <CheckCircle2 size={16} className="text-amber-500" />;
    default: return null;
  }
};

export default function AdminProcessPage() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#050505] text-white">
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/10 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Pipeline Management</h1>
          <p className="text-sm text-zinc-500">Active client projects and inbound leads.</p>
        </div>
        <button className="bg-white text-black px-4 py-2 text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors flex items-center gap-2">
          <Plus size={16} />
          New Project
        </button>
      </header>

      <div className="flex-1 overflow-x-auto p-8">
        <div className="flex gap-6 h-full items-start min-w-max">
          {PIPELINE_COLUMNS.map((col) => (
            <div key={col.id} className="w-[340px] flex flex-col max-h-full">
              <div className="flex items-center justify-between mb-4 px-1 shrink-0">
                <div className="flex items-center gap-2">
                  {getStatusIcon(col.status)}
                  <h3 className="font-semibold text-sm">{col.title}</h3>
                  <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-zinc-400">
                    {col.count}
                  </span>
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar pb-8">
                {col.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-[#111111] border border-white/5 rounded-lg p-4 group hover:border-white/20 transition-all cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-2">
                        <GripVertical size={16} className="text-zinc-700 mt-1 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div>
                          <p className="text-xs text-zinc-500 font-medium mb-1">{item.client}</p>
                          <h4 className="text-sm font-semibold text-zinc-100 leading-tight">{item.project}</h4>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-500 font-medium">{item.value}</span>
                    </div>

                    {item.progress !== undefined && (
                      <div className="mb-4 ml-6">
                        <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white/40 rounded-full" 
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 ml-6 text-xs text-zinc-600">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex -space-x-2">
                        <div className="w-5 h-5 rounded-full border border-[#111] bg-zinc-800 flex items-center justify-center text-[8px] font-bold">JD</div>
                        <div className="w-5 h-5 rounded-full border border-[#111] bg-zinc-700 flex items-center justify-center text-[8px] font-bold">AK</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-3 rounded-lg border border-dashed border-white/10 text-zinc-500 text-sm hover:text-white hover:border-white/30 transition-colors flex items-center justify-center gap-2">
                  <Plus size={16} />
                  Add Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
