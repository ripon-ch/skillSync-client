import { useState, useEffect } from 'react';
import { Save, BookOpen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

export default function NotesForm({ courseId, onNotesUpdated }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchNotes();
    }
  }, [user?.email, courseId]);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/notes?courseId=${courseId}&email=${encodeURIComponent(user.email)}`);
      if (response.ok) {
        const data = await response.json();
        setNotes(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!noteText.trim()) {
      toast.error('Please write a note');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          userEmail: user.email,
          userName: user.displayName || 'Anonymous',
          text: noteText,
          createdAt: new Date()
        })
      });

      if (response.ok) {
        toast.success('Note saved successfully!');
        setNoteText('');
        await fetchNotes();
        if (onNotesUpdated) onNotesUpdated();
      } else {
        toast.error('Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save note');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Delete this note?')) return;

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email })
      });

      if (response.ok) {
        toast.success('Note deleted');
        await fetchNotes();
      } else {
        toast.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note');
    }
  };

  if (!user) {
    return (
      <div style={{
        padding: '2rem',
        background: '#f3f4f6',
        borderRadius: '0.75rem',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <p style={{ color: '#6b7280' }}>
          Please log in to add notes
        </p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.02), rgba(168, 85, 247, 0.02))',
      border: '1px solid rgba(96, 165, 250, 0.1)',
      borderRadius: '0.75rem',
      marginBottom: '2rem'
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <BookOpen size={24} />
        Study Notes
      </h3>

      {/* Add Note Form */}
      <form onSubmit={handleAddNote} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add your study notes here..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: '#5E3FDE',
            color: '#ffffff',
            padding: '0.625rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => !isSubmitting && (e.target.style.background = '#4a2fa8')}
          onMouseLeave={(e) => (e.target.style.background = '#5E3FDE')}
        >
          <Save size={16} />
          {isSubmitting ? 'Saving...' : 'Save Note'}
        </button>
      </form>

      {/* Notes List */}
      {isLoading ? (
        <p style={{ color: '#6b7280', textAlign: 'center' }}>Loading notes...</p>
      ) : notes.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Your Notes ({notes.length})
          </h4>
          {notes.map((note) => (
            <div
              key={note._id}
              style={{
                padding: '1rem',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.5rem'
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#6b7280'
                }}>
                  {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString()}
                </p>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    padding: '0.25rem'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p style={{
                color: '#1f2937',
                lineHeight: '1.5'
              }}>
                {note.text}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#6b7280', textAlign: 'center', fontStyle: 'italic' }}>
          No notes yet. Add one above!
        </p>
      )}
    </div>
  );
}
