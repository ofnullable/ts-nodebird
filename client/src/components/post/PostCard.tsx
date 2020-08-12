import { useCallback, useState } from 'react';
import { css } from '@emotion/core';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, Popover, Button } from 'antd';
import { HeartTwoTone, MessageOutlined, RetweetOutlined, HeartOutlined, EllipsisOutlined } from '@ant-design/icons';
import Link from 'next/link';
import moment from 'moment';
import { Post } from '../../store/interfaces';
import { AppState } from '../../store/reducers';
import { userActions } from '../../store/actions/users';
import FollowButton from '../user/FollowButton';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import { postActions } from '../../store/actions/posts';

const cardWrapperStyle = css`
  margin-bottom: 1rem;
  & > div > div:first-of-type {
    margin-bottom: 0;
  }
`;

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state: AppState) => state.user.auth.info?.id);
  const dispatch = useDispatch();

  const liked = post.likers?.find((liker) => liker.id === id);

  const handleRetweet = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다');
      return;
    }

    dispatch(postActions.retweet.request(post.id));
  }, [id, post?.id]);

  const toggleLike = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다');
      return;
    }

    if (liked) {
      dispatch(postActions.unlikePost.request(post.id));
    } else {
      dispatch(postActions.likePost.request(post.id));
    }
  }, [id, post?.id, liked]);

  const toggleCommentForm = useCallback(() => {
    setCommentFormOpened((prev) => !prev);

    if (!commentFormOpened) {
      dispatch(postActions.loadComment.request(post.id));
    }
  }, []);

  const handleFollow = useCallback(
    (userId: number) => () => {
      dispatch(userActions.follow.request(userId));
    },
    []
  );

  const handleUnFollow = useCallback(
    (userId: number) => () => {
      dispatch(userActions.unfollow.request(userId));
    },
    []
  );

  const handleRemovePost = useCallback(() => {
    dispatch(postActions.removePost.request(post.id));
  }, []);

  return (
    <div css={[cardWrapperStyle]}>
      <Card
        cover={<PostImages images={post.images || []} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={handleRetweet} />,
          liked ? (
            <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={toggleLike} />
          ) : (
            <HeartOutlined key="heart" onClick={toggleLike} />
          ),
          <MessageOutlined key="message" onClick={toggleCommentForm} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {id && post.user.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button danger onClick={handleRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.retweetId ? `${post.user.nickname}님이 리트윗하셨습니다.` : null}
        extra={<FollowButton post={post} handleFollow={handleFollow} handleUnFollow={handleUnFollow} />}
      >
        {post.retweetId && post.retweet ? (
          <Card>
            <span style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD.')}</span>
            <Card.Meta
              avatar={
                <Link
                  href={{ pathname: '/user', query: { id: post.retweet.user.id } }}
                  as={`/user/${post.retweet.user.id}`}
                >
                  <a>
                    <Avatar>{post.retweet.user.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.retweet.user.nickname}
              description={<PostCardContent content={post.retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <span style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD.')}</span>
            <Card.Meta
              avatar={
                <Link href={{ pathname: '/user', query: { id: post.user.id } }} as={`/user/${post.user.id}`}>
                  <a>
                    <Avatar>{post.user.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.user.nickname}
              description={<PostCardContent content={post.content} />}
            />
          </>
        )}
      </Card>
    </div>
  );
}

export default PostCard;
