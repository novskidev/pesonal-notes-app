import React, { useState } from 'react';
import '../style/App.css';

const initialNotes = [

];

const App = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState({ title: '', body: '' });
  const [charLimit, setCharLimit] = useState(50);

  const addNote = () => {
    const newNoteData = {
      id: +new Date(),
      title: newNote.title,
      body: newNote.body,
      archieved: false,
      createdAt: new Date().toISOString(),
    };

    setNotes([...notes, newNoteData]);
    setNewNote({ title: '', body: '' });
    setCharLimit(50);
  };

  const deleteNote = (id) => {
    const shouldDelete = window.confirm('Apakah Anda yakin ingin menghapus catatan ini?');

    if (shouldDelete) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setNewNote({ ...newNote, title: value });
      setCharLimit(50 - value.length);
    }
  };

  return (
    <div className="App">
      <h1>My Personal Notes 📖</h1>

      <div>
        <h2>Daftar Catatan</h2>
        {notes.length === 0 ? (
          <p>Belum ada catatan</p>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <strong>{note.title}</strong>
                <p>{note.body}</p>
                <p>Dibuat pada: {new Date(note.createdAt).toLocaleString()}</p>
                <button onClick={() => deleteNote(note.id)}>Hapus</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>Tambah Catatan Baru</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addNote();
          }}
        >
          <label>
            Judul:
            <input
              type="text"
              value={newNote.title}
              onChange={handleTitleChange}
            />
            <span>Jumlah Karakter Tersisa: {charLimit}</span>
          </label>
          <label>
            Isi Catatan:
            <textarea
              value={newNote.body}
              onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
            />
          </label>
          <button type="submit">Tambah Catatan</button>
        </form>
      </div>
    </div>
  );
};

export default App;
