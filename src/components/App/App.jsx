import React, { useState, useEffect } from 'react';
import { AppSheet } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { CreateGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import * as API from 'services/api';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery === '') return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await API.fetchAllData(searchQuery, page);
        const calculatedTotalPages = Math.ceil(data.totalHits / 12);
        setTotalPages(calculatedTotalPages);

        if (data.hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching to your search query!'
          );
          return;
        }

        setHits(prevHits => [...prevHits, ...data.hits]);

        if (page === 1) {
          toast.success(`We found ${data.totalHits} images!`);
        } else {
          setTimeout(() => scroll(), 100);
        }

        if (page >= calculatedTotalPages) {
          toast.info('Sorry, there is no matches!');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]);

  const scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };

  const handleSearchQuery = newSearchQuery => {
    setSearchQuery(newSearchQuery);
    setPage(1);
    setHits([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchQuery} />
      <AppSheet>
        {hits.length !== 0 && <CreateGallery hits={hits} />}
        {isLoading ? (
          <Loader />
        ) : (
          page < totalPages &&
          hits.length !== 0 && <Button onLoadMore={handleLoadMore} />
        )}
        {error && <p>An error occurred: {error.message}</p>}
      </AppSheet>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default App;
