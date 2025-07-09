import React from "react";

const PostsList = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="p-5 bg-white rounded-2xl">
              <h2 className="text-lg font-bold decoration-stone-950">
                {post.title}
              </h2>
              <p className="text-sm decoration-stone-950">{post.body}</p>
            </div>
          ))}
        </div>
  );
};

export default PostsList;
