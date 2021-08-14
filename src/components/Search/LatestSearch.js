import * as React from 'react';
import { Button, FlexedRow } from '../App/style';

const LatestSearch = ({ urls, handleLatestSearch, searchTerm }) => {
  const [parsedUrl, setParsedUrl] = React.useState([]);

  const getParsedUrls = (urls) => {
    const urls_parsed_list = [];

    urls
      .filter((url) => {
        const urlParsed = new URL(url);
        return urlParsed.searchParams.get('query') !== searchTerm;
      })
      .slice(-5)
      .forEach((url) => {
        const urlParsed = new URL(url);
        urls_parsed_list.push(urlParsed.searchParams.get('query'));
      });

    setParsedUrl(urls_parsed_list);
  };

  React.useEffect(() => {
    getParsedUrls(urls);
  }, [urls]);

  return (
    <FlexedRow alignItems="center">
      <p style={{ marginRight: '10px' }}>Latest search:</p>
      {parsedUrl.map((urlLink, i) => (
        <Button
          marginRight="15px"
          key={i}
          onClick={() => handleLatestSearch(urlLink)}
        >
          {urlLink}
        </Button>
      ))}
    </FlexedRow>
  );
};

export { LatestSearch };
