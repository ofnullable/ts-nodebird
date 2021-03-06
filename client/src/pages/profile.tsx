import Router from 'next/router';
import { NextPageContext } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { Typography } from 'antd';
import { userActions } from '../store/actions/users';
import { postActions } from '../store/actions/posts';
import { AppState } from '../store/reducers';
import NicknameEditForm from '../components/user/NicknameEditForm';
import PostCard from '../components/post/PostCard';
import FollowList from '../components/user/FollowList';

function ProfilePage() {
  const { auth, followers, followings } = useSelector((state: AppState) => state.user);
  const { mainPosts } = useSelector((state: AppState) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.info) Router.push('/');
  }, [auth.info]);

  const handleUnfollow = useCallback(
    (userId: number) => () => {
      dispatch(userActions.unfollow.request(userId));
    },
    []
  );

  const handleRemoveFollower = useCallback(
    (userId: number) => () => {
      dispatch(userActions.removeFollower.request(userId));
    },
    []
  );

  const loadMoreFollowings = useCallback(() => {
    dispatch(userActions.loadFollowings.request({ offset: followings.data?.length }));
  }, [followings.data?.length]);

  const loadMoreFollowers = useCallback(() => {
    dispatch(userActions.loadFollowers.request({ offset: followers.data?.length }));
  }, [followers.data?.length]);

  if (!auth.info) {
    return null;
  }
  return (
    <>
      <NicknameEditForm />
      <div>
        <Typography.Title level={2}>Following</Typography.Title>
        {followings.data?.length ? (
          <FollowList
            header="Followings"
            hasMore={followings.hasMoreFollowings}
            handleLoadMore={loadMoreFollowings}
            data={followings.data}
            handleStopFollow={handleUnfollow}
          />
        ) : (
          <p>You haven&apos;t followed anyone yet!</p>
        )}
      </div>
      <div>
        <Typography.Title level={2}>Follower</Typography.Title>
        {followers.data?.length ? (
          <FollowList
            header="Followers"
            hasMore={followers.hasMoreFollowers}
            handleLoadMore={loadMoreFollowers}
            data={followers.data}
            handleStopFollow={handleRemoveFollower}
          />
        ) : (
          <p>No one&apos;s following you yet!</p>
        )}
      </div>
      <div>
        <Typography.Title level={2}>My twit</Typography.Title>
        {mainPosts.data?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

ProfilePage.getInitialProps = async ({ store }: NextPageContext) => {
  const { user } = store.getState();

  store.dispatch(userActions.loadFollowers.request({ userId: user.auth?.id }));
  store.dispatch(userActions.loadFollowings.request({ userId: user.auth?.id }));
  store.dispatch(postActions.loadUserPosts.request({ userId: user.auth?.id }));

  return {};
};

export default ProfilePage;
