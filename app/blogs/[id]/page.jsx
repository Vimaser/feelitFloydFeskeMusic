"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation' instead of 'next/router'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Container from '@/components/container';
import SectionHeading from '@/components/section-heading';
import Image from 'next/image';

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query || {}; // Use optional chaining and default to an empty object
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          console.log(`Fetching blog with id: ${id}`);
          const blogDoc = await getDoc(doc(db, 'blogs', id));
          if (blogDoc.exists()) {
            setBlog({ id: blogDoc.id, ...blogDoc.data() });
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        } finally {
          setLoading(false); // Set loading to false once fetching is done
        }
      };

      fetchBlog();
    } else {
      setLoading(false); // Set loading to false if no id
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Container className="py-section">
      <SectionHeading>
        <h2 className="uppercase text-center text-4xl font-bold mb-8">{blog.title}</h2>
      </SectionHeading>
      <div className="flex flex-col items-center">
        <Image src={blog.image} alt={blog.title} width={800} height={600} className="rounded-lg mb-8" />
        <div className="text-gray-500 mb-4">
          {blog.publishAt} &mdash; {blog.category}
        </div>
        <div className="text-lg leading-relaxed text-gray-700">
          {blog.content}
        </div>
      </div>
    </Container>
  );
};

export default BlogPost;
