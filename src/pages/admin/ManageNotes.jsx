import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { FileText, Plus, Trash2, FolderOpen, Upload } from 'lucide-react';

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Java');
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/notes');
      if (response.data.success) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error('Failed to load notes catalog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadNote = async (e) => {
    e.preventDefault();
    if (!title || !subject || !selectedFile) {
      alert('Please fill out the title, select a subject, and choose a document file to upload.');
      return;
    }

    try {
      setSubmitting(true);
      
      // Build FormData for multipart file upload
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subject', subject);
      formData.append('noteFile', selectedFile);

      const response = await axios.post('/api/notes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setNotes([response.data.note, ...notes]);
        setTitle('');
        setSubject('Java');
        setSelectedFile(null);
        // Reset file input element visually
        e.target.reset();
        alert('Notes uploaded and registered successfully!');
      }
    } catch (error) {
      console.error('Failed to upload notes:', error);
      alert(error.response?.data?.message || 'Error uploading notes. Check that it is a valid document format.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Delete this note and its physical PDF file?')) return;

    try {
      const response = await axios.delete(`/api/notes/${noteId}`);
      if (response.data.success) {
        setNotes(prev => prev.filter(n => n._id !== noteId));
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Failed to remove note.');
    }
  };

  return (
    <div className="text-start">
      <Header />

      <div className="glow-card p-4 mb-4">
        <h3 className="fw-bold text-white font-heading mb-2">Manage Lecture Notes Library</h3>
        <p className="text-secondary mb-0">
          Upload PDF notes, summaries, or syllabi documents for student access, and remove old items.
        </p>
      </div>

      <div className="row g-4">
        {/* Upload form block */}
        <div className="col-lg-4">
          <div className="glow-card p-4">
            <h4 className="fw-bold text-white font-heading mb-3 d-flex align-items-center gap-2">
              <Upload size={20} className="text-purple text-glow-purple" />
              <span>Upload PDF Note</span>
            </h4>

            <form onSubmit={handleUploadNote}>
              <div className="mb-3">
                <label className="form-label text-secondary small">Note Title</label>
                <input 
                  type="text" 
                  className="form-control bg-dark border-secondary text-white p-2.5" 
                  placeholder="e.g. DBMS Normalization Cheat-sheet"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                  style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small">Target Subject</label>
                <select 
                  className="form-select bg-dark border-secondary text-white p-2.5" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ borderRadius: '8px' }}
                >
                  <option value="Java">Java</option>
                  <option value="DBMS">DBMS</option>
                  <option value="CN">CN</option>
                  <option value="Aptitude">Aptitude</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary small">Choose Document File</label>
                <input 
                  type="file" 
                  className="form-control bg-dark border-secondary text-white p-2" 
                  style={{ borderRadius: '8px' }}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                  required
                />
                <small className="text-secondary text-xs mt-1 d-block" style={{ fontSize: '0.75rem' }}>
                  Allowed: PDF, DOC, DOCX, PPT, PPTX, TXT. Max: 10MB
                </small>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary-custom w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
                disabled={submitting}
              >
                <Plus size={18} /> {submitting ? 'Uploading...' : 'Upload Notes'}
              </button>
            </form>
          </div>
        </div>

        {/* Existing notes lists */}
        <div className="col-lg-8">
          <div className="glow-card p-4 h-100">
            <h4 className="fw-bold text-white font-heading mb-4 d-flex align-items-center gap-2">
              <FolderOpen size={22} className="text-cyan text-glow-cyan" />
              <span>Uploaded Library Catalog</span>
            </h4>

            {loading ? (
              <div className="text-center py-5 text-secondary">
                <div className="spinner-border text-purple mb-2" role="status"></div>
                <p className="small m-0">Loading file index...</p>
              </div>
            ) : notes.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle m-0" style={{ background: 'transparent' }}>
                  <thead>
                    <tr style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                      <th>Subject</th>
                      <th>Title</th>
                      <th>Upload Date</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map((note) => (
                      <tr key={note._id} style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <td>
                          <span className="badge bg-purple bg-opacity-15 text-purple px-2.5 py-1.5 rounded" style={{ fontSize: '0.75rem', border: '1px solid currentColor' }}>
                            {note.subject}
                          </span>
                        </td>
                        <td className="fw-semibold text-white">
                          <div className="d-flex align-items-center gap-2">
                            <FileText size={18} className="opacity-75" />
                            <span>{note.title}</span>
                          </div>
                        </td>
                        <td className="text-secondary small">{new Date(note.createdAt).toLocaleDateString()}</td>
                        <td className="text-end">
                          <button 
                            onClick={() => handleDeleteNote(note._id)}
                            className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1.5 px-3 py-1.5"
                            style={{ borderRadius: '8px' }}
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-secondary text-center py-5 m-0 small">No files uploaded. Use the panel on the left to add documents.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageNotes;
