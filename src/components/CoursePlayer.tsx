import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactPlayer from "react-player";
import VideoListSidebar from "./VideoListSidebar";
import CommentSection from "./CommentSection";
import CourseMaterials from "./CourseMaterials";
import { ChevronRight } from "lucide-react";
import VideoNavigation from "./VideoNavigation";

// Dummy data for demo
const course = {
  title: "Starting SEO as your Home",
  videos: [
    {
      week: "Week 1-4",
      topics: [
        {
          id: "1",
          title: "Course Overview",
          url: "https://www.youtube.com/watch?v=TeeAp5zkYnI&list=PL0Zuz27SZ-6PrE9srvEn8nbhOOyxnWXfp",
          duration: 8,
        },
        {
          id: "2",
          title: "Course Leader/Instructor",
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
          duration: 12,
        },
        {
          id: "3",
          title: "Code Editor Installation",
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
          duration: 10,
        },
        {
          id: "4",
          title: "Embedding PHP in HTML",
          url: "https://storage.googleapis.com/coverr-main/mp4/Love-Boat.mp4",
          duration: 15,
        },
      ],
    },
    {
      week: "Week 5-8",
      topics: [
        {
          id: "5",
          title: "Defining Functions",
          url: "https://www.youtube.com/watch?v=jNgP6d9HraI",
          duration: 8,
        },
        {
          id: "6",
          title: "Function Parameters",
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
          duration: 13,
        },
        {
          id: "7",
          title: "Return Values",
          url: "https://storage.googleapis.com/coverr-main/mp4/Love-Boat.mp4",
          duration: 15,
        },
        {
          id: "8",
          title: "Global / Local Variables",
          url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
          duration: 9,
        },
        {
          id: "9",
          title: "Variable Scope",
          url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
          duration: 10,
        },
      ],
    },
    {
      week: "Week 8",
      topics: [
        {
          id: "10",
          title: "How to check a constant",
          url: "https://storage.googleapis.com/coverr-main/mp4/Love-Boat.mp4",
          duration: 11,
        },
        {
          id: "11",
          title: "Constants",
          url: "https://www.youtube.com/watch?v=jNgP6d9HraI",
          duration: 13,
        },
      ],
    },
  ],
  duration: "3 weeks",
  lessons: 11,
  enrolled: 97,
  language: "English",
};

const getFlatVideoList = (course) =>
  course.videos.reduce((acc, week) => [...acc, ...week.topics], []);

function getInitialWatched() {
  try {
    const stored = localStorage.getItem("watched-videos");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

const CoursePlayer = () => {
  const flatVideoList = getFlatVideoList(course);
  const [selectedId, setSelectedId] = useState(flatVideoList[0].id);
  const [watched, setWatched] = useState<{ [videoId: string]: boolean }>(
    getInitialWatched
  );
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    localStorage.setItem("watched-videos", JSON.stringify(watched));
  }, [watched]);

  const selectedVideo = flatVideoList.find((v) => v.id === selectedId);

  // Track progress per video id
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(1);

  // Handle video end and auto-play next
  const handleVideoEnd = useCallback(() => {
    // Mark current video as watched
    setWatched(prev => ({ ...prev, [selectedId]: true }));
    
    const currentIndex = flatVideoList.findIndex((v) => v.id === selectedId);
    if (currentIndex < flatVideoList.length - 1) {
      setSelectedId(flatVideoList[currentIndex + 1].id);
      setIsPlaying(true);
    }
  }, [selectedId, flatVideoList, setSelectedId, setWatched, isPlaying]);

  // Update watched state if 80% completed
  useEffect(() => {
    if (playedSeconds / duration >= 0.8 && !watched[selectedId]) {
      setWatched((prev) => ({ ...prev, [selectedId]: true }));
    }
  }, [playedSeconds, duration, selectedId, watched, setWatched]);

  // Reset progress when video changes
  useEffect(() => {
    setPlayedSeconds(0);
    setDuration(1);
  }, [selectedId]);

  const handleProgress = (state: { playedSeconds: number }) => {
    setPlayedSeconds(state.playedSeconds || 0);
  };

  const handleDuration = (dur: number) => {
    setDuration(dur || 1);
  };

  // Calculate progress
  const watchedCount = Object.values(watched).filter(Boolean).length;
  const totalCount = flatVideoList.length;
  const progressPercent = Math.round((watchedCount / totalCount) * 100);

  const commentsRef = useRef<HTMLDivElement>(null);
  const curriculumRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const refs = {
      comments: commentsRef,
      curriculum: curriculumRef,
    };

    const ref = refs[sectionId as keyof typeof refs];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <a href="#" className="text-[#8E9196] hover:text-[#6b6e72]">
          Course
        </a>
        <ChevronRight className="w-4 h-4 text-[#8E9196]" />
        <span className="text-[#1A1F2C] font-medium">Course Details</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-[#1A1F2C] mb-6">
            {course.title}
          </h1>

          {/* Video Player */}
          <div className="rounded-2xl overflow-hidden mb-4 bg-[#1A1F2C] aspect-video">
            {selectedVideo ? (
              <ReactPlayer
                url={selectedVideo.url}
                width="100%"
                height="100%"
                controls
                playing={isPlaying}
                onProgress={handleProgress}
                onDuration={handleDuration}
                onEnded={handleVideoEnd}
                style={{ backgroundColor: "#1A1F2C" }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                No video selected
              </div>
            )}
          </div>

          {/* Video Navigation */}
          <VideoNavigation onScrollToSection={scrollToSection} />

          {/* Course Materials */}
          <div ref={curriculumRef} className="bg-white rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-[#1A1F2C] mb-6">
              Course Materials
            </h2>
            <CourseMaterials
              duration={course.duration}
              lessons={course.lessons}
              enrolled={course.enrolled}
              language={course.language}
            />
          </div>

          {/* Comments */}
          <div ref={commentsRef}>
            <CommentSection />
          </div>
        </div>

        {/* RIGHT: Video List */}
        <aside className="w-full lg:w-[400px] shrink-0">
          <VideoListSidebar
            course={course}
            watched={watched}
            selectedId={selectedId}
            onSelect={setSelectedId}
            progressPercent={progressPercent}
          />
        </aside>
      </div>
    </div>
  );
};

export default CoursePlayer;
