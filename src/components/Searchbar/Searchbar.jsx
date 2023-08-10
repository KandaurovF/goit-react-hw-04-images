import {
  SearchbarHead,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled.js';
import { toast } from 'react-toastify';
import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    searchQuery: '',
  };
  handleNameChange = event => {
    const searchQuery = event.target.value;

    this.setState({ searchQuery: searchQuery });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.info('Please, enter your search query!');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchbarHead>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <ImSearch
              style={{ marginRight: 2, marginTop: 4, width: 25, height: 25 }}
            />
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>
          <SearchFormInput
            type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHead>
    );
  }
}
