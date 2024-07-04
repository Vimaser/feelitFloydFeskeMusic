"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Container from '@/components/container';
import SectionHeading from '@/components/section-heading';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';
import Head from 'next/head';

const BlogPostContent = ({ id }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const blogDoc = await getDoc(doc(db, 'blogs', id));
          if (blogDoc.exists()) {
            setBlog({ id: blogDoc.id, ...blogDoc.data() });
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!captchaVerified) {
      alert("Please verify the captcha.");
      return;
    }

    try {
      await addDoc(collection(db, 'blogs', id, 'comments'), {
        content: comment,
        createdAt: new Date(),
      });
      setComment('');
      alert("Comment submitted successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <>
      <Head>
        <script src="https://www.google.com/recaptcha/enterprise.js?render=6LeklAgqAAAAAF6TQHsWW6LhgnG0XI3Jkd6CSdOV"></script>
      </Head>
      <Container style={{ backgroundColor: "#07072a", color: "white", padding: "2rem" }} className="py-section transition-all duration-300 ease-in-out">
        <SectionHeading>
          <h2 className="uppercase text-center text-4xl font-bold mb-8">{blog.title}</h2>
        </SectionHeading>
        <div className="flex flex-col items-center">
          <Image src={blog.image} alt={blog.title} width={800} height={600} className="rounded-lg mb-8 transition-transform transform hover:scale-105" />
          <div className="text-gray-400 mb-4">
            {blog.publishAt} &mdash; {blog.category}
          </div>
          <div className="text-lg leading-relaxed text-gray-300 mb-8">
            {blog.content}
          </div>
          <div className="w-full max-w-2xl">
            <h3 className="text-2xl font-semibold mb-4">Leave a Comment</h3>
            <textarea
              className="w-full p-4 mb-4 text-black rounded-lg"
              rows="4"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={() => setCaptchaVerified(true)}
              className="mb-4"
            />
            <button
              onClick={handleCommentSubmit}
              className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300"
            >
              Submit Comment
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

const BlogPost = () => {
  const params = useParams();
  const { id } = params;

  if (!id) {
    return <div>Loading...</div>;
  }

  return <BlogPostContent id={id} />;
};

export default BlogPost;
