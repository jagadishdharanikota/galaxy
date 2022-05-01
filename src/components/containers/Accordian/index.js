import React from 'react';
import PropTypes from 'prop-types';

function Accordian(props) {
  const { dataSource } = props;
  const getAccordian = () => {
    return dataSource.map((item) => (
      <details>
        <summary>{item.summary}</summary>
        <p>{item.content}</p>
      </details>
    ));
  };

  return <div>{getAccordian()}</div>;
}

Accordian.propTypes = {
  dataSource: PropTypes.instanceOf(Array).isRequired,
};

export default Accordian;
