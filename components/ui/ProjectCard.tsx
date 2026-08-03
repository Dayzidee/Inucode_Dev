"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    category: string;
    images?: string[];
    image?: string;
    link: string;
  };
  className?: string;
  aspectRatio?: string;
}

export function ProjectCard({ project, className = "", aspectRatio = "aspect-[16/9]" }: ProjectCardProps) {
  const images = project.images || (project.image ? [project.image] : []);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000); // 3 seconds per slide
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className={`project-card group cursor-pointer relative overflow-hidden bg-[#0a0a0a] ${className}`}>
      <div className={`aspect-square md:${aspectRatio} overflow-hidden relative`}>
        {images.map((img, index) => (
          <Image 
            key={index}
            src={img} 
            alt={`${project.title} - Slide ${index + 1}`}
            fill
            unoptimized
            className={`object-cover object-top transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${index === currentIndex ? "opacity-80 group-hover:opacity-100" : "opacity-0"} absolute top-0 left-0`}
          />
        ))}
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />
      </div>
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <span className="text-[10px] text-white/70 tracking-[0.2em] uppercase mb-3 font-medium">
          {project.category}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
          {project.title}
        </h3>
        
        <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">
            View Project
          </span>
          <ArrowUpRight className="text-white" size={20} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
