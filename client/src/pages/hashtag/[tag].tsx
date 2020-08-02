import { useCallback, useEffect } from 'react';
import { NextPageContext } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { postActions } from '../../store/actions/posts';
import PostCard from '../../components/post/PostCard';

interface HashtagProps {
  tag: string;
}
const Hashtag = ({ tag }: HashtagProps) => {
  const dispatch = useDispatch();

  const { data, hasMorePosts } = useSelector((state: AppState) => state.post.mainPosts);

  const onScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePosts) {
        const lastId = data?.[data?.length - 1]?.id;
        dispatch(postActions.loadHashtagPosts.request({ lastId, tag }));
      }
    }
  }, [hasMorePosts, data?.length, tag]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [data?.length, hasMorePosts, tag]);

  return (
    <>
      {data?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

interface HashtagPageContext extends NextPageContext {
  query: {
    tag: string;
  };
}

Hashtag.getInitialProps = async ({ store, query }: HashtagPageContext) => {
  const { tag } = query;

  store.dispatch(postActions.loadHashtagPosts.request({ tag }));
  return { tag };
};

export default Hashtag;
