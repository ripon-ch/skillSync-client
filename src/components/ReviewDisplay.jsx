import { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

export default function ReviewDisplay({ courseId, onReviewsLoad }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const parseResponseJson = async (response) => {
    if (!response) return {};
    if (response.bodyUsed) {
      return {};
    }
    try {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        return await response.json();
      }
      const text = await response.text();
      try {
        return text ? JSON.parse(text) : {};
      } catch (_err) {
        return {};
      }
    } catch (err) {
      console.error('Failed to parse response JSON:', err);
      return {};
    }
  };

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/reviews/${courseId}`);
      const data = await parseResponseJson(response);

      if (!response.ok) {
        setReviews([]);
        setStats({
          averageRating: 0,
          totalReviews: 0,
          distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        });
        toast.error(data?.error || 'Failed to load reviews');
        return;
      }

      setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      setStats({
        averageRating: data.averageRating || 0,
        totalReviews: data.totalReviews || 0,
        distribution: data.distribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      });
      if (onReviewsLoad) onReviewsLoad(data);
    } catch (error) {
      console.error('Fetch reviews error:', error);
      setReviews([]);
      setStats({
        averageRating: 0,
        totalReviews: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      });
      toast.error('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.uid })
      });

      const data = await parseResponseJson(response);
      if (!response.ok) {
        toast.error(data?.error || 'Failed to delete review');
        return;
      }

      if (data.success) {
        toast.success('Review deleted');
        fetchReviews();
      } else {
        toast.error(data.error || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Delete review error:', error);
      toast.error(error.message || 'Failed to delete review');
    }
  };

  const StarRating = ({ rating }) => (
    <div style={{ display: 'flex', gap: '0.25rem' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          fill={star <= rating ? '#fbbf24' : '#d1d5db'}
          color={star <= rating ? '#f59e0b' : '#9ca3af'}
        />
      ))}
    </div>
  );

  const RatingBar = ({ rating, count, total }) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '0.5rem'
      }}>
        <span style={{ width: '3rem', fontSize: '0.875rem', color: '#6b7280' }}>
          {rating} ��
        </span>
        <div style={{
          flex: 1,
          height: '0.5rem',
          background: '#e5e7eb',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
            width: `${percentage}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
        <span style={{ width: '3rem', fontSize: '0.875rem', color: '#6b7280', textAlign: 'right' }}>
          {count}
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#6b7280' }}>Loading reviews...</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '3rem' }}>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '2rem'
      }}>
        Course Reviews
      </h3>

      {/* Rating Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Overall Rating */}
        <div style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(79, 70, 229, 0.05))',
          border: '1px solid rgba(59, 130, 246, 0.1)',
          borderRadius: '0.75rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            {stats.averageRating.toFixed(1)}
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <StarRating rating={Math.round(stats.averageRating)} />
          </div>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Based on {stats.totalReviews} reviews
          </p>
        </div>

        {/* Rating Distribution */}
        <div style={{ padding: '2rem' }}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <RatingBar
              key={rating}
              rating={rating}
              count={stats.distribution[rating] || 0}
              total={stats.totalReviews}
            />
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div>
        {reviews.length === 0 ? (
          <div style={{
            padding: '2rem',
            background: '#f9fafb',
            borderRadius: '0.75rem',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            No reviews yet. Be the first to review this course!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {reviews.map((review) => (
              <div
                key={review._id}
                style={{
                  padding: '1.5rem',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <StarRating rating={review.rating} />
                    </div>
                    <p style={{
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      color: '#1f2937',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {review.userName}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#9ca3af',
                      margin: 0
                    }}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {user?.uid === review.userId && (
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  color: '#4b5563',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {review.reviewText}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
