import PropTypes from 'prop-types';

const FormattedPrice = ({
    price, ...props
}) => {
    price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return price;
};

FormattedPrice.propTypes = {
  price: PropTypes.number.isRequired,
};

export default FormattedPrice;
