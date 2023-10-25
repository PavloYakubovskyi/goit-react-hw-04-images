import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/Searchbar';
import * as API from './components/services/api';
import Loader from './components/Loader/Loader';

const API_KEY = '38952282-40725538619d219cb8ed057cd';

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalImgs, setTotalImgs] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchValue) return;

    const fetch = async () => {
      setStatus('pending');

      try {
        const res = await API.searchImgs(searchValue, API_KEY, page);
        if (res.totalHits === 0) {
          setStatus('rejected');
          return;
        }
        setGallery(s => [...s, ...res.hits]);
        setTotalImgs(res.total);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    };

    fetch();
  }, [searchValue, page]);

  const onSubmit = value => {
    if (value === '') {
      alert('Please enter your request!');
      return;
    }
    if (value === searchValue) {
      alert(`Ви це вже знайшли "${searchValue}"`);
      return;
    }
    setTotalImgs(0);
    setGallery([]);
    setSearchValue(value);
    setPage(1);
  };

  const onLoadMore = () => {
    setStatus('pending');
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} totalImgs={totalImgs} status={status} />
      {status === 'idle' && (
        <p className="start-text">Please enter your request</p>
      )}
      {status === 'rejected' && (
        <p className="start-text">
          Sorry, no result at your request "{searchValue}"
        </p>
      )}

      <ImageGallery items={gallery} status={status} searchValue={searchValue} />

      {status === 'pending' && <Loader />}

      {gallery.length !== 0 && totalImgs > 12 && gallery.length % 2 === 0 && (
        <Button onClick={onLoadMore} classname={'Button'}>
          Load more
        </Button>
      )}
    </div>
  );
}
