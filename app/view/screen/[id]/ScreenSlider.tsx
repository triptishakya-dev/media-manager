"use client"
import { useState, useEffect } from "react"

export default function ScreenSlider({ mediaItems }: { mediaItems: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (mediaItems.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length)
    }, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(interval)
  }, [mediaItems.length])

  if (!mediaItems || mediaItems.length === 0) {
    return <div className="text-gray-500 italic">No media assigned to this screen.</div>
  }

  const currentMedia = mediaItems[currentIndex].mediaItem

  return (
    <div className="relative w-full max-w-5xl aspect-video bg-[#0d0d0d] border border-[#333] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
      {currentMedia.type === 'VIDEO' ? (
        <video 
          key={currentMedia.id}
          src={currentMedia.url} 
          className="w-full h-full object-contain bg-black" 
          autoPlay 
          muted 
          loop 
        />
      ) : currentMedia.type === 'IMAGE' ? (
        <img 
          key={currentMedia.id}
          src={currentMedia.url} 
          alt={currentMedia.name} 
          className="w-full h-full object-contain" 
        />
      ) : currentMedia.type === 'PDF' ? (
        <iframe 
          key={currentMedia.id}
          src={`${currentMedia.url}#toolbar=0&navpanes=0`} 
          className="w-full h-full bg-white"
        />
      ) : (
        <div className="text-center p-8">
           <h2 className="text-[#f0a07a] text-2xl">{currentMedia.name}</h2>
           <p className="text-gray-500 mt-2">({currentIndex + 1} / {mediaItems.length})</p>
        </div>
      )}
      
      {mediaItems.length > 1 && (
        <>
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/80 transition backdrop-blur-sm border border-white/10"
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length) }}
          >
            &#8592;
          </button>
          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/80 transition backdrop-blur-sm border border-white/10"
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % mediaItems.length) }}
          >
            &#8594;
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-3 py-2 rounded-full backdrop-blur-sm border border-white/10">
            {mediaItems.map((_, idx) => (
              <button 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx) }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
