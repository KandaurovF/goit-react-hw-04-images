import { ImgGalleryUl } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const CreateGallery = ({ hits }) => {
  return (
    <ImgGalleryUl>
      {hits &&
        hits.map(hit => {
          return <ImageGalleryItem key={hit.id} hit={hit} />;
        })}
    </ImgGalleryUl>
  );
};
CreateGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ),
};
