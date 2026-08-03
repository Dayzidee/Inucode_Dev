import * as Icons from "lucide-react";

interface ServiceItemProps {
  service: {
    id: string;
    title: string;
    icon: string;
    description: string;
  };
}

export function ServiceItem({ service }: ServiceItemProps) {
  const IconComponent = (Icons as any)[service.icon] || Icons.Settings;

  return (
    <div className="service-item relative z-10 w-full group bg-surface-container-high p-12 flex flex-col gap-10 hover:bg-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
      <div className="flex justify-between items-start">
        <IconComponent className="text-4xl text-white group-hover:text-black transition-colors" size={40} />
        <span className="text-xs font-black text-outline-variant group-hover:text-black/30">{service.id}</span>
      </div>
      <div>
        <h3 className="text-3xl font-black uppercase text-white group-hover:text-black transition-colors leading-none mb-6">{service.title}</h3>
        <p className="text-on-surface-variant group-hover:text-black/70 transition-colors">{service.description}</p>
      </div>
      <div className="mt-auto pt-8 border-t border-white/5 group-hover:border-black/10">
        <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-black">Learn More</span>
      </div>
    </div>
  );
}
