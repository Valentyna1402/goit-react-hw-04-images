import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { fetchImages } from './API';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('nature');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    async function getNewImages() {
      if (query === '') {
        setLoadMore(false);
        toast.error('Please, enter your request');
        return;
      }
      try {
        setLoading(true);
        setError(false);
        setLoadMore(false);
        const searchedImages = await fetchImages(query, page);

        if (searchedImages.hits.length === 0) {
          toast.error('Sorry, no more images available');
          setLoadMore(false);
        }
        setImages(prevImages => [...prevImages, ...searchedImages.hits]);
        setLoadMore(page < Math.ceil(searchedImages.totalHits / 12));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getNewImages();
  }, [query, page]);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <p>Oops! Something went wrong! Please reload this page!</p>}
      <ImageGallery images={images} />
      {loadMore && <Button onClick={handleLoadMore} />}
      <Toaster />
    </div>
  );
};
