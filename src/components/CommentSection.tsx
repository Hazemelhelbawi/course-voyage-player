
import React from "react";

const dummyComments = [
  {
    id: 1,
    name: "Student Name Goes Here",
    avatar: "/lovable-uploads/10a30930-4cd5-490e-833f-44fd7b293969.png",
    date: "Oct 8th 2021",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 2,
    name: "Student Name Goes Here",
    avatar: "/lovable-uploads/10a30930-4cd5-490e-833f-44fd7b293969.png",
    date: "Oct 8th 2021",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
];

const CommentSection = () => (
  <div className="bg-white rounded-xl shadow p-6">
    <h2 className="font-bold text-lg mb-4">Comments</h2>
    <div className="space-y-6 mb-4">
      {dummyComments.map((c) => (
        <div key={c.id} className="flex gap-4 items-start">
          <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <div className="font-semibold">{c.name}</div>
            <div className="text-xs text-gray-400 mb-1">{c.date}</div>
            <div className="text-gray-600">{c.text}</div>
          </div>
        </div>
      ))}
    </div>
    {/* Comment Form */}
    <div className="border-t pt-4">
      <form className="flex flex-col gap-2">
        <textarea
          placeholder="Write a comment..."
          className="w-full min-h-[80px] border-gray-200 rounded-lg resize-none p-3 focus:outline-none focus:ring-2 focus:ring-[#9b87f5] text-sm"
        />
        <button
          className="self-end bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-5 py-2 rounded-lg font-semibold shadow transition"
          type="button"
        >
          Submit Review
        </button>
      </form>
    </div>
  </div>
);

export default CommentSection;
