import React, { Component } from 'react';
import { AppSheet } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { CreateGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import * as API from 'services/api';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    hits: [],
    isLoading: false,
    isError: false,
    BtnLoadMore: false,
  };

  fetchData = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const data = await API.fetchAllData(searchQuery, page);
      const totalPages = Math.ceil(data.totalHits / 12);
      if (data.hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching to your search query!'
        );
        return;
      }

      this.setState(({ hits }) => ({
        hits: [...hits, ...data.hits],
        totalPages,
      }));

      if (page === 1) {
        toast.success(`We found ${data.totalHits} images!`);
      } else {
        setTimeout(() => this.scroll(), 100);
      }

      if (page >= totalPages) {
        toast.info('Sorry, there is no matches!');
      }
    } catch (error) {
      this.setState({ isError: true, Error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchData();
    }
  }

  handleSearchQuery = searchQuery => {
    this.setState({ searchQuery, page: 1, hits: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { hits, isLoading, page, totalPages } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchQuery} />
        <AppSheet>
          {hits.length !== 0 && <CreateGallery hits={hits} />}
          {isLoading ? (
            <Loader />
          ) : (
            page < totalPages &&
            hits.length !== 0 && <Button onLoadMore={this.handleLoadMore} />
          )}
        </AppSheet>
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
