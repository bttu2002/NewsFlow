import './PodcastSection.css';

const PODCASTS = [
  {
    title: 'Daily News Roundup',
    host: 'Sarah Johnson',
    cover: '🎙️',
    duration: '32 min',
  },
  {
    title: 'Tech Talk Weekly',
    host: 'Michael Chen',
    cover: '💻',
    duration: '45 min',
  },
  {
    title: 'Global Affairs Today',
    host: 'Emma Williams',
    cover: '🌍',
    duration: '28 min',
  },
];

export default function PodcastSection() {
  return (
    <section className="podcast-section section" id="podcast-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Latest Podcast</h2>
        </div>
        <div className="podcast-grid">
          {PODCASTS.map((podcast) => (
            <div className="podcast-card" key={podcast.title}>
              <div className="podcast-cover">
                <span className="podcast-emoji">{podcast.cover}</span>
                <button className="play-btn" aria-label="Play podcast">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
              </div>
              <div className="podcast-info">
                <h4 className="podcast-title">{podcast.title}</h4>
                <p className="podcast-host">By {podcast.host}</p>
                <div className="podcast-meta">
                  <span className="podcast-duration">{podcast.duration}</span>
                  <button className="listen-now-btn">Listen Now →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
