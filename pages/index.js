import { useState } from 'react';
import axios from 'axios';
import Search from '../components/Search';
import Profile from '../components/Profile';

export default function Home() {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error al obtener el perfil de GitHub:', error);
    }
  };

  return (
    <div className="container">
      <h1>Buscar perfil de GitHub</h1>
      <Search onSearch={fetchProfile} />
      <Profile profile={profile} />
    </div>
  );
}
