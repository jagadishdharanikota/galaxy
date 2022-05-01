import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
  const { config } = props;
  const { alternateText, className, imageUrl, height, width } = config;
  return (
    <img
      data-category="control"
      className={className}
      src={imageUrl}
      alt={alternateText}
      width={width}
      height={height}
    />
  );

  /*
	<picture>
  		<source media="(min-width: 650px)" srcset="img_food.jpg">
  		<source media="(min-width: 465px)" srcset="img_car.jpg">
  		<img src="img_girl.jpg">
	</picture>
	*/
};

Image.propTypes = {
  config: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

Image.defaultProps = {
  className: '',
  height: 50,
  width: 50,
};

export default Image;
