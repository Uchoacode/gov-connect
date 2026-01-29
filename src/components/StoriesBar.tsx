import { useState } from 'react'
import StoryViewer from './StoryViewer'

export interface Story {
  id: string
  userName: string
  userAvatar: string
  stories: {
    id: string
    type: 'image' | 'video'
    url: string
    duration: number
  }[]
  hasUnseen?: boolean
  isLive?: boolean
}

interface StoriesBarProps {
  stories: Story[]
}

export default function StoriesBar({ stories }: StoriesBarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [viewingStory, setViewingStory] = useState<Story | null>(null)
  
  if (!stories || stories.length === 0) return null

  return (
    <>
      <div className="w-full relative z-10 py-4">
         <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
         
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth-x px-4 pb-4">
           {/* Add to Story Button (Mock) */}
           <div className="flex flex-col items-center gap-1.5 flex-shrink-0 group cursor-pointer relative">
              <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full border-2 border-dashed border-white/30 flex items-center justify-center relative bg-white/5 group-hover:bg-white/10 transition-colors">
                 <span className="text-2xl text-purple-400 group-hover:scale-110 transition-transform">+</span>
                 <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-dark-bg flex items-center justify-center text-white text-xs font-bold">+</div>
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-300 text-center truncate w-16">Seu story</span>
           </div>

           {/* Vertical Divider */}
           <div className="w-px h-12 bg-white/10 mx-1 flex-shrink-0" />

          {stories.map((story) => {
              const gradient = story.hasUnseen 
                 ? 'bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500' 
                 : 'bg-gray-700'
              
              return (
                <button
                  key={story.id}
                  type="button"
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 group cursor-pointer focus:outline-none touch-manipulation relative"
                  onMouseEnter={() => setHoveredId(story.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setViewingStory(story)}
                >
                  <div className={`
                     ${story.hasUnseen ? 'p-[2px]' : 'p-[1px]'} 
                     rounded-full ${gradient} 
                     transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-2
                     shadow-lg group-hover:shadow-purple-500/30
                  `}>
                     <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full p-[2px] bg-dark-bg relative overflow-hidden ring-2 ring-black/50">
                        <img 
                           src={story.userAvatar} 
                           alt={story.userName} 
                           className="w-full h-full rounded-full object-cover transition-opacity group-hover:opacity-90"
                        />
                        {/* Live Badge Mock */}
                         {story.isLive && (
                           <div className="absolute bottom-0 inset-x-0 bg-red-600 text-white text-[8px] font-bold uppercase tracking-wider py-0.5 text-center">
                              Ao Vivo
                           </div>
                         )}
                     </div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-300 text-center max-w-[70px] truncate group-hover:text-white transition-colors">
                    {story.userName}
                  </span>
                </button>
              )
            })
          }
        </div>
      </div>

      {viewingStory && (
        <StoryViewer
          story={viewingStory}
          onClose={() => setViewingStory(null)}
        />
      )}
    </>
  )
}
