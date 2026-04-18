import { useAuth } from '../context/AuthContext';
import styles from '../styles/AboutPage.module.css';

// Import your achievement images from assets folder
import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.png';
import pic3 from '../assets/pic3.png';
import pic4 from '../assets/pic4.png';
import pic5 from '../assets/pic5.png';

const AboutPage = () => {
  const { user } = useAuth();

  // Your personal tournament achievements
  const tournamentAchievements = [
    {
      id: 1,
      title: 'MLBB SCUAA REGIONALS Championship 2026',
      rank: '🏆 CHAMPION',
      image: pic1,
      description: 'Led my team to victory in the Regionals tournament, securing the championship title and bringing pride to our school.',
      date: 'February 2026',
      medal: '🥇 Gold Medal',
      location: 'Region 1 - Philippines'
    },
    {
      id: 2,
      title: 'SCUAA 2026 - National Games',
      rank: '🏆 GRAND CHAMPION',
      image: pic2,
      description: 'Represented our region and emerged as the overall champion in the national tournament. A moment of pride and glory!',
      date: 'February 2026',
      medal: '🏆 Grand Champion Trophy',
      location: 'National Level'
    },
    {
      id: 3,
      title: 'BEST MAGE AWARD',
      rank: '⚔️ MVP - BEST MAGE',
      image: pic3,
      description: 'Recognized as the Best Mage player for outstanding performance, exceptional game sense, and dominating mid-lane control throughout the tournament.',
      date: 'February 2026',
      medal: '⭐ MVP Title - Best Mage',
      location: 'Regional Tournament'
    },
    {
      id: 4,
      title: 'UNITY LEAGUE',
      rank: '4TH PLACE - TOP 4',
      image: pic4,
      description: 'Competed against the best teams in the community and secured a Top 4 finish. A testament to teamwork and dedication.',
      date: 'March 2024',
      medal: '🎮 Top 4 Finish',
      award: 'Jollibee Prize + Cash Reward',
      location: 'Community Tournament'
    },
    {
      id: 5,
      title: 'The Moment of Truth - Luzon Finals',
      rank: 'TOP CONTENDER',
      image: pic5,
      description: 'Competing against the top teams across Luzon. A challenging journey that tested our skills and teamwork against elite players.',
      date: '2024',
      medal: '🔥 Luzon Finalist',
      location: 'Luzon-wide Tournament'
    }
  ];

  // Your personal gaming journey
  const journeyMilestones = [
    { year: '2021', achievement: 'Started playing Mobile Legends', icon: '🎮' },
    { year: '2022', achievement: 'Reached Mythic rank for the first time', icon: '⭐' },
    { year: '2023', achievement: 'Joined first local tournament', icon: '🏆' },
    { year: '2023', achievement: 'Won Campus Championship', icon: '🥇' },
    { year: '2024', achievement: 'Created MobaFolio to inspire others', icon: '💡' },
    { year: '2024', achievement: 'Reached Mythical Glory 1000+ points', icon: '👑' },
    { year: '2026', achievement: 'SCUAA Regional & National Champion', icon: '🏆' }
  ];

  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section - Your Story */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.profileBadge}>
            <span className={styles.profileIcon}>🎮</span>
            <span>Mobile Legends Player • Tournament Champion • Content Creator</span>
          </div>
          <h1 className={styles.heroTitle}>My Mobile Legends Journey</h1>
          <p className={styles.heroSubtitle}>
            From a casual player to SCUAA Regional and National Champion — sharing my achievements, 
            experiences, and passion to inspire every MLBB player to reach their dreams.
          </p>
          {user && (
            <div className={styles.welcomeBadge}>
              🎉 Welcome back, {user.name}! Thanks for being part of this journey 🎉
            </div>
          )}
        </div>
      </div>

      {/* Personal Quote / Mission */}
      <div className={styles.quoteSection}>
        <div className={styles.quoteCard}>
          <p className={styles.quoteText}>
            "Every player starts somewhere. I started as a Warrior, and through dedication, 
            practice, and learning from losses, I reached Mythical Glory and became a 
            SCUAA Champion. Now, I want to help YOU achieve your gaming dreams too!"
          </p>
          <p className={styles.quoteAuthor}>- MobaFolio Creator & SCUAA Champion</p>
        </div>
      </div>

      {/* Tournament Achievements Section */}
      <h2 className={styles.sectionTitle}>🏆 Tournament Achievements</h2>
      <div className={styles.tournamentSection}>
        {tournamentAchievements.map((tournament) => (
          <div key={tournament.id} className={styles.tournamentCard}>
            <div className={styles.tournamentImageWrapper}>
              <img src={tournament.image} alt={tournament.title} className={styles.tournamentImage} />
              <div className={styles.tournamentRank}>{tournament.rank}</div>
            </div>
            <div className={styles.tournamentContent}>
              <h3>{tournament.title}</h3>
              <div className={styles.tournamentMeta}>
                <span className={styles.tournamentDate}>📅 {tournament.date}</span>
                <span className={styles.tournamentMedal}>{tournament.medal}</span>
                {tournament.location && (
                  <span className={styles.tournamentLocation}>📍 {tournament.location}</span>
                )}
              </div>
              <p>{tournament.description}</p>
              {tournament.award && (
                <div className={styles.tournamentAward}>🎁 Prize: {tournament.award}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Gaming Journey Timeline */}
      <div className={styles.timelineSection}>
        <h2 className={styles.sectionTitle}>📅 My MLBB Journey</h2>
        <div className={styles.timeline}>
          {journeyMilestones.map((milestone, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineIcon}>{milestone.icon}</div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>{milestone.year}</div>
                <p>{milestone.achievement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips & Advice Section */}
      <div className={styles.tipsSection}>
        <h2 className={styles.sectionTitle}>💡 Tips From My Experience</h2>
        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>🎯</div>
            <h3>Master Your Role</h3>
            <p>Focus on mastering 2-3 heroes in your preferred role. This helped me become consistent and reach Mythical Glory.</p>
          </div>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>🤝</div>
            <h3>Teamwork is Key</h3>
            <p>Communication and synergy with teammates won me more tournaments than individual skill alone. Trust your team!</p>
          </div>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>📹</div>
            <h3>Review & Improve</h3>
            <p>Recording and analyzing my matches helped me identify mistakes and improve faster. Every loss is a lesson.</p>
          </div>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>💪</div>
            <h3>Never Give Up</h3>
            <p>Losses are lessons. Every defeat taught me something that made me a better player. Keep pushing forward!</p>
          </div>
        </div>
      </div>

      {/* Call to Action - Inspire Others */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Start Your Journey?</h2>
          <p>
            If I can do it from being a Warrior to a SCUAA Champion, so can you! 
            Join MobaFolio today, share your achievements, and let's build a community 
            where every player inspires others to reach greater heights!
          </p>
          {!user ? (
            <div className={styles.ctaButtons}>
              <a href="/register" className={styles.ctaBtnPrimary}>Join the Community 🎮</a>
              <a href="/home" className={styles.ctaBtnSecondary}>Explore Achievements 👀</a>
            </div>
          ) : (
            <a href="/create-post" className={styles.ctaBtnPrimary}>Share Your Achievement ✍️</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;