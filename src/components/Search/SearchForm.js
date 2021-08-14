import * as React from 'react';

import { InputWithLabel } from '../InputWithLabel';
import * as Styled from '../App/style';

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit
}) => (
  <Styled.Form onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <Styled.Button isLarge type="submit" disabled={!searchTerm}>
      Submit
    </Styled.Button>
  </Styled.Form>
);

export { SearchForm };
