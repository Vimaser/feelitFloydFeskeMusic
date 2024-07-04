import React, { useEffect, useState } from 'react';
import Container from "./container";
import SectionHeading from "./section-heading";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import "./styles/blogs.css"

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

  return (
    <div id="blogs" className="bg-bg-dark py-10">
      <Container className="py-section">
        <SectionHeading>
          <h2 className="uppercase text-center text-4xl font-bold mb-8">All Blog Posts</h2>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </Container>
    </div>
  );
};

const BlogCard = ({ blog }) => {
  return (
    <article
      data-aos="zoom-in-up"
      className="flex font-kumbhSans font-normal cursor-pointer group flex-col gap-4 border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative h-64 group-hover:h-80 transition-all duration-500">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <FaArrowRight className="text-white text-4xl" />
        </div>
        <Image
          src={blog.image}
          layout="fill"
          objectFit="cover"
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 bg-white flex flex-col flex-grow">
        <div className="text-sm text-gray-500 mb-2">
          {blog.publishAt} &mdash; {blog.category}
        </div>
        <h5 className="text-xl font-bold mb-4 line-clamp-2">
          {blog.title}
        </h5>
        <p className="text-gray-700 flex-grow mb-4 line-clamp-3">
          {blog.content}
        </p>
        <div className="flex items-center text-cyan-600 text-base font-medium uppercase gap-2 transition-all group-hover:text-rose-600">
          Read more
        </div>
      </div>
    </article>
  );
};

export default BlogsPage;
