interface JourneyItemProps {
  milestone: {
    id: string;
    period: string;
    role: string;
    description: string;
    align: string;
  };
  isFirst?: boolean;
}

export function JourneyItem({ milestone, isFirst }: JourneyItemProps) {
  const isLeft = milestone.align === "left";
  
  return (
    <div className={`journey-item relative ${!isFirst ? "mt-16 md:mt-0 md:mb-32" : ""} flex ${isLeft ? "justify-start" : "justify-end"} w-full md:w-1/2 ${isLeft ? "md:pr-12 text-left md:text-right" : "md:ml-auto md:pl-12 text-left"}`}>
      <div className={`absolute ${isLeft ? "right-[-8px]" : "left-[-8px]"} top-0 w-4 h-4 rounded-full hidden md:block ${isLeft ? "bg-white" : "border-2 border-white bg-background"}`}></div>
      <div>
        <span className="text-sm font-label text-secondary tracking-widest">{milestone.period}</span>
        <h3 className="text-2xl font-black text-white uppercase mt-2">{milestone.role}</h3>
        <p className="text-on-surface-variant mt-4 leading-relaxed">{milestone.description}</p>
      </div>
    </div>
  );
}
