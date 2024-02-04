import PropTypes from 'prop-types';
export const ServerIcon = ({image}) => {
  return (
    <img src={image} alt="" className="h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl" />
  )
}
ServerIcon.propTypes = {
    image: PropTypes.string.isRequired,
  };