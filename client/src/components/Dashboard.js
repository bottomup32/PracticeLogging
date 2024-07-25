// client/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

function Dashboard() {
  const [practiceData, setPracticeData] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const practicesRef = collection(db, 'practices');
    const q = query(practicesRef, where('userId', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        date: doc.data().date,
        averageTime: doc.data().averageTime
      }));
      setPracticeData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Practice Progress</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={practiceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="averageTime" stroke="#FFFF00" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;