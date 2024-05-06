import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../../firebase/Firebase";
import { getDocs, collection } from "firebase/firestore";

const BlogCatalog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = [];
        querySnapshot.forEach((doc) => {
          blogsData.push({ id: doc.id, ...doc.data() });
        });
        blogsData.sort((a, b) => a.priority - b.priority);
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <></>;
  }

  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <section className="px-5 py-8 dark:bg-gray-800 dark:text-gray-100 relative bg-gray-100">
    <div className="w-60 h-60 bg-primary-400 absolute top-0 left-0 z-0 blur-3xl opacity-30 overflow-hidden rounded-full"></div>
      <div className="w-60 h-60 bg-primary-400 absolute bottom-0 right-0 z-0 blur-3xl opacity-30 overflow-hidden rounded-full"></div>
      <div className="mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center dark:text-white">
          Blogs
        </h2>
      </div>
      <div className="container grid grid-cols-12 mx-auto gap-y-6 md:gap-6">
        <div className="mx-auto max-w-xl flex col-span-12 md:col-span-7 lg:col-span-7 py-4">
          <div className="bg-white rounded-lg mb-6 tracking-wide">
            <div className="md:flex-shrink-0">
              <img
                src={blogs[0]?.image}
                alt="mountains"
                className="w-full h-64 rounded-lg rounded-b-none object-cover"
              />
            </div>
            <div className="px-4 py-2 mt-2 space-y-3">
              <div className="bg-primary-200 rounded-2xl px-4 py-1 w-fit text-gray-600">
                <p>{blogs[0]?.category}</p>
              </div>
              <h2 className="font-bold text-2xl text-gray-800 tracking-normal">
                {blogs[0]?.title}
              </h2>
              <p className="text-sm text-gray-700 text-ellipsis line-clamp-4">
                {blogs[0]?.content}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[#1358fb] text-xs">{blogs[0]?.author}</p>
                <p onClick={() => {handleBlogClick(blogs[0]?.id)}} className="text-primary-400 text-xs cursor-pointer">
                  Read More
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-2 lg:col-span-5 lg:block col-span-12 md:col-span-5">
          <div className="mb-4 space-x-5 border-b-2 border-primary-400">
            <p className="pb-3 text-xs font-bold uppercase dark:border-violet-400">
              Latest
            </p>
          </div>
      <div className="flex flex-col divide-y dark:divide-gray-700">
        {blogs?.slice(1, 6).map((blog) => (
          <div key={blog.id} className="flex px-1 py-4">
            <div className="mr-4 w-2/6 h-20">
              <img
                alt=""
                className="w-full h-full object-cover"
                src={blog.image}
              />
            </div>
            <div className="flex flex-col space-y-2 w-4/6">
              <p
                className="font-serif hover:underline"
                onClick={() => handleBlogClick(blog.id)}
              >
                {blog.title}
              </p>
              <p className="text-xs dark:text-gray-400">{blog.author}</p>
              <p className="block text-primary-400 lg:inline text-xs">
                {blog.category}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>
    </section>
  );
};

export default BlogCatalog;
