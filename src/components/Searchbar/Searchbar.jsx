import {
  SearchbarHead,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled.js';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  let [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = event => {
    const searchQuery = event.target.value;

    setSearchQuery(searchQuery);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.info('Please, enter your search query!');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery((searchQuery = ''));
  };

  return (
    <SearchbarHead>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <ImSearch
            style={{ marginRight: 2, marginTop: 4, width: 25, height: 25 }}
          />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>
        <SearchFormInput
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHead>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
