import { useState } from 'react';
import { css } from '@emotion/core';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import { Post } from '../../store/interfaces';
import { AppState } from '../../store/reducers';
import PostCardContent from './PostCardContent';

const cardWrapperStyle = css`
  margin-bottom: 20px;
`;

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const [openCommentForm, setOpenCommentForm] = useState(false);
  const id = useSelector((state: AppState) => state.user.auth.info?.id);
  const dispatch = useDispatch();

  const liked = id && post.likers?.find((liker) => liker.id === id);

  return (
    <div css={[cardWrapperStyle]}>
      <Card>
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
              description={<PostCardContent content={post.retweet.content} />} // a tag x -> Link
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
              description={<PostCardContent content={post.content} />} // a tag x -> Link
            />
          </>
        )}
      </Card>
    </div>
  );
}

export default PostCard;
