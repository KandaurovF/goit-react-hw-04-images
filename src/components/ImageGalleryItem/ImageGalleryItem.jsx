import React, { Component } from 'react';
import { Modal } from '../Modal/Modal';
import { ImgGalleryItemLi, ImgGalleryItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { showModal } = this.state;
    const { webformatURL, largeImageURL, tags } = this.props.hit;
    return (
      <>
        <ImgGalleryItemLi onClick={this.toggleModal}>
          <ImgGalleryItemImg src={webformatURL} alt={tags} loading="lazy" />
        </ImgGalleryItemLi>
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  hit: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
