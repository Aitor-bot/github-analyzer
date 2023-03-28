import { useState } from 'react';

const Search = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    onSearch(username);
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de usuario de GitHub"
      />
      <button onClick={handleSubmit}>Buscar</button>
    </div>
  );
};

export default Search;
