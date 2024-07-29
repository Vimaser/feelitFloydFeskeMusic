"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, addDoc, collection, query, orderBy, getDocs, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig';
import Container from '@/components/container';
import SectionHeading from '@/components/section-heading';
import Head from 'next/head';
import { onAuthStateChanged } from 'firebase/auth';
import { signIn, logOut } from '../../../auth';

const allowedUIDs = ['pELVPn2fVjbdeep0qiRC6ul82Uu2', 'OehPWq2ZUBOms4fTQYwEgzvgwNx2'];

const prohibitedWords = [
  'steakhead', 'fuck', 'fucker', 'shit', 'shitty', 'ass', 'asshole'
];

const censorWord = (word) => {
  return '*'.repeat(word.length);
};

const censorText = (text) => {
  let censoredText = text;
  prohibitedWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    censoredText = censoredText.replace(regex, censorWord(word));
  });
  return censoredText;
};

const BlogPostContent = ({ id }) => {
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(null);
  const [lastCommentTime, setLastCommentTime] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const blogDoc = await getDoc(doc(db, 'blogs', id));
          if (blogDoc.exists()) {
            setBlog({ id: blogDoc.id, ...blogDoc.data() });
            console.log('Blog Data:', { id: blogDoc.id, ...blogDoc.data() });
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(db, 'blogs', id, 'comments');
      const q = query(commentsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const commentsList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data, createdAt: data.createdAt.toDate() };
      });
      setComments(commentsList);
    };

    fetchComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!user) {
      alert("Please sign in to leave a comment.");
      return;
    }

    if (comment.split(' ').some(word => prohibitedWords.includes(word.toLowerCase()))) {
      alert("Your comment contains inappropriate language and cannot be submitted.");
      return;
    }

    if (lastCommentTime) {
      const now = new Date();
      const timeSinceLastComment = now - lastCommentTime;
      const minInterval = 86400000; // 24 hours in milliseconds

      if (timeSinceLastComment < minInterval) {
        alert("Please wait 24 hours before posting another comment.");
        return;
      }
    }

    try {
      const newComment = {
        content: censorText(comment),
        createdAt: new Date(),
        user: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        },
      };
      const docRef = await addDoc(collection(db, 'blogs', id, 'comments'), newComment);
      setComments([{ ...newComment, id: docRef.id }, ...comments]);
      setComment('');
      setLastCommentTime(new Date());
      alert("Comment submitted successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, 'blogs', id, 'comments', commentId));
      setComments(comments.filter(comment => comment.id !== commentId));
      alert('Comment deleted successfully!');
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert('Failed to delete comment');
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
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </Head>
      <Container style={{ backgroundColor: "#07072a", color: "white", padding: "2rem" }} className="py-section transition-all duration-300 ease-in-out">
        <SectionHeading>
          <h2 className="uppercase text-center text-4xl font-bold mb-8">{blog.title}</h2>
        </SectionHeading>
        <button
          onClick={() => router.push('/')}
          className="mb-8 px-4 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-colors duration-300"
        >
          Back to Home
        </button>
        <div className="flex flex-col items-center">
          <img src={blog.image} alt={blog.title} className="rounded-lg mb-8 transition-transform transform hover:scale-105" style={{ width: '800px', height: '600px' }} />
          <div className="text-gray-400 mb-4">
            {new Date(blog.publishAt).toLocaleDateString()} &mdash; {blog.category}
          </div>
          <div className="text-lg leading-relaxed text-gray-300 mb-8" dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}></div>
          <div className="w-full max-w-2xl">
            <h3 className="text-2xl font-semibold mb-4">Leave a Comment</h3>
            <textarea
              className="w-full p-4 mb-4 text-black rounded-lg"
              rows="4"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={user ? logOut : signIn}
                className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300 mb-4"
                style={{ marginRight: "1rem" }}
              >
                {user ? "Sign Out" : "Sign In with Google"}
              </button>
              <button
                onClick={handleCommentSubmit}
                className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300"
              >
                Submit Comment
              </button>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Comments</h3>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
                    <div className="text-gray-300 mb-2">{comment.content}</div>
                    <div className="text-gray-500 text-sm">
                      {comment.user.displayName} - {comment.createdAt.toDateString()}
                    </div>
                    {user && (user.uid === comment.user.uid || allowedUIDs.includes(user.uid)) && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div>No comments yet. Be the first to comment!</div>
              )}
            </div>
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
