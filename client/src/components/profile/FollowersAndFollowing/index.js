import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { connect } from 'react-redux';

import { MiddlePanel } from "../../Layout/GridPanels";
import MainLayout from "../../Layout/MainLayout";
import Following from './Following';
import Followers from './Followers';

const tabs = [
  {
    label: 'Following',
    title: 'following',
  },
  {
    label: 'Followers',
    title: 'followers',
  }
];

export const FollowersAndFollowing = ({ auth }) => {

  const location = useLocation();
  const history = useHistory();

  let pathName = location.pathname;

  const currentNestedPath = pathName.split('/').slice(-1)[0];

  const [activeTab, setActiveTab] = useState(currentNestedPath || 'following');

  useEffect(() => {
    history.push(pathName.replace(currentNestedPath, activeTab));
  }, [activeTab, currentNestedPath, history, pathName]);

  return (
    <MainLayout>
      <MiddlePanel
        stickyChildren={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.5rem 0",
            }}
          >
            {tabs.map((tab, i) => (
              <button
                key={i}
                className={`profile-tab-btn mr-1 ${
                  activeTab === tab.title && "profile-tab-btn-selected"
                }`}
                onClick={(e) => setActiveTab(tab.title)}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        }
        auth={auth}
      >
        <div style={{ marginTop: "0.5rem", width: "100%" }}>
          <div style={{ marginTop: "0.5rem" }}>
            {activeTab === 'following' && (
              <Following />
            )}
            {activeTab === 'followers' && (
              <Followers />
            )}
          </div>
        </div>
      </MiddlePanel>
    </MainLayout>
  );
};

function mapStateToProps(store) {
  return { auth: store.auth };
}

export default connect(mapStateToProps)(FollowersAndFollowing);
