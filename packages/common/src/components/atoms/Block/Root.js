import React from 'react';
import { oneOf } from 'prop-types';
import styled from 'styled-components';

const Nav = styled.nav``;

const Header = styled.header``;

const Footer = styled.footer``;

const Section = styled.section``;

const Article = styled.article``;

const Div = styled.div``;

const Root = ({ as, ...props }) => {
  switch (as) {
    case 'nav': return <Nav {...props} />;
    case 'header': return <Header {...props} />;
    case 'footer': return <Footer {...props} />;
    case 'section': return <Section {...props} />;
    case 'article': return <Article {...props} />;
    default: return <Div {...props} />;
  }
};

Root.propTypes = {
  as: oneOf(['nav', 'section', 'article', 'div']).isRequired,
};

Root.defaultProps = {
  as: 'div',
};

export default Root;
