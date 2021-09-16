function isFollowedByViewer(followersList, userId) {
  return !!followersList.find((id) => id.toString() === userId.toString());
}

function serializeProfile(profile, viewer, includeStats = false) {
  profile.isFollowedByViewer = isFollowedByViewer(profile.followers, viewer._id);
  profile.user = {
    ...profile.user,
    username: profile.user.name.toLowerCase().split(' ')[0],
  }

  if (includeStats) {
    profile.meta = {
      followers: profile.followers.length,
      following: profile.following.length,
    }
  }

  profile.followers = undefined;
  profile.following = undefined;

  return profile;
}

function serializeUser(userDetails) {

  userDetails.meta  = {
    followers: userDetails.followers.length,
    following: userDetails.following.length,
  };

  userDetails.user = {
    ...userDetails.user,
    username: userDetails.user.name.toLowerCase().split(' ')[0],
  }

  userDetails.followers = undefined;
  userDetails.following = undefined;

  return userDetails;
}

module.exports = { serializeProfile, serializeUser };
