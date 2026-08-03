import { 
  Layers, 
  Triangle, 
  Sparkles, 
  LayoutGrid, 
  Code, 
  Compass, 
  Cpu, 
  Share2, 
  Globe, 
  Bookmark,
  Terminal,
  LucideIcon 
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Triangle,
  Sparkles,
  LayoutGrid,
  Code,
  Compass,
  Cpu,
  Share2,
  Globe,
  Bookmark,
  Terminal
};

interface BentoItemProps {
  capability: {
    id: string;
    title: string;
    category: string;
    icon: string;
    color: string;
    hoverEffect: string;
  };
}

export function BentoItem({ capability }: BentoItemProps) {
  const IconComponent = iconMap[capability.icon] || Code;

  return (
    <div className="bento-item bg-surface-mid p-6 sm:p-8 flex flex-col items-start justify-between gap-6 group hover:bg-surface-high border border-outline-variant transition-all duration-500 min-h-[160px]">
      <div className="w-10 h-10 rounded-full bg-surface-high flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <IconComponent 
          className="text-primary" 
          size={18}
          strokeWidth={1.5}
        />
      </div>
      <div>
        <h4 className="text-primary font-bold text-base mb-1">{capability.title}</h4>
        <p className="text-secondary text-[10px] uppercase tracking-widest">{capability.category}</p>
      </div>
    </div>
  );
}
