// client/src/components/PracticeLogging.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PracticeLogging() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [times, setTimes] = useState(['', '', '', '', '']);
  const [average, setAverage] = useState(0);
  const [practiceDates, setPracticeDates] = useState([]);

  useEffect(() => {
    fetchPracticeDates();
  }, []);

  const fetchPracticeDates = async () => {
    const userId = auth.currentUser.uid;
    const practicesRef = collection(db, 'practices');
    const q = query(practicesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const dates = querySnapshot.docs.map(doc => new Date(doc.data().date));
    setPracticeDates(dates);
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...times];
    newTimes[index] = value;
    setTimes(newTimes);
    calculateAverage(newTimes);
  };

  const calculateAverage = (times) => {
    const validTimes = times.filter(time => time !== '');
    if (validTimes.length === 0) {
      setAverage(0);
      return;
    }
    const totalSeconds = validTimes.reduce((sum, time) => {
      const [minutes, seconds] = time.split(':').map(Number);
      return sum + minutes * 60 + seconds;
    }, 0);
    const averageSeconds = totalSeconds / validTimes.length;
    const averageMinutes = Math.floor(averageSeconds / 60);
    const averageRemainingSeconds = Math.round(averageSeconds % 60);
    setAverage(`${averageMinutes}:${averageRemainingSeconds.toString().padStart(2, '0')}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    try {
      await addDoc(collection(db, 'practices'), {
        userId,
        date: selectedDate.toISOString().split('T')[0],
        times: times.filter(time => time !== ''),
        averageTime: average
      });
      alert('Practice logged successfully!');
      setTimes(['', '', '', '', '']);
      setAverage(0);
      fetchPracticeDates();
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to log practice. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Log Practice</h2>
      <p className="mb-4">Instruction: Please log how much time you take to complete the practice process. 10X right hand, 10X left hand, 20X switching hand wall balls.</p>
      <form onSubmit={handleSubmit}>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          highlightDates={practiceDates}
          className="mb-4 p-2 bg-navy text-yellow border border-yellow rounded"
        />
        {times.map((time, index) => (
          <input
            key={index}
            type="text"
            placeholder="MM:SS"
            value={time}
            onChange={(e) => handleTimeChange(index, e.target.value)}
            className="mb-2 p-2 bg-navy text-yellow border border-yellow rounded block"
          />
        ))}
        <p className="mb-4">Average completion time: {average}</p>
        <button type="submit" className="bg-yellow text-navy font-bold py-2 px-4 rounded">
          Log Practice
        </button>
      </form>
    </div>
  );
}

export default PracticeLogging;
