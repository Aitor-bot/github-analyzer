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
      </div>
    );
  };
  
  export default Profile;
  