import PropTypes from 'prop-types';
import { BtnLoadMore, Wrapper } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <Wrapper>
      <BtnLoadMore type="button" onClick={() => onLoadMore()}>
        Load More
      </BtnLoadMore>
    </Wrapper>
  );
};
Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
