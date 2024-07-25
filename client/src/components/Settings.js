// client/src/components/Settings.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function Settings() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [supportMessage, setSupportMessage] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const userId = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setName(userData.name || '');
      setAge(userData.age || '');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    try {
      await updateDoc(doc(db, 'users', userId), { name, age });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile: ', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send an email or create a support ticket
    // For this example, we'll just log to console
    console.log(`Support question: ${supportMessage}`);
    alert('Support question submitted. We will get back to you soon.');
    setSupportMessage('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form onSubmit={handleProfileUpdate} className="mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="mb-2 p-2 bg-navy text-yellow border border-yellow rounded block w-full"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          className="mb-2 p-2 bg-navy text-yellow border border-yellow rounded block w-full"
        />
        <button type="submit" className="bg-yellow text-navy font-bold py-2 px-4 rounded">
          Update Profile
        </button>
      </form>

      <h3 className="text-xl font-bold mb-2">Support</h3>
      <form onSubmit={handleSupportSubmit}>
        <textarea
          value={supportMessage}
          onChange={(e) => setSupportMessage(e.target.value)}
          placeholder="Enter your support question here"
          className="mb-2 p-2 bg-navy text-yellow border border-yellow rounded block w-full h-32"
        ></textarea>
        <button type="submit" className="bg-yellow text-navy font-bold py-2 px-4 rounded">
          Send Support Question
        </button>
      </form>
    </div>
  );
}

export default Settings;