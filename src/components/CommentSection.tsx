
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const initialComments = [
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

const CommentSection = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      name: "Current User",
      avatar: "/lovable-uploads/10a30930-4cd5-490e-833f-44fd7b293969.png",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      text: newComment.trim()
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
      <h2 className="text-lg font-bold text-[#1A1F2C] mb-6">Comments</h2>
      <div className="space-y-6 mb-6">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={c.avatar} alt={c.name} />
              <AvatarFallback>{c.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-[#1A1F2C] text-sm">{c.name}</div>
              <div className="text-xs text-[#8E9196] mb-2">{c.date}</div>
              <div className="text-sm text-[#4B5563]">{c.text}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-[#E5E7EB] pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            className="min-h-[120px] resize-none border-[#E5E7EB] focus:ring-[#6366F1] text-sm"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold"
            >
              Submit Comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
