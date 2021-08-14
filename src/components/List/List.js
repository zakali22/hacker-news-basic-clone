import * as React from 'react';
import {
  ListContainer,
  ListColumn,
  ListSortContainer,
  ListSortItem
} from './style';
import { Button, GridRow, Link } from '../App/style';
// import { filterList } from '../../utils';

const List = ({ list, onRemoveItem, onFilterList, filteredKey }) => (
  <>
    <ListSort onFilterList={onFilterList} filteredKey={filteredKey} />
    <ListContainer as="ul">
      {list.map((item) => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ListContainer>
  </>
);

const ListSort = ({ onFilterList, filteredKey }) => {
  const [isReverse, setIsReverse] = React.useState(false);

  const filterList = (e) => {
    if (isReverse) {
      setIsReverse(false);
    } else {
      setIsReverse(true);
    }

    onFilterList(e, isReverse);
  };

  return (
    <ListSortContainer as="ul">
      <ListSortItem
        onClick={filterList}
        isActive={filteredKey === 'title'}
      >
        Title
      </ListSortItem>
      <ListSortItem
        onClick={filterList}
        isActive={filteredKey === 'author'}
      >
        Author
      </ListSortItem>
      <ListSortItem
        onClick={filterList}
        isActive={filteredKey === 'comments'}
      >
        Comments
      </ListSortItem>
      <ListSortItem
        onClick={filterList}
        isActive={filteredKey === 'points'}
      >
        Points
      </ListSortItem>
    </ListSortContainer>
  );
};

const Item = ({ item, onRemoveItem }) => (
  <GridRow as="li">
    <ListColumn width="40%" overflow="true">
      <Link href={item.url}>{item.title}</Link>
    </ListColumn>
    <ListColumn width="20%" overflow="true">
      {item.author}
    </ListColumn>
    <ListColumn width="10%">{item.num_comments}</ListColumn>
    <ListColumn width="10%">{item.points}</ListColumn>
    <ListColumn width="10%">
      <Button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </Button>
    </ListColumn>
  </GridRow>
);

export { List };
