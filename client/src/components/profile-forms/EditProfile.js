import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import { createProfileAction } from '../../actions/profile';
import { setAlert } from '../../actions/alert';

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

function EditProfile({ profile: { me }, history, createProfileAction, setAlert }) {
  const [showSocialMediaLinks, toggleSocialMediaLinks] = useState(false);
  const [loading, setLoading] = useState(false);

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
      company: !me.company ? '' : me.company,
      location: !me.location ? '' : me.location,
      status: !me.status ? '' : me.status,
      githubusername: !me.githubusername ? '' : me.githubusername,
      bio: !me.bio ? '' : me.bio,
      website: !me.website ? '' : me.website,
      skills: !me.skills ? '' : me.skills.join(','),
      youtube: !me.social.youtube ? '' : me.social.youtube,
      facebook: !me.social.facebook ? '' : me.social.facebook,
      twitter: !me.social.twitter ? '' : me.social.twitter,
      instagram: !me.social.instagram ? '' : me.social.instagram,
      linkedin: !me.social.linkedin ? '' : me.social.linkedin,
    });
  }, [])

  function handleOnChange(e) {
    setProfileForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await createProfileAction(profileForm);

      setLoading(false);
      setAlert('Profile updated successfully', 'success');

      setProfileForm(initialState);

      history.push('/dashboard');
    } catch(error) {
      setLoading(false);
      error.response.data.errors.forEach((err) => {
        setAlert(err.msg, 'danger');
      });
    }
  }

  return (
    <div>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUser} />{' '} Let's get some information to make your
        profile stand out
      </p>
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
            value={company}
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
          {loading ? 'Please Wait...' : 'Submit'}
        </button>
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
}

function mapStateToProps(store) {
  return {
    profile: store.profile,
  };
}

export default connect(mapStateToProps, { createProfileAction, setAlert })(withRouter(EditProfile));
