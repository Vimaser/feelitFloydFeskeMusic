"use client";

import React, { useEffect, useState } from 'react';
import Container from "./container";
import SectionHeading from "./section-heading";
import { FaArrowRight } from "react-icons/fa6";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Link from 'next/link';

const LatestBlogs = () => {
  const [latestBlogPosts, setLatestBlogPosts] = useState([]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const sortedBlogs = blogsData.sort((a, b) => new Date(b.publishAt) - new Date(a.publishAt));
      setLatestBlogPosts(sortedBlogs.slice(0, 3));
    };

    fetchLatestBlogs();
  }, []);

  return (
    <div id="blog" className="bg-bg-dark py-10">
      <Container className="py-section">
        {latestBlogPosts.length > 0 && (
          <SectionHeading>
            <h2 className="uppercase text-center text-4xl font-bold mb-8">READ OUR LATEST BLOG</h2>
          </SectionHeading>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogPosts.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </Container>
    </div>
  );
};

const BlogCard = ({ blog }) => {
  console.log('Blog Data:', blog);

  return (
    <Link href={`/blogs/${blog.id}`} passHref>
      <article className="flex font-kumbhSans font-normal cursor-pointer group flex-col gap-2">
        <div className="w-full transition-all relative h-[260px] group-hover:h-[370px] duration-500 isolate">
          <div className="bg-light-rose z-10 bg-opacity-90 transition-all opacity-0 group-hover:opacity-90 absolute inset-0 grid place-content-center duration-500 p-2">
            <FaArrowRight className="-rotate-45 text-3xl group-hover:fill-white transition-all" />
          </div>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="text-sm text-cyan">
            {new Date(blog.publishAt).toLocaleDateString()} &mdash; {blog.category}
          </div>
          <h5 className="text-xl font-bold my-4 mb-6 line-clamp-2">
            {blog.title}
          </h5>
          <div className="flex text-cyan text-base font-medium uppercase items-center gap-2 transition-all group-hover:text-rose">
            Read more
          </div>
        </div>
      </article>
    </Link>
  );
};

export default LatestBlogs;