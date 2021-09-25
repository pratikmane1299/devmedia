import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

// import { createProfileAction } from '../../actions/profile';
// import { setAlert  }from '../../actions/alert';

import Modal from '../ui/Modal';

const initialState = {
  company: '',
  location: '',
  status: '',
  githubusername: '',
  bio: '',
  website: '',
  skills: '',
  youtube: '',
  facebook: '',
  twitter: '',
  instagram: '',
  linkedin: '',
}

export const EditProfileModal = ({ isOpen, profile, onRequestClose }) => {
  const [showSocialMediaLinks, toggleSocialMediaLinks] = useState(false);
  const [loading] = useState(false);

  const [profileForm, setProfileForm] = useState(initialState);

  const {
    company,
    location,
    status,
    githubusername,
    bio,
    website,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = profileForm;

  useEffect(() => {
    setProfileForm({
      company: !profile.company ? "" : profile.company,
      location: !profile.location ? "" : profile.location,
      status: !profile.status ? "" : profile.status,
      githubusername: !profile.githubusername ? "" : profile.githubusername,
      bio: !profile.bio ? "" : profile.bio,
      website: !profile.website ? "" : profile.website,
      skills: !profile.skills ? "" : profile.skills.join(","),
      youtube: !profile.social?.youtube ? "" : profile.social.youtube,
      facebook: !profile.social?.facebook ? "" : profile.social.facebook,
      twitter: !profile.social?.twitter ? "" : profile.social.twitter,
      instagram: !profile.social?.instagram ? "" : profile.social.instagram,
      linkedin: !profile.social?.linkedin ? "" : profile.social.linkedin,
    });
  }, [
    profile?.bio,
    profile?.company,
    profile?.githubusername,
    profile?.location,
    profile?.skills,
    profile.social?.facebook,
    profile.social?.instagram,
    profile.social?.linkedin,
    profile.social?.twitter,
    profile.social?.youtube,
    profile?.status,
    profile?.website,
  ]);

  function handleOnChange(e) {
    setProfileForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1 className="large text-primary">Edit Your Profile</h1>
      {/* <p className="lead">
        <FontAwesomeIcon icon={faUser} /> Let's get some information to make
        your profile stand out
      </p> */}
      <small>* = required field</small>
      <form className="form" onSubmit={handleOnSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={handleOnChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company || ''}
            onChange={handleOnChange}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={handleOnChange}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={handleOnChange}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={handleOnChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={handleOnChange}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={handleOnChange}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialMediaLinks(!showSocialMediaLinks)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {showSocialMediaLinks && (
          <>
            <div className="form-group social-input">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={handleOnChange}
              />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={handleOnChange}
              />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={handleOnChange}
              />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={handleOnChange}
              />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={handleOnChange}
              />
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary my-1">
          {loading ? "Please Wait..." : "Submit"}
        </button>
      </form>
    </Modal>
    // <div />
  );
};

export default EditProfileModal;

// function mapStateToProps(store) {
//   return { profile: store.profile.profile };
// }

// export default connect(mapStateToProps, {
//   setAlert,
//   createProfileAction,
// })(EditProfileModal);
