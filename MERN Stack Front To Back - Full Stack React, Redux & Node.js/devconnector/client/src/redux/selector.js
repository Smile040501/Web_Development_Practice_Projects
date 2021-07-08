export const selectAuthUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthErrorMsg = (state) => state.auth.errorMsg;
export const selectAuthErrors = (state) => state.auth.errors;

export const selectPosts = (state) => state.posts.posts;
export const selectPost = (state) => state.posts.post;
export const selectPostsLoading = (state) => state.posts.loading;
export const selectPostsErrorMsg = (state) => state.posts.errorMsg;
export const selectPostsErrors = (state) => state.posts.errors;

export const selectProfiles = (state) => state.profiles.profiles;
export const selectProfile = (state) => state.profiles.profile;
export const selectProfileRepos = (state) => state.profiles.repos;
export const selectProfilesLoading = (state) => state.profiles.loading;
export const selectProfilesErrorMsg = (state) => state.profiles.errorMsg;
export const selectProfilesErrors = (state) => state.profiles.errors;
