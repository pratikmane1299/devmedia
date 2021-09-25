import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';

import { useScreenWidth } from '../hooks/useScreenWidth';

import MainLayout from '../components/Layout/MainLayout';
import SearchHeader from '../components/ui/mobile/header/SearchHeader';

import API from '../services/API';
import Spinner from '../components/Layout/Spinner';
import UserHorizontalCard from '../components/suggested-users/UserHorizontalCard';
import { MiddlePanel } from '../components/Layout/GridPanels';

export function Search() {
  const screen = useScreenWidth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function handleSearch(query) {
    setLoading(true);
    const {data} = await API.get(`/api/v1/search?searchTerm=${encodeURIComponent(query)}`);

    setResults(data);
    setLoading(false);
  }

  if (screen !== 'fullscreen') return <Redirect to="/home" />

  return (
    <MainLayout
      mobileHeader={
        <SearchHeader
          onBackButtonClick={() => history.goBack()}
          onSearchChange={(e) => {
            const query = e.target.value;
            if (query !== "" && query.length >= 3) {
              handleSearch(query);
            }
          }}
        />
      }
    >
      <MiddlePanel>
        {loading ? (
          <Spinner />
        ) : results.length > 0 ? (
          <>
            {results.map((user) => (
              <UserHorizontalCard user={user} />
            ))}
          </>
        ) : <p>Query matched no users</p>}
        {/* <>
          {loading ? (
            <Spinner />
          ) : results.length > 0 ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              {results.map((user) => (
                <UserHorizontalCard user={user} />
              ))}
            </div>
          ) : (
            <p>Query matched no users</p>
          )}
        </> */}
      </MiddlePanel>
    </MainLayout>
  );
}
