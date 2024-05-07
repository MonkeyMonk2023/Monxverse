import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/NavbarHome";

import { db } from "../../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [mainBlog, setMainBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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
        if (id) {
          const selectedBlog = blogsData.find((blog) => blog.id === id);
          setMainBlog(selectedBlog);
        } else {
          setMainBlog(blogsData[0]);
        }
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [id]);

  const contentParagraphs = mainBlog?.content
    .split("\n")
    .map((paragraph, index) => (
      <p key={index} className="pb-2">
        {paragraph}
      </p>
    ));

  if (loading || !mainBlog) {
    return <></>;
  }

  return (
    <div className="mx-auto dark:bg-gray-200">
      <Navbar />
      <main className="my-10 lg:w-3/4 mx-auto ">
        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          <div className="px-4 lg:px-0">
            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
              {mainBlog.title}
            </h2>
            <p
              className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
            >
              {mainBlog.category}
            </p>
          </div>

          <img
            src={mainBlog.image}
            className="w-full object-cover lg:rounded"
            style={{ height: "28em" }}
            alt=""
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full">
            {contentParagraphs}
          </div>
        </div>
        <div className="">
          <div className="flex flex-wrap space-x-2">
          {mainBlog.tags.map((tag)=>(
            <p className="mx-1 bg-primary-200 py-1 my-1 px-3 rounded-2xl">{tag}</p>
          ))}
          </div>
          <div>
          <p className="text-[#1358fb]">{mainBlog.author}</p>
          </div>
        </div>
      </main>

      <section className="py-6 sm:py-6 dark:bg-gray-100 dark:text-gray-800">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Browse all blog posts</h2>
            <p className="font-serif text-sm dark:text-gray-600">
              Qualisque erroribus usu at, duo te agam soluta mucius.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {blogs.slice(1, blogs.length).map((blog) => (
              <article
                key={blog.id}
                className={`flex flex-col dark:bg-gray-50 hover:shadow-2xl cursor-pointer ${
                  mainBlog.id === blog.id ? "bg-gray-200" : ""
                }`}
                onClick={() => setMainBlog(blog)}
              >
                <p
                  rel="noopener noreferrer"
                  aria-label="Te nulla oportere reprimique his dolorum"
                >
                  <img
                    alt=""
                    className="object-cover w-full h-52 dark:bg-gray-500"
                    src={blog.image}
                  />
                </p>
                <div className="flex flex-col flex-1 p-6">
                  <p
                    rel="noopener noreferrer"
                    
                    aria-label="Te nulla oportere reprimique his dolorum"
                  ></p>
                  <p
                    rel="noopener noreferrer"
                    
                    className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600"
                  >
                    {blog.category}
                  </p>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    {blog.title}
                  </h3>
                  <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                    <span>{blog.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="py-6 text-sm text-center dark:text-gray-400">
          © 2023 MonkeyMonk. All rights reserved.
          <p className="text-xs mt-1">
            By using MonkeyMonk, you agree to our{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => {
                navigate("/terms&conditions");
              }}
              target="_blank"
            >
              Terms of Service
            </span>{" "}
            and{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => {
                navigate("/privacypolicy");
              }}
              target="_blank"
            >
              Privacy Policy
            </span>
          </p>
        </div>
    </div>
  );
};

export default Blogs;
