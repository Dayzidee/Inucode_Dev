export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-bg">
      <h1 className="text-5xl md:text-7xl font-accent text-gold mb-6 animate-pulse-custom">
        Inucode Dev
      </h1>
      <p className="text-lg md:text-xl text-center max-w-2xl text-gray-300 font-light mb-10 leading-relaxed">
        Passionate web developer dedicated to creating engaging and functional digital experiences.
      </p>
      <div className="flex gap-6">
        <button className="px-8 py-3 bg-gradient-primary text-black font-semibold rounded-2xl hover:bg-white hover:text-gold transition-all duration-300 shadow-lg hover:shadow-glow hover:-translate-y-1">
          Hire Me
        </button>
        <button className="px-8 py-3 border border-gold text-gold font-semibold rounded-2xl hover:bg-gold hover:text-black transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
          Download Resume
        </button>
      </div>
    </main>
  );
}
