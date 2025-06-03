import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [posts, setPosts] = useState([]);
    const [form, setForm] = useState({ name: '', message: '' });

    // Load posts when component mounts
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE}/posts`)
            .then(res => setPosts(res.data))
            .catch(err => console.error("Error fetching posts:", err));
    }, []);

    const submitPost = async () => {
    if (!form.name.trim() || !form.message.trim()) return;

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE}/posts`, form);
        setPosts(prev => [...prev, res.data]); // Optimistic update
        setForm({ name: '', message: '' });
    } catch (err) {
        console.error("Error submitting post:", err);
    }
    };

    return (
        <div style={{ padding: 20, fontFamily: 'Arial' }}>
            <h1>DevConnect 🌐</h1>
            <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                style={{ display: 'block', margin: '8px 0', padding: 8 }}
            />
            <input
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Message"
                style={{ display: 'block', margin: '8px 0', padding: 8 }}
            />
            <button onClick={submitPost} style={{ padding: '8px 16px' }}>Post</button>

            <ul style={{ marginTop: 20 }}>
                {posts.map((p, i) => (
                    <li key={i}><b>{p.name}</b>: {p.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
