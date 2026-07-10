import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleBuy = async (courseId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      // 1. Create order on backend
      const response = await fetch(`/api/courses/${courseId}/create-order`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (!response.ok) {
        alert(data.detail || 'Failed to initiate checkout');
        return;
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: data.key_id, 
        amount: data.amount,
        currency: data.currency,
        name: "IB DP Platform",
        description: data.course.name,
        order_id: data.order_id,
        handler: async function (response) {
          // 3. Verify payment on backend
          try {
            const verifyRes = await fetch('/api/courses/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                course_id: courseId
              })
            });
            
            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              navigate('/student?success=true');
            } else {
              alert(verifyData.detail || 'Payment verification failed');
            }
          } catch (err) {
            console.error('Verification error:', err);
            alert('An error occurred during payment verification.');
          }
        },
        prefill: {
          name: data.user.name,
          email: data.user.email,
        },
        theme: {
          color: "#faff69"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout.');
    }
  };

  return (
    <div className="section animate-fade-in" style={{ minHeight: '80vh', paddingTop: '96px', backgroundColor: 'var(--canvas)' }}>
      <div className="container">
        <h1 className="text-center display-md" style={{ marginBottom: '16px' }}>Our Courses</h1>
        <p className="text-center" style={{ color: 'var(--body)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
          Explore our expert-led IB DP courses designed to help you achieve top marks.
        </p>
        
        {loading ? (
          <p className="text-center">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-center" style={{ color: 'var(--muted)' }}>No courses available right now. Check back later!</p>
        ) : (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {courses.map((course, i) => (
              <div key={course.id} className="feature-card animate-slide-up hover-lift" style={{ display: 'flex', flexDirection: 'column', animationDelay: `${i * 100}ms` }}>
                <h3 className="title-md" style={{ marginBottom: '8px' }}>{course.title}</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '24px', flexGrow: 1 }}>{course.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--ink)' }}>₹{course.price}</span>
                  <button onClick={() => handleBuy(course.id)} className="btn-primary">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
