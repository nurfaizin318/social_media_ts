import React, { useState } from 'react';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';
import { Button } from './button';
import { Textarea } from './textarea';


const dummyComments = [
  {
    username: "Jane Doe",
    profilePicture: "/profile2.jpg",
    comment: "Wow, this is amazing!",
    time: "1 hour ago"
  },
  {
    username: "Sam Smith",
    profilePicture: "/profile3.jpg",
    comment: "Nice post, keep it up!",
    time: "2 hours ago"
  }
];

const FeedCard: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(dummyComments); // Initialize with dummy comments

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          username: "Current User", // You can replace this with actual username
          profilePicture: "/profile.jpg", // Replace with actual user profile picture
          comment: comment,
          time: "Just now"
        }
      ]);
      setComment('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <img src="/profile.jpg" alt="Profile" className="h-10 w-10 rounded-full" />
        <div>
          <h3 className="text-gray-900 font-semibold">John Doe</h3>
          <p className="text-gray-500 text-sm">2 hours ago</p>
        </div>
      </div>

      <p className="text-gray-800 mb-4">
        This is a post from John Doe. I had a great day today!
      </p>

      <img src="/post-image.jpg" alt="Post" className="w-full rounded-lg mb-4" />

      <div className="flex justify-between items-center text-gray-500">
        {/* Like button */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLikeClick}>
          {liked ? (
            <HeartIconFilled className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6" />
          )}
          <span>{liked ? 'Liked' : 'Like'}</span>
        </div>

        {/* Comment button */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleCommentClick}>
          <ChatBubbleLeftIcon className="h-6 w-6" />
          <span>Comment</span>
        </div>

        {/* Share button */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <ShareIcon className="h-6 w-6" />
          <span>Share</span>
        </div>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="mt-6">
          {/* Comment input form */}
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <Textarea
              className="w-full bg-gray-100 rounded-lg"
              placeholder="Write a comment..."
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button type="submit" className="mt-2 bg-blue-500 text-white">
              Post Comment
            </Button>
          </form>

          {/* Display comments */}
          {comments.length > 0 && (
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="flex space-x-4">
                  <img
                    src={comment.profilePicture}
                    alt={comment.username}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="bg-gray-100 p-3 rounded-lg w-full">
                    <p className="text-gray-900 font-semibold">{comment.username}</p>
                    <p className="text-gray-700">{comment.comment}</p>
                    <p className="text-gray-500 text-sm">{comment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default FeedCard;
