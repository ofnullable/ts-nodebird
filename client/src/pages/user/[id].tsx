import { NextPageContext } from 'next';
import { css } from '@emotion/core';
import { useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { userActions } from '../../store/actions/users';
import { postActions } from '../../store/actions/posts';
import { AppState } from '../../store/reducers';
import PostCard from '../../components/post/PostCard';

const userInfoStyle = css`
  margin-bottom: 1rem;
`;

function UserPage() {
  const { mainPosts } = useSelector((state: AppState) => state.post);
  const { userInfo } = useSelector((state: AppState) => state.user);

  return (
    <div>
      {userInfo.data ? (
        <Card
          css={[userInfoStyle]}
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.data.posts?.length}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.data.followings?.length}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.data.followers?.length}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{userInfo.data.nickname[0]}</Avatar>} title={userInfo.data.nickname} />
        </Card>
      ) : null}
      {mainPosts.data?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

UserPage.getInitialProps = async ({ query, store }: NextPageContext) => {
  const userId = Number(query.id);

  store.dispatch(userActions.loadUserInfo.request(userId));
  store.dispatch(postActions.loadUserPosts.request({ userId }));

  return { userId };
};

export default UserPage;
