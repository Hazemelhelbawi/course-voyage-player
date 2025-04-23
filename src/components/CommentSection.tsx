import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

const initialComments = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    date: "Oct 8th 2021",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Michael Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "Oct 8th 2021",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const CommentSection = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      name: "Hazem Elhelbawi",
      avatar: "../../public/assets/avatar.png",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      text: newComment.trim(),
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
              <div className="font-semibold text-[#1A1F2C] text-sm">
                {c.name}
              </div>
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
          <div className="flex justify-start">
            <Button
              type="submit"
              className="bg-[#26b86f] hover:bg-[#26b86f] text-white font-semibold flex items-center gap-2"
            >
              Submit Review
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
