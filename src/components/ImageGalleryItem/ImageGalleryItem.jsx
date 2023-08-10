import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { ImgGalleryItemLi, ImgGalleryItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ hit }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { webformatURL, largeImageURL, tags } = hit;
  return (
    <>
      <ImgGalleryItemLi onClick={toggleModal}>
        <ImgGalleryItemImg src={webformatURL} alt={tags} loading="lazy" />
      </ImgGalleryItemLi>
      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  hit: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
