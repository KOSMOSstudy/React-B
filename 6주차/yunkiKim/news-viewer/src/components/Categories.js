import styled, {css} from "styled-components";
import PropTypes from 'prop-types';

import categories from "../lib/categories";

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled.div`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;
  
  &:hover {
    color: #495057;
  }
  
  & + & {
    margin-left: 1rem;
  }
  
  ${({active}) => active && css`
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  `}
`;

const Categories = ({handleSelect, category}) => {
  return (
    <CategoriesBlock>
      {categories.map(({name, text}) => (
        <Category
          key={name}
          active={category === name}
          onClick={() => handleSelect(name)}
        >
          {text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

Categories.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default Categories;