import * as React from 'react';
import axios from 'axios';

import { SearchForm } from '../Search/SearchForm';
import { LatestSearch } from '../Search/LatestSearch';
import { List } from '../List/List';
import { Container, Heading, Button } from './style';

import { filterStories } from '../../utils';

const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const getUrl = (searchTerm, page) => {
  return `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
};

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data:
          action.payload.page === 0
            ? action.payload.data
            : [...state.data, ...action.payload.data],
        page: action.payload.page
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        )
      };
    case 'FILTER_STORIES':
      return {
        ...state,
        data: filterStories(
          state.data,
          action.payload.filterText,
          action.payload.isReverse
        ),
        filteredKey: action.payload.filterText
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [url, setUrl] = React.useState([getUrl(searchTerm, 0)]);

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {
      data: [],
      page: 0,
      isLoading: false,
      isError: false,
      filteredKey: ''
    }
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const latestSearch = url[url.length - 1];
      const result = await axios.get(latestSearch);

      console.log(result);
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: {
          data: result.data.hits.filter(
            (hit) => hit.title.length > 0
          ),
          page: result.data.page
        }
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();

    window.addEventListener('scroll', function () {
      const pageHeight = document.body.offsetHeight;
      const scrollPos = window.innerHeight + window.pageYOffset;

      console.log('Scroll pos ' + scrollPos);
      console.log('Page height ' + pageHeight);

      if (scrollPos === pageHeight) {
        console.log('Bottom of page');
      }
    });
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (searchText, page) => {
    const urlSearch = getUrl(searchText, page);
    setUrl((url) => [...removeDuplicateSearches(url), urlSearch]);
  };

  const handleSearchSubmit = (event) => {
    handleSearch(searchTerm, 0);

    event.preventDefault();
  };

  const handleLatestSearch = (searchText) => {
    handleSearch(searchText, 0);
    setSearchTerm(searchText);
  };

  const handleFilterList = (event, isReverse) => {
    const filterText = event.target.innerText.toLowerCase();

    dispatchStories({
      type: 'FILTER_STORIES',
      payload: {
        filterText,
        isReverse
      }
    });
  };

  const handleMore = () => {
    handleSearch(searchTerm, stories.page + 1);
  };

  const removeDuplicateSearches = (url) => {
    console.log(url);
    return url.filter((item, index) => url.indexOf(item) === index);
  };

  return (
    <Container>
      <Heading>My Hacker Stories</Heading>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      {stories.isError && <p>Something went wrong ...</p>}

      <LatestSearch
        urls={url}
        handleLatestSearch={handleLatestSearch}
        searchTerm={searchTerm}
      />

      <List
        list={stories.data}
        onRemoveItem={handleRemoveStory}
        onFilterList={handleFilterList}
        filteredKey={stories.filteredKey}
      />

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <Button onClick={handleMore}>Load more</Button>
      )}
    </Container>
  );
};

export default App;
