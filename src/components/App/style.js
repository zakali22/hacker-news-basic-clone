import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(to left, #b6fbff, #83a4d4);
  color: #171212;
`;

export const Heading = styled.h1`
  color: #2d2d2d;
  font-weight: 100;
  font-size: 50px;
  letter-spacing: 2px;
`;

export const Button = styled.button`
  background: transparent;
  border: 1px solid #2d2d2d;
  padding: ${(p) => (p.isLarge ? '7px 15px' : '5px 10px')};
  cursor: pointer;
  margin-left: ${(p) => p.marginLeft && p.marginLeft};
  margin-right: ${(p) => p.marginRight && p.marginRight};
  margin-top: ${(p) => p.marginTop && p.marginTop};
  margin-bottom: ${(p) => p.marginBottom && p.marginBottom};

  &:hover {
    background: #2d2d2d;
    color: #fff;
  }
`;

export const Link = styled.a`
  color: #2d2d2d;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: ${(p) => (p.isVertical ? 'column' : 'row')};
  align-items: ${(p) => (p.isVertical ? 'flex-start' : 'stretch')};

  & > * {
    @media (max-width: 768px) {
      flex: 1 0 auto;
    }
  }
`;

export const FlexedRow = styled.div`
  display: flex;
  align-items: ${(p) => (p.alignItems ? p.alignItems : 'stretch')};
  flex-direction: ${(p) =>
    p.flexDirection ? p.flexDirection : 'row'};
  justify-content: ${(p) =>
    p.justifyContent ? p.justifyContent : 'flex-start'};
`;

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  padding: 0;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export const GridRow = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 7px;
  justify-content: space-between;

  & > *:last-child {
    padding-right: 0;
  }
`;

const isOverflow = css`
  white-space: ${(p) => p.overflow && 'nowrap'};
  overflow: ${(p) => p.overflow && 'hidden'};
  text-overflow: ${(p) => p.overflow && 'ellipsis'};
`;

export const GridColumn = styled.div`
  flex: 1 0 ${(p) => p.width};
  width: ${(p) => p.width};
  padding-right: ${(p) => (p.padding ? p.padding : '20px;')};

  ${isOverflow}
`;
