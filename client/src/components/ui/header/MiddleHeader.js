import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Downshift from 'downshift';

import API from '../../../services/API';
import { useScreenWidth } from '../../../hooks/useScreenWidth';

import SearchBox from '../SearchBox';
import UserHorizontalCard from '../../suggested-users/UserHorizontalCard';
import RightHeader from './RightHeader';

function MiddleHeader({
  auth,
}) {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const history = useHistory();
  const screen = useScreenWidth();

  useEffect(() => {
    (async function () {
      if (text !== '') {
        const { data } = await API.get(`/api/v1/search?searchTerm=${encodeURIComponent(text)}`);
  
        setResults(data);
      }
    })()
  }, [text]);

  // return <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
  //   <SearchBox mobile={false} loading={false} onChange={(e) => e.target.value} />
  // </div>;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Downshift
        onChange={(selection) => {
          console.log(selection);
          if (!selection) return "";

          history.push(`/profiles/${selection._id}`);
          return;
        }}
        itemToString={(item) => {
          if (!item) return "";

          return item.name;
        }}
        onInputValueChange={(value) => setText(value)}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
          getRootProps,
        }) => {
          // console.log(getInputProps, getItemProps, getMenuProps, isOpen, inputValue, selectItem, getRootProps)
          return (
            <div
              style={{
                position: "relative",
                width: "100%",
                zIndex: "100px",
                display: "flex",
                // flex: 1,
              }}
            >
              <SearchBox {...getInputProps()} placeholder="search users..." />
              {isOpen && (
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    // backgroundColor: "red",
                    borderRadius: "1rem",
                    minHeight: "100px",
                    maxHeight: "50vh",
                    top: "-10px",
                    left: "-10px",
                    right: "0px",
                    boxShadow: "-3px 4px 14px rgba(0, 0, 0, 0.7)",
                    width: "calc(100% + 20px)",
                    zIndex: 10,
                  }}
                  // {...getRootProps({ refKey: 'ref' })}
                >
                  <ul
                    style={{
                      width: "100%",
                      marginTop: "3.5rem",
                      overflowY: "auto",
                      backgroundColor: "#f5f5f5",
                      borderBottomLeftRadius: "1rem",
                      borderBottomRightRadius: "1rem",
                    }}
                    {...getMenuProps()}
                  >
                    {results.length === 0 && (
                      <p style={{ margin: "1rem" }}>no results</p>
                    )}
                    {results.map((item, index) => {
                      return (
                        <li
                          {...getItemProps({
                            key: item._id,
                            item,
                            index,
                            isActive: highlightedIndex === index,
                            isSelected: selectedItem === item,
                          })}
                          key={item._id}
                          style={{
                            margin: "0.5rem 0",
                            padding: "0.5rem 1rem",
                            borderBottom: "1px solid #ccc",
                          }}
                        >
                          <UserHorizontalCard user={item} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        }}
      </Downshift>
      {screen === "1-cols" && (
        <RightHeader
          loading={auth.loading}
          isAuthenticated={auth.isAuthenticated}
          user={auth.user}
        />
      )}
    </div>
  );
}

export default MiddleHeader
