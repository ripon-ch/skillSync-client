import { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

export default function ReviewForm({ courseId, onReviewSubmitted }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          userId: user.uid,
          userName: user.displayName || 'Anonymous',
          userEmail: user.email,
          rating,
          reviewText
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Review submitted successfully!');
        setRating(0);
        setReviewText('');
        if (onReviewSubmitted) onReviewSubmitted();
      } else {
        toast.error(data.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Submit review error:', error);
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div style={{
        padding: '2rem',
        background: '#f3f4f6',
        borderRadius: '0.75rem',
        textAlign: 'center'
      }}>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          Please log in to submit a review
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.02), rgba(234, 88, 12, 0.02))',
      border: '1px solid rgba(220, 38, 38, 0.1)',
      borderRadius: '0.75rem',
      marginBottom: '2rem'
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem'
      }}>
        Write a Review
      </h3>

      {/* Rating Selection */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#374151'
        }}>
          Rating
        </label>
        <div style={{
          display: 'flex',
          gap: '0.5rem'
        }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                transition: 'transform 0.2s ease'
              }}
            >
              <Star
                size={28}
                fill={star <= (hoverRating || rating) ? '#fbbf24' : '#d1d5db'}
                color={star <= (hoverRating || rating) ? '#f59e0b' : '#9ca3af'}
                style={{ transition: 'all 0.2s ease' }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#374151'
        }}>
          Your Review
        </label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts about this course..."
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          background: 'linear-gradient(to right, #220359, #4906BF)',
          color: '#ffffff',
          padding: '0.75rem 2rem',
          border: 'none',
          borderRadius: '0.5rem',
          fontWeight: '600',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.6 : 1,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => !isSubmitting && (e.target.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
