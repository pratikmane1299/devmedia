import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { deleteEducationAction, deleteExperienceAction, followUserInProfileAction } from '../../actions/profile';
import { setAlert } from '../../actions/alert';

import { fetchProfileAction } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import MainLayout from '../Layout/MainLayout';
import { MiddlePanel } from '../Layout/GridPanels';
import UserProfileSummary from '../ui/UserProfileSummary';
import SuggestedUsers from '../suggested-users/SuggestedUsers';
import MyFollowing from '../Layout/MyFollowing';
import AddEducationModal from './AddEducationModal';
import AddExperienceModal from './AddExperienceModal';
import { EditProfileModal } from './EditProfileModal';

export const Profile = ({
  match,
  profile: { loading, profile },
  auth,
  fetchProfileAction,
  deleteEducationAction,
  deleteExperienceAction,
  followUserInProfileAction,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState("");

  useEffect(() => {
    fetchProfileAction(match.params.id).then(() => "Profile fetched...");
  }, [fetchProfileAction, match.params.id]);

  async function handleEducationDelete(educationId) {
    try {
      await deleteEducationAction(educationId);
      setAlert("Education deleted", "success");
    } catch (error) {
      switch (error.response.status) {
        case 500:
        default:
          setAlert(error.response.statusText, "danger");
          break;
      }
    }
  }

  async function handleExperienceDelete(expId) {
    console.log(expId);
    try {
      await deleteExperienceAction(expId);
      setAlert("Education deleted", "success");
    } catch (error) {
      switch (error.response.status) {
        case 500:
        default:
          setAlert(error.response.statusText, "danger");
          break;
      }
    }
  }

  function handleOnFollowUnFollow() {
    followUserInProfileAction(profile.user._id);
    // console.log(profile.user._id);
  }

  console.log(auth.user);

  return (
    // <div>
    //   {loading ? (
    //     <Spinner />
    //   ) : (
    //     <>
    //       {profile !== null && (
    //         <>
    //           <ProfileHeader
    //             displayName={profile.user.name}
    //             username={profile.user.username}
    //             avatarUrl={profile.user.avatar}
    //             isCurrentUser={currentUser.user._id === profile.user._id}
    //             isFollowedByViewer={profile.isFollowedByViewer}
    //           />
    //           <ProfileTabs
    //             profile={profile}
    //             isCurrentUser={currentUser.user._id === profile.user._id}
    //             onEducationDelete={handleEducationDelete}
    //             onExperienceDelete={handleExperienceDelete}
    //           />
    //         </>
    //       )}
    //     </>
    //     // <>
    //     //   <div>
    //     //     <Link to="/profiles" className="btn btn-light">
    //     //       Back to Profiles
    //     //     </Link>
    //     //   </div>
    //     //   {profile !== null && (
    //     //     <div className="profile-grid my-1">
    //     //       <ProfileTop profile={profile} />
    //     //       <ProfileAbout profile={profile} />
    //     //       <div className="profile-exp bg-white p-2">
    //     //         <h2 className="text-primary">Experience</h2>
    //     //         {profile.experience.length > 0 ? (
    //     //           <>
    //     //             {profile.experience.map((exp) => (
    //     //               <ProfileExperience key={exp._id} experience={exp} />
    //     //             ))}
    //     //           </>
    //     //         ) : (
    //     //           <h4>No Experience Found</h4>
    //     //         )}
    //     //       </div>
    //     //       <div className="profile-edu bg-white p-2">
    //     //         <h2 className="text-primary">Education</h2>
    //     //         {profile.education.length > 0 ? (
    //     //           <>
    //     //             {profile.education.map((exp) => (
    //     //               <ProfileEducation key={exp._id} education={exp} />
    //     //             ))}
    //     //           </>
    //     //         ) : (
    //     //           <h4>No Education Found</h4>
    //     //         )}
    //     //       </div>
    //     //     </div>
    //     //   )}
    //     // </>
    //   )}
    // </div>
    <MainLayout
      leftPanel={<MyFollowing />}
      rightPanel={
        <div>
          <UserProfileSummary currentUser={auth.user} />
          <SuggestedUsers />
        </div>
      }
    >
      <MiddlePanel auth={auth}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {profile !== null && (
              <>
                <ProfileHeader
                  displayName={profile.user.name}
                  username={profile.user.username}
                  avatarUrl={profile.user.avatar}
                  isCurrentUser={auth.user.user._id === profile.user._id}
                  isFollowedByViewer={profile.isFollowedByViewer}
                  onEditProfileClicked={() => {
                    setShowModal(true);
                    setActiveModal("edit-profile");
                  }}
                  onFollowClicked={handleOnFollowUnFollow}
                />
                <ProfileTabs
                  profile={profile}
                  isCurrentUser={auth.user.user._id === profile.user._id}
                  onEducationDelete={handleEducationDelete}
                  onExperienceDelete={handleExperienceDelete}
                  onActionClicked={(activeModal) => {
                    setShowModal(true);
                    setActiveModal(activeModal);
                  }}
                />
                {showModal ? (
                  activeModal === "add-education" ? (
                    <AddEducationModal
                      isOpen={showModal}
                      onRequestClose={() => {
                        setShowModal(false);
                        setActiveModal("");
                      }}
                    />
                  ) : activeModal === "add-experience" ? (
                    <AddExperienceModal
                      isOpen={showModal}
                      onRequestClose={() => {
                        setShowModal(false);
                        setActiveModal("");
                      }}
                    />
                  ) : activeModal === "edit-profile" ? (
                    <EditProfileModal
                      isOpen={showModal}
                      profile={profile}
                      onRequestClose={() => {
                        setShowModal(false);
                        setActiveModal("");
                      }}
                    />
                  ) : null
                ) : null}
              </>
            )}
          </>
        )}
      </MiddlePanel>
    </MainLayout>
  );
};

function mapStateToProps(store) {
  return {
    profile: store.profile,
    auth: store.auth,
  };
}

export default connect(
  mapStateToProps, { 
    fetchProfileAction,
    deleteEducationAction,
    deleteExperienceAction,
    followUserInProfileAction,
  }
)(Profile);
