import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { FileText, Search, Download, FolderOpen } from 'lucide-react';

const StudentNotes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch notes on load and when subject filter changes
  useEffect(() => {
    fetchNotes();
  }, [subject]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/notes', {
        params: { search, subject }
      });
      if (response.data.success) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchNotes();
  };

  return (
    <div className="text-start">
      <Header />

      <div className="glow-card p-4 mb-4">
        <h3 className="fw-bold text-white font-heading mb-2">Study Notes & Resource Library</h3>
        <p className="text-secondary mb-0">
          Acquire lecture materials, cheat sheets, and summaries uploaded by platform administrators. Filter by subject to download.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glow-card p-3 mb-4">
        <form onSubmit={handleSearchSubmit} className="row g-3 align-items-center">
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary" style={{ borderRight: 'none', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
                <Search size={18} />
              </span>
              <input 
                type="text" 
                className="form-control bg-dark border-secondary text-white" 
                placeholder="Search notes by keyword..." 
                style={{ borderLeft: 'none', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', outline: 'none', boxShadow: 'none' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <select 
              className="form-select bg-dark border-secondary text-white p-2.5" 
              style={{ borderRadius: '8px' }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="All">All Subjects</option>
              <option value="Java">Java</option>
              <option value="DBMS">DBMS</option>
              <option value="CN">CN</option>
              <option value="Aptitude">Aptitude</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-3 col-lg-2">
            <button type="submit" className="btn btn-primary-custom w-100 py-2.5">
              Apply Filter
            </button>
          </div>
        </form>
      </div>

      {/* Notes Registry Directory */}
      <div className="glow-card p-4">
        <h4 className="fw-bold text-white font-heading mb-4 d-flex align-items-center gap-2">
          <FolderOpen className="text-glow-cyan text-cyan" size={22} />
          <span>Available Study Materials</span>
        </h4>

        {loading ? (
          <div className="text-center py-5 text-secondary">
            <div className="spinner-border text-purple mb-2" role="status"></div>
            <p className="small m-0">Retrieving files from database...</p>
          </div>
        ) : notes.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle m-0" style={{ background: 'transparent' }}>
              <thead>
                <tr style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                  <th>Subject</th>
                  <th>Title</th>
                  <th>Uploaded Date</th>
                  <th>Author</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => (
                  <tr key={note._id} style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <td>
                      <span 
                        className="badge px-3 py-1.5 fw-semibold text-uppercase"
                        style={{ 
                          fontSize: '0.75rem',
                          background: note.subject === 'Java' ? 'rgba(139, 92, 246, 0.15)' :
                                      note.subject === 'DBMS' ? 'rgba(56, 189, 248, 0.15)' :
                                      note.subject === 'CN' ? 'rgba(236, 72, 153, 0.15)' :
                                      'rgba(245, 158, 11, 0.15)',
                          color:      note.subject === 'Java' ? '#8B5CF6' :
                                      note.subject === 'DBMS' ? '#38BDF8' :
                                      note.subject === 'CN' ? '#EC4899' :
                                      '#F59E0B',
                          border: '1px solid currentColor'
                        }}
                      >
                        {note.subject}
                      </span>
                    </td>
                    <td className="fw-semibold text-white">
                      <div className="d-flex align-items-center gap-2">
                        <FileText size={18} className="text-secondary opacity-75" />
                        <span>{note.title}</span>
                      </div>
                    </td>
                    <td className="text-secondary small">{new Date(note.createdAt).toLocaleDateString()}</td>
                    <td className="text-secondary small">{note.uploadedBy?.name || 'Admin'}</td>
                    <td className="text-end">
                      <a 
                        href={`${axios.defaults.baseURL || 'http://localhost:5000'}${note.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        download
                        className="btn btn-sm btn-outline-info d-inline-flex align-items-center gap-1.5 px-3 py-1.5"
                        style={{ borderRadius: '8px' }}
                      >
                        <Download size={14} /> Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-5 text-secondary small">
            No notes found. Try searching for other terms or subjects.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentNotes;
