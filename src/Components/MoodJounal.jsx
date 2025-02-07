import React, { useState } from 'react';
import CardContent from '../Components/CardContent';
import Card from '../Components/Card';
import Button from '../Components/Button';

export default function MoodTrackerJournal() {
    const [mood, setMood] = useState('');
    const [journalEntry, setJournalEntry] = useState('');
    const [affirmations, setAffirmations] = useState([
      'I am capable of achieving great things.',
      'I choose to be positive and optimistic.',
      'I am worthy of love and respect.',
    ]);
    const [newAffirmation, setNewAffirmation] = useState('');
  
    const moods = ['😊', '😐', '😭', '😡', '😪'];
  
    const handleMoodClick = (selectedMood) => {
      setMood(selectedMood);
    };
  
    const handleAddAffirmation = () => {
      if (newAffirmation.trim()) {
        setAffirmations([...affirmations, newAffirmation]);
        setNewAffirmation('');
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <h1 className="text-3xl font-bold mb-6 mt-[80px]">Mood Tracker & Journal</h1>
  
        {/* Mood Tracker */}
        <div className="w-full max-w-xl mb-6 p-4 shadow-md bg-white rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
          <div className="flex justify-around">
            {moods.map((emoji, index) => (
              <span
                key={index}
                className={`text-4xl cursor-pointer ${mood === emoji ? 'ring-2 ring-blue-500 rounded-full' : ''}`}
                onClick={() => handleMoodClick(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
  
        {/* Journal Entry */}
        <Card className="w-full max-w-xl mb-6 p-4 shadow-md h-[360px]">
            <div className='min-h-[20px]'>
          <h2 className="text-xl font-semibold mb-4">Journal Entry</h2>
          <div className="flex gap-2 flex-wrap mb-4">
            {['Today, I felt...', 'Something that made me smile was...', "I'm grateful for...", 'A challenge I faced was...'].map((prompt, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full cursor-pointer"
                onClick={() => setJournalEntry(journalEntry + (journalEntry ? ' ' : '') + prompt)}
              >
                {prompt}
              </span>
            ))}
          </div>
          <textarea
            className="w-full h-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write about your day..."
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
          />
          <Button className="mt-4 w-full">Save Entry</Button>
          </div>
        </Card>
  
        {/* Daily Affirmations */}
        <Card className="w-full max-w-xl p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Daily Affirmations</h2>
          <ul className="list-disc pl-5 mb-4">
            {affirmations.map((affirmation, idx) => (
              <li key={idx}>{affirmation}</li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter a new affirmation..."
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newAffirmation}
              onChange={(e) => setNewAffirmation(e.target.value)}
            />
            <Button className="bg-green-500 hover:bg-green-600" onClick={handleAddAffirmation}>Add</Button>
          </div>
        </Card>
      </div>
    );
  }