"use client";

import AdminLayout from '../../../components/AdminLayout';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, storage, db } from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const AdminShows = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('tickets available');
  const [shows, setShows] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push('/admin/login');
        }
      });

      return () => unsubscribe();
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchShows = async () => {
        const showsCollection = collection(db, 'shows');
        const showsSnapshot = await getDocs(showsCollection);
        const showsList = showsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setShows(showsList);
      };

      fetchShows();
    }
  }, []);

  const handleShowUpload = async (e) => {
    e.preventDefault();
    if (!title || !date || !imageFile) return;

    const imageRef = ref(storage, `shows/${imageFile.name}`);

    try {
      const imageSnapshot = await uploadBytes(imageRef, imageFile);
      const imageURL = await getDownloadURL(imageSnapshot.ref);

      await addDoc(collection(db, 'shows'), {
        title,
        date,
        imageURL,
        link,
        status,
      });

      setTitle('');
      setDate('');
      setImageFile(null);
      setLink('');
      setStatus('tickets available');
      alert('Show uploaded successfully!');

      const showsCollection = collection(db, 'shows');
      const showsSnapshot = await getDocs(showsCollection);
      const showsList = showsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShows(showsList);

    } catch (error) {
      console.error('Error uploading show: ', error);
      alert('Error uploading show: ' + error.message);
    }
  };

  const handleDelete = async (id, imageURL) => {
    try {
      const imageRef = ref(storage, imageURL);
      await deleteObject(imageRef);
      await deleteDoc(doc(db, 'shows', id));
      setShows(shows.filter(show => show.id !== id));
      alert('Show deleted successfully!');
    } catch (error) {
      console.error('Error deleting show: ', error);
      alert('Error deleting show: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">Manage Upcoming Shows</h2>
        <form className="mt-8 space-y-6" onSubmit={handleShowUpload}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Show Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Show Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image-file" className="block text-sm font-medium text-gray-700">
                Show Image
              </label>
              <input
                id="image-file"
                name="image-file"
                type="file"
                accept="image/*"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                Ticket Link (optional)
              </label>
              <input
                id="link"
                name="link"
                type="url"
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="https://example.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="tickets available">Tickets Available</option>
                <option value="sold out">Sold Out</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload Show
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center text-gray-900">Uploaded Shows</h3>
          <ul>
            {shows.map(show => (
              <li key={show.id} className="flex flex-col items-start py-2">
                <div className="flex justify-between w-full items-center">
                  <span>{show.title} - {new Date(show.date).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleDelete(show.id, show.imageURL)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex items-center">
                  {show.imageURL && (
                    <img
                      src={show.imageURL}
                      alt={show.title}
                      className="w-20 h-20 object-cover mr-4"
                    />
                  )}
                  <span className="text-sm">{show.status}</span>
                  {show.link && (
                    <a href={show.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-4">
                      Buy Tickets
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const AdminShowsPage = () => {
  return (
    <AdminLayout>
      <AdminShows />
    </AdminLayout>
  );
};

export default AdminShowsPage;
