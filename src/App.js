import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [posts, setPosts] = useState([]);
    const [form, setForm] = useState({ name: '', message: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/posts').then(res => setPosts(res.data));
    }, []);

    const submitPost = async () => {
        await axios.post('http://localhost:5000/posts', form);
        setForm({ name: '', message: '' });
    };

    return (
        <div>
            <h1>DevConnect 🌐</h1>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" />
            <input value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Message" />
            <button onClick={submitPost}>Post</button>
            <ul>
                {posts.map((p, i) => <li key={i}><b>{p.name}</b>: {p.message}</li>)}
            </ul>
        </div>
    );
}

export default App;
