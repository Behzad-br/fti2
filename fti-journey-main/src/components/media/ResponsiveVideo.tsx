import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResponsiveVideoProps {
    url: string;
    type?: 'youtube' | 'vimeo' | 'mp4' | 'auto';
    thumbnail?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    className?: string;
    aspectRatio?: '16/9' | '4/3' | '1/1';
}

/**
 * ResponsiveVideo Component
 * Supports YouTube, Vimeo, and MP4 with lazy loading
 * 
 * Usage:
 * <ResponsiveVideo 
 *   url="https://www.youtube.com/watch?v=..." 
 *   thumbnail="/thumbnail.jpg"
 * />
 */
const ResponsiveVideo = ({
    url,
    type = 'auto',
    thumbnail,
    autoPlay = false,
    loop = false,
    muted = false,
    controls = true,
    className = '',
    aspectRatio = '16/9'
}: ResponsiveVideoProps) => {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handlePlay = () => {
        setIsLoading(true);
        setIsPlaying(true);
    };

    const handleReady = () => {
        setIsLoading(false);
    };

    // Don't autoplay on mobile
    const shouldAutoPlay = autoPlay && !isMobile;

    return (
        <div
            className={`relative w-full overflow-hidden rounded-xl ${className}`}
            style={{ aspectRatio }}
        >
            {/* Thumbnail overlay (before play) */}
            {!isPlaying && thumbnail && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 cursor-pointer group"
                    onClick={handlePlay}
                >
                    <img
                        src={thumbnail}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:bg-white transition-colors"
                        >
                            <Play className="h-8 w-8 md:h-10 md:w-10 text-primary ml-1" fill="currentColor" />
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Loading spinner */}
            {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
                    <Loader2 className="h-12 w-12 text-white animate-spin" />
                </div>
            )}

            {/* Video player */}
            <ReactPlayer
                url={url}
                playing={isPlaying}
                loop={loop}
                muted={muted}
                controls={controls}
                width="100%"
                height="100%"
                onReady={handleReady}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                config={{
                    youtube: {
                        playerVars: {
                            showinfo: 0,
                            modestbranding: 1
                        }
                    },
                    vimeo: {
                        playerOptions: {
                            byline: false,
                            portrait: false,
                            title: false
                        }
                    }
                }}
            />
        </div>
    );
};

/**
 * VideoGallery Component
 * Grid of videos with lazy loading
 * 
 * Usage:
 * <VideoGallery videos={[
 *   { url: '...', thumbnail: '...', title: '...' }
 * ]} />
 */
interface Video {
    url: string;
    thumbnail?: string;
    title?: string;
}

export const VideoGallery = ({
    videos,
    columns = 3
}: {
    videos: Video[];
    columns?: number
}) => {
    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    }[columns] || 'grid-cols-1 md:grid-cols-3';

    return (
        <div className={`grid ${gridCols} gap-6`}>
            {videos.map((video, index) => (
                <div key={index} className="space-y-3">
                    <ResponsiveVideo
                        url={video.url}
                        thumbnail={video.thumbnail}
                    />
                    {video.title && (
                        <h4 className="font-medium text-foreground">{video.title}</h4>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ResponsiveVideo;
