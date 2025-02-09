import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import Button from '../Components/Button';

export default function MoodTrackerJournal() {
    const [mood, setMood] = useState('');
    const [journalEntry, setJournalEntry] = useState('');
    const [affirmations, setAffirmations] = useState([]);
    const [newAffirmation, setNewAffirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [previousEntries, setPreviousEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);  // To highlight selected entry

    useEffect(() => {
        fetchJournals();
    }, []);

    async function fetchJournals() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_USER_URL}/getJournals`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            console.log(res.data.Journals);
            setPreviousEntries(res.data.Journals);
        } catch (err) {
            console.log(err);
        }
    }

    const moods = ['😊', '😐', '😭', '😡', '😪', '😍', '🤔', '😤', '🤩', '🥳'];


    const handleMoodClick = (selectedMood) => {
        setMood(selectedMood);
    };

    const handleGenerateAffirmations = async () => {
        if (!mood || !journalEntry.trim()) {
            alert('Please select a mood and write a journal entry!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_USER_URL}/moodJournal`, {
                moodEmoji: mood,
                moodText: journalEntry,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            const parsedAffirmations = JSON.parse(response.data.affirmations);
            setAffirmations(parsedAffirmations);
            setMood('');
            setJournalEntry('');

            // Save the new entry with affirmations in previous entries
            setPreviousEntries([
                { mood, moodText: journalEntry, affirmations: parsedAffirmations },
                ...previousEntries
            ]);
        } catch (error) {
            console.error('Error fetching affirmations:', error);
            alert('Failed to fetch affirmations. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddAffirmation = () => {
        if (newAffirmation.trim()) {
            setAffirmations([...affirmations, newAffirmation]);
            setNewAffirmation('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row mt-[70px]">
            {/* Sidebar */}
            <aside className="md:w-64 w-full bg-white shadow-lg p-4 mb-4 md:mb-0">
                <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Previous Entries</h2>
                <ul className="space-y-2">
                    {previousEntries.length > 0 ? (
                        previousEntries.map((entry, idx) => (
                            <li
                                key={idx}
                                className={`p-3 border rounded-lg cursor-pointer transition ${
                                    selectedEntry === idx ? 'bg-blue-200' : 'bg-gray-50 hover:bg-blue-100'
                                }`}
                                onClick={() => {
                                    setAffirmations(entry.affirmations);
                                    setSelectedEntry(idx);
                                }}
                            >
                                <p className="text-sm">
                                    <strong>{entry.moodEmoji}</strong>: {entry.moodText.substring(0, 30)}...
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center md:text-left">No previous entries</p>
                    )}
                </ul>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 flex flex-col items-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 mt-4">Mood Tracker & Journal</h1>

                {/* Affirmations Section (Only Shows When Generated) */}
                {affirmations.length > 0 && (
                    <Card className="w-full max-w-xl p-4 shadow-md mb-4 md:mb-6 bg-green-50 border-l-4 border-green-400">
                        <h2 className="text-lg md:text-xl font-semibold mb-4">Daily Affirmations</h2>
                        <ul className="list-disc pl-5 mb-4 text-sm md:text-base">
                            {affirmations.map((affirmation, idx) => (
                                <li key={idx} className='text-[18px]'>{affirmation}</li>
                            ))}
                        </ul>
                    </Card>
                )}

                {/* Mood Selection */}
                <div className="w-full max-w-xl mb-4 md:mb-6 p-4 shadow-md bg-white rounded-lg">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">How are you feeling today?</h2>
                    <div className="flex justify-around">
                        {moods.map((emoji, index) => (
                            <span
                                key={index}
                                className={`text-3xl md:text-4xl cursor-pointer ${mood === emoji ? 'ring-2 ring-blue-500 rounded-full' : ''}`}
                                onClick={() => handleMoodClick(emoji)}
                            >
                                {emoji}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Journal Entry */}
                <Card className="w-full max-w-xl mb-4 md:mb-6 p-4 shadow-md h-auto md:h-[360px]">
                    <div className='min-h-[20px]'>
                        <h2 className="text-lg md:text-xl font-semibold mb-4">Journal Entry</h2>
                        <div className="flex gap-2 flex-wrap mb-4">
                            {['Today, I felt...', 'Something that made me smile was...', "I'm grateful for...", 'A challenge I faced was...'].map((prompt, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-full cursor-pointer text-sm md:text-base"
                                    onClick={() => setJournalEntry(journalEntry + (journalEntry ? ' ' : '') + prompt)}
                                >
                                    {prompt}
                                </span>
                            ))}
                        </div>
                        <textarea
                            className="w-full h-24 md:h-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write about your day..."
                            value={journalEntry}
                            onChange={(e) => setJournalEntry(e.target.value)}
                        />
                        <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600" onClick={handleGenerateAffirmations}>
                            {loading ? 'Generating Affirmations...' : 'Generate Affirmations'}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
