import { useState } from 'react';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="newsletter-section" id="newsletter-section">
      <div className="container">
        <div className="newsletter-inner">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay Informed</h2>
            <p className="newsletter-desc">
              Get the latest breaking news and top stories delivered straight to your inbox every morning.
            </p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="newsletter-input-wrapper">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="newsletter-email"
              />
              <button type="submit" className="newsletter-btn" id="newsletter-submit">
                {submitted ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </div>
            <p className="newsletter-privacy">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
