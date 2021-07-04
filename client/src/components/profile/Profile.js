import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProfileAction } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import ProfileAbout from './ProfileAbout';
import ProfileTop from './ProfileTop';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

export const Profile = ({ match, profile: { loading, profile }, fetchProfileAction }) => {

  useEffect(() => {
    fetchProfileAction(match.params.id)
      .then(() => 'Profile fetched...');
  }, [fetchProfileAction, match.params.id]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <Link to="/profiles" className="btn btn-light">
              Back to Profiles
            </Link>
          </div>
          {profile !== null && (
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (
                  <>
                    {profile.experience.map((exp) => (
                      <ProfileExperience key={exp._id} experience={exp} />
                    ))}
                  </>
                ) : (
                  <h4>No Experience Found</h4>
                )}
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 ? (
                  <>
                    {profile.education.map((exp) => (
                      <ProfileEducation key={exp._id} education={exp} />
                    ))}
                  </>
                ) : (
                  <h4>No Education Found</h4>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function mapStateToProps(store) {
  return {
    profile: store.profile,
  };
}

export default connect(mapStateToProps, { fetchProfileAction })(Profile);
