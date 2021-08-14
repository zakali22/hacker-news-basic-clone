import styled, { css } from 'styled-components';
import { GridContainer, GridColumn, Button } from '../App/style';

export const ListContainer = styled(GridContainer)`
  list-style: none;
  margin-top: 40px;
`;

export const ListColumn = styled(GridColumn)`
  @media (max-width: 767px) {
    &:first-of-type {
      flex: 1 0 40%;
      width: 40%;
    }
    flex: 1 0 10%;
    width: 10%;

    &:last-of-type {
      flex: 0;
    }
  }
`;

export const ListSortContainer = styled.div`
  display: flex;
  padding: 0;
  margin: 20px 0 0 0;
`;

const isActive = css`
  background: ${(p) => p.isActive && '#2d2d2d'};
  color: ${(p) => p.isActive && '#fff'};
`;

export const ListSortItem = styled(Button)`
  list-style: none;
  padding: 6px 10px;
  font-size: 18px;
  border: 1px solid #2d2d2d;
  border-radius: 6px;
  cursor: pointer;

  ${isActive}

  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;
