import { useState } from 'react'

import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfilePosts from './ProfilePosts';

const tabs = [
  {
    label: 'About',
    title: 'about',
  },
  {
    label: 'Education',
    title: 'education',
  },
  {
    label: 'Work Experience',
    title: 'workexperience',
  },
  {
    label: 'Posts',
    title: 'posts',
  }
]

function ProfileTabs({
  profile,
  isCurrentUser,
  onEducationDelete,
  onExperienceDelete,
  onActionClicked,
}) {

  const [activeTab, setActiveTab] = useState('about');

  return (
    <div style={{ marginTop: '0.5rem', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0.5rem 0' }}>
        {tabs.map((tab, i) => (
          <button key={i} className={`profile-tab-btn ${activeTab === tab.title && 'profile-tab-btn-selected'}`} onClick={e => setActiveTab(tab.title)}>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        {activeTab === 'about' && (
          <ProfileAbout
            className={activeTab !== 'about' ? 'hidden' : ''}
            bio={profile.bio}
            followers={profile.meta.followers}
            following={profile.meta.following}
            social={profile.social}
            skills={profile.skills}
            username={profile.user.username}
            website={profile.website}
          />
        )}
        {activeTab === 'education' && (
          <ProfileEducation 
            // className={activeTab !== 'education' ? 'hidden' : ''}
            educations={profile.education}
            isCurrentUser={isCurrentUser}
            onEducationDelete={onEducationDelete}
            onActionClicked={onActionClicked}
          />
        )}
        {activeTab === 'workexperience' && (
          <ProfileExperience 
            // className={activeTab !== 'workexperience' ? 'hidden' : ''} 
            experiences={profile.experience}
            isCurrentUser={isCurrentUser}
            onExperienceDelete={onExperienceDelete}
            onActionClicked={onActionClicked}
          />
        )}
        {activeTab === 'posts' && (
          <ProfilePosts
            // className={activeTab !== 'posts' ? 'hidden' : ''}
            isCurrentUser={isCurrentUser}
            activeTab={activeTab}
          />
        )}
      </div>
    </div>
  )
}

export default ProfileTabs;
