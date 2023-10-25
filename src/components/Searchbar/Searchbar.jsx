import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" autoComplete="off" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">
            <FcSearch />
          </span>
        </button>
        <input
          name="search"
          className="SearchForm-input"
          type="text"
          placeholder="Search images and photos"
          autoFocus
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>
    </header>
  );
};

export default Searchbar;
