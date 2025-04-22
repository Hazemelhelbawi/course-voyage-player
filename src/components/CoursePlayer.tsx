
import React, { useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import VideoListSidebar from "./VideoListSidebar";
import CommentSection from "./CommentSection";

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
          url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
          duration: 8,
        },
        {
          id: "2",
          title: "Course Leader/Instructor",
          url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
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
          url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
          duration: 15,
        }
      ]
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
          url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
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
      ]
    },
    {
      week: "Week 8",
      topics: [
        {
          id: "10",
          title: "How to check a constant",
          url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
          duration: 11,
        },
        {
          id: "11",
          title: "Constants",
          url: "https://www.youtube.com/watch?v=jNgP6d9HraI",
          duration: 13,
        },
      ]
    }
  ],
  duration: "3 weeks",
  lessons: 11,
  enrolled: 97,
  language: "English",
};

const getFlatVideoList = (course) =>
  course.videos.reduce(
    (acc, week) => [...acc, ...week.topics],
    []
  );

function getInitialWatched() {
  try {
    const stored = localStorage.getItem("watched-videos");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function CoursePlayer() {
  const flatVideoList = getFlatVideoList(course);
  const [selectedId, setSelectedId] = useState(flatVideoList[0].id);
  const [watched, setWatched] = useState<{ [videoId: string]: boolean }>(getInitialWatched);

  useEffect(() => {
    localStorage.setItem("watched-videos", JSON.stringify(watched));
  }, [watched]);

  const selectedVideo = flatVideoList.find((v) => v.id === selectedId);

  // Track progress per video id
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(1); // avoid division by zero

  // Update watched state if 80% completed
  useEffect(() => {
    if (playedSeconds / duration >= 0.8 && !watched[selectedId]) {
      setWatched((prev) => ({ ...prev, [selectedId]: true }));
    }
  }, [playedSeconds, duration, selectedId, watched]);

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
  const watchedCount = Object.keys(watched).length;
  const totalCount = flatVideoList.length;
  const progressPercent = Math.floor((watchedCount / totalCount) * 100);

  return (
    <div className="container mx-auto py-8 px-2 max-w-7xl">
      <div className="text-sm text-gray-500 flex mb-8 gap-2 items-center">
        <a href="#" className="hover:underline text-[#8E9196]">Home</a>
        <span className="mx-1">/</span>
        <a href="#" className="hover:underline text-[#8E9196]">Courses</a>
        <span className="mx-1">/</span>
        <span className="font-semibold text-gray-900">Course Details</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT: Course Details, Video, Materials, Comments */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-extrabold mb-6">{course.title}</h1>
          <div className="rounded-lg overflow-hidden mb-5 shadow relative bg-gray-50 aspect-video max-h-[400px] flex items-center justify-center">
            {selectedVideo ? (
              <ReactPlayer
                url={selectedVideo.url}
                width="100%"
                height="100%"
                controls
                onProgress={handleProgress}
                onDuration={handleDuration}
                played={playedSeconds / duration}
                style={{ background: "#222", objectFit: "cover" }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                No video selected
              </div>
            )}
          </div>

          {/* Video Selection below player */}
          <div className="flex gap-4 mb-8 justify-center">
            {flatVideoList.slice(0, 4).map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setSelectedId(v.id)}
                className={`rounded-full p-1 border-2 transition-all duration-200
                   ${selectedId === v.id ? "border-[#9b87f5]" : "border-gray-200"}
                   ${watched[v.id] ? "ring-2 ring-green-300" : ""}
                `}
                title={v.title}
              >
                <img
                  src="/lovable-uploads/10a30930-4cd5-490e-833f-44fd7b293969.png"
                  alt={v.title}
                  className="object-cover w-12 h-12 rounded-full"
                />
              </button>
            ))}
          </div>

          {/* Course Materials */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="font-bold text-lg mb-4">Course Materials</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <div className="text-xs text-gray-500">Duration</div>
                <div className="font-semibold">{course.duration}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Lessons</div>
                <div className="font-semibold">{course.lessons}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Enrolled</div>
                <div className="font-semibold">{course.enrolled} students</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Language</div>
                <div className="font-semibold">{course.language}</div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <CommentSection />
        </div>

        {/* RIGHT: Topics Sidebar */}
        <aside className="w-full lg:w-[340px] shrink-0">
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
}

export default CoursePlayer;

