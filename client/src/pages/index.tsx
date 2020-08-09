import { useDispatch, useSelector } from 'react-redux';
import { NextPageContext } from 'next';
import { useCallback, useEffect, useRef } from 'react';
import { AppState } from '../store/reducers';
import PostRegisterForm from '../components/post/PostRegisterForm';
import { postActions } from '../store/actions/posts';
import PostCard from '../components/post/PostCard';

function HomePage() {
  const { info } = useSelector((state: AppState) => state.user.auth);
  const { data, hasMorePosts, loading } = useSelector((state: AppState) => state.post.mainPosts);
  const count = useRef<Number[]>([]);
  const dispatch = useDispatch();

  const handleScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePosts) {
        const lastId = data?.[data?.length].id;
        if (lastId && !count.current.includes(lastId)) {
          dispatch(postActions.loadMainPosts.request({ lastId }));
        }
      }
    }
  }, [hasMorePosts, data?.length, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      count.current = [];
    };
  }, [hasMorePosts, data?.length]);

  return (
    <>
      {info && <PostRegisterForm />}
      {data && data.map((post) => <PostCard key={post.id} post={post} />)}
    </>
  );
}

HomePage.getInitialProps = async ({ store }: NextPageContext) => {
  store.dispatch(postActions.loadMainPosts.request({}));
  return {};
};

export default HomePage;
