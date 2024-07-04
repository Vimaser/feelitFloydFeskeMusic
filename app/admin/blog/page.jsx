"use client";

import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/firebaseConfig';
import Container from '../../../components/container';
import "../styles/blog.css";
import SectionHeading from '../../../components/section-heading';
import AdminLayout from '../../../components/AdminLayout';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

const AdminBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [publishAt, setPublishAt] = useState('');
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image.');
      return;
    }

    const imageRef = ref(storage, `blog-images/${image.name}`);
    try {
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      const newBlog = await addDoc(collection(db, 'blogs'), {
        title,
        content,
        category,
        publishAt,
        image: imageUrl,
      });

      setBlogs([...blogs, { id: newBlog.id, title, content, category, publishAt, image: imageUrl }]);
      setTitle('');
      setContent('');
      setCategory('');
      setPublishAt('');
      setImage(null);
      alert('Blog post added successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to add blog post');
    }
  };

  const handleDelete = async (id, imageUrl) => {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      await deleteDoc(doc(db, 'blogs', id));

      setBlogs(blogs.filter(blog => blog.id !== id));
      alert('Blog post deleted successfully!');
    } catch (error) {
      console.error('Error deleting document: ', error);
      alert('Failed to delete blog post');
    }
  };

  return (
    <Container className="container py-section">
      <SectionHeading className="section-heading">
        <h2 className="uppercase text-center">Write a New Blog Post</h2>
      </SectionHeading>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
            rows="6"
            required
            data-gramm_editor="true"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Publish Date</label>
          <input
            type="date"
            value={publishAt}
            onChange={(e) => setPublishAt(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <SectionHeading className="section-heading">
        <h2 className="uppercase text-center">Existing Blog Posts</h2>
      </SectionHeading>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id} className="blog-list-item">
            <div>
              <h3 className="font-bold">{blog.title}</h3>
              <p>{blog.content}</p>
              {blog.image && <img src={blog.image} alt={blog.title} className="w-20 h-20 object-cover mt-2" />}
              <div className="social-buttons">
                <FacebookShareButton url={blog.image} quote={blog.title} className="mr-2">
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={blog.image} title={blog.title} className="mr-2">
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url={blog.image} title={blog.title} summary={blog.content} className="mr-2">
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
            </div>
            <button
              onClick={() => handleDelete(blog.id, blog.image)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

const AdminBlogPage = () => {
  return (
    <AdminLayout>
      <AdminBlog />
    </AdminLayout>
  );
};

export default AdminBlogPage;
