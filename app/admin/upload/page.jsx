"use client";

import AdminLayout from '../../../components/AdminLayout';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, storage, db } from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AdminUpload = () => {
  const [musicFile, setMusicFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState('');
  const [sectionTitle, setSectionTitle] = useState('Featured Album');
  const [sectionSubtitle, setSectionSubtitle] = useState('Featured Songs');
  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [featuredImageURL, setFeaturedImageURL] = useState('');
  const [uploads, setUploads] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchUploads = async () => {
      const musicCollection = collection(db, 'music');
      const musicSnapshot = await getDocs(musicCollection);
      const musicList = musicSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUploads(musicList);

      const configDoc = await getDoc(doc(db, 'config', 'featuredAlbum'));
      if (configDoc.exists()) {
        const configData = configDoc.data();
        setSectionTitle(configData.sectionTitle || 'Featured Album');
        setSectionSubtitle(configData.sectionSubtitle || 'Featured Songs');
        setFeaturedImageURL(configData.featuredImageURL || '');
      }
    };

    fetchUploads();
  }, []);

  const handleMusicUpload = async (e) => {
    e.preventDefault();
    if (!musicFile || !imageFile || !title) return;

    const musicRef = ref(storage, `music/${musicFile.name}`);
    const imageRef = ref(storage, `images/${imageFile.name}`);

    try {
      const musicSnapshot = await uploadBytes(musicRef, musicFile);
      const musicURL = await getDownloadURL(musicSnapshot.ref);

      const imageSnapshot = await uploadBytes(imageRef, imageFile);
      const imageURL = await getDownloadURL(imageSnapshot.ref);

      const newDoc = await addDoc(collection(db, 'music'), {
        title,
        musicURL,
        imageURL,
      });

      const newUpload = { id: newDoc.id, title, musicURL, imageURL };
      setUploads(prevUploads => [...prevUploads, newUpload]);

      setMusicFile(null);
      setImageFile(null);
      setTitle('');
      alert('Upload successful!');
    } catch (error) {
      console.error('Error uploading files: ', error);
      alert('Error uploading files: ' + error.message);
    }
  };

  const handleDelete = async (id, musicURL, imageURL) => {
    try {
      const musicRef = ref(storage, musicURL);
      const imageRef = ref(storage, imageURL);

      await deleteObject(musicRef);
      await deleteObject(imageRef);
      await deleteDoc(doc(db, 'music', id));

      setUploads(uploads.filter(upload => upload.id !== id));
      alert('Deletion successful!');
    } catch (error) {
      console.error('Error deleting files: ', error);
      alert('Error deleting files: ' + error.message);
    }
  };

  const handleConfigUpdate = async () => {
    try {
      let featuredImageURL = '';
      if (featuredImageFile) {
        const featuredImageRef = ref(storage, `images/${featuredImageFile.name}`);
        const featuredImageSnapshot = await uploadBytes(featuredImageRef, featuredImageFile);
        featuredImageURL = await getDownloadURL(featuredImageSnapshot.ref);
      }

      await setDoc(doc(db, 'config', 'featuredAlbum'), {
        sectionTitle,
        sectionSubtitle,
        featuredImageURL,
      });

      setFeaturedImageURL(featuredImageURL);
      alert('Configuration updated successfully!');
    } catch (error) {
      console.error('Error updating configuration: ', error);
      alert('Error updating configuration: ' + error.message);
    }
  };

  const handleFeaturedImageDelete = async () => {
    if (featuredImageURL) {
      try {
        const imageRef = ref(storage, featuredImageURL);
        await deleteObject(imageRef);
        setFeaturedImageURL('');
        await setDoc(doc(db, 'config', 'featuredAlbum'), {
          sectionTitle,
          sectionSubtitle,
          featuredImageURL: '',
        });
        alert('Featured image deleted successfully!');
      } catch (error) {
        console.error('Error deleting featured image: ', error);
        alert('Error deleting featured image: ' + error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">Edit Featured Album Section</h2>
        <form className="mt-8 space-y-6" onSubmit={handleMusicUpload}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Song Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Song Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="music-file" className="block text-sm font-medium text-gray-700">
                Music File
              </label>
              <input
                id="music-file"
                name="music-file"
                type="file"
                accept="audio/*"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setMusicFile(e.target.files[0])}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image-file" className="block text-sm font-medium text-gray-700">
                Image File (Optimal size: 640x960)
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
            {imageFile && (
              <div className="mb-4">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Selected Image"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload Song
            </button>
          </div>
        </form>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="section-title" className="block text-sm font-medium text-gray-700">
                Section Title
              </label>
              <input
                id="section-title"
                name="section-title"
                type="text"
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Featured Album"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="section-subtitle" className="block text-sm font-medium text-gray-700">
                Section Subtitle
              </label>
              <input
                id="section-subtitle"
                name="section-subtitle"
                type="text"
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Featured Songs"
                value={sectionSubtitle}
                onChange={(e) => setSectionSubtitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="featured-image-file" className="block text-sm font-medium text-gray-700">
                Featured Image (Optimal size: 1280x1920)
              </label>
              <input
                id="featured-image-file"
                name="featured-image-file"
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setFeaturedImageFile(e.target.files[0])}
              />
            </div>
            {featuredImageFile && (
              <div className="mb-4">
                <img
                  src={URL.createObjectURL(featuredImageFile)}
                  alt="Featured Image"
                  className="w-full h-auto"
                />
              </div>
            )}
            {featuredImageURL && !featuredImageFile && (
              <div className="mb-4">
                <img
                  src={featuredImageURL}
                  alt="Featured Image"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>

          <div>
            <button
              onClick={handleConfigUpdate}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Configuration
            </button>
            {featuredImageURL && (
              <button
                onClick={handleFeaturedImageDelete}
                className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Featured Image
              </button>
            )}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center text-gray-900">Uploaded Music</h3>
          <ul>
            {uploads.map(upload => (
              <li key={upload.id} className="flex flex-col items-start py-2">
                <div className="flex justify-between w-full items-center">
                  <span>{upload.title}</span>
                  <button
                    onClick={() => handleDelete(upload.id, upload.musicURL, upload.imageURL)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex items-center">
                  {upload.imageURL && (
                    <img
                      src={upload.imageURL}
                      alt={upload.title}
                      className="w-20 h-20 object-cover mr-4"
                    />
                  )}
                  <AudioPlayer
                    autoPlay={false}
                    src={upload.musicURL}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const AdminUploadPage = () => {
  return (
    <AdminLayout>
      <AdminUpload />
    </AdminLayout>
  );
};

export default AdminUploadPage;
