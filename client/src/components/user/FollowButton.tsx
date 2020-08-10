import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { Post } from '../../store/interfaces';
import { AppState } from '../../store/reducers';

interface FollowButtonProps {
  post: Post;
  handleFollow: (id: number) => () => void;
  handleUnFollow: (id: number) => () => void;
}

function FollowButton({ post, handleFollow, handleUnFollow }: FollowButtonProps) {
  const { info } = useSelector((state: AppState) => state.user.auth);

  if (post.user.id === info?.id) {
    return null;
  }

  const isFollowed = info?.followings?.find((user) => user.id === post.user.id);
  return isFollowed ? (
    <Button onClick={handleUnFollow(post.user.id)}>Unfollow</Button>
  ) : (
    <Button onClick={handleFollow(post.user.id)}>Follow</Button>
  );
}

export default memo(FollowButton);
