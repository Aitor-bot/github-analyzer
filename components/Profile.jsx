import { FaBuilding, FaMapMarkerAlt, FaEnvelope, FaGlobe, FaLink } from 'react-icons/fa';

const Profile = ({ profile }) => {
  if (!profile) {
    return null;
  }

  return (
    <div className="profile">
      <img className="avatar" src={profile.avatar_url} alt={`${profile.login} avatar`} />
      <h2>{profile.login}</h2>
      <p>{profile.bio}</p>
      <p>Repositorios públicos: {profile.public_repos}</p>
      <div className="profile-info">
        {profile.company && (
          <div className="profile-info-item">
            <FaBuilding />
            <span>{profile.company}</span>
          </div>
        )}
        {profile.location && (
          <div className="profile-info-item">
            <FaMapMarkerAlt />
            <span>{profile.location}</span>
          </div>
        )}
        {profile.email && (
          <div className="profile-info-item">
            <FaEnvelope />
            <span>{profile.email}</span>
          </div>
        )}
        {profile.blog && (
          <div className="profile-info-item">
            <FaGlobe />
            <a href={profile.blog} target="_blank" rel="noopener noreferrer">
              {profile.blog}
            </a>
          </div>
        )}
        {profile.twitter_username && (
          <div className="profile-info-item">
            <FaLink />
            <a
              href={`https://twitter.com/${profile.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
