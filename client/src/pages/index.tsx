import { useSelector } from 'react-redux';
import { NextPageContext } from 'next';
import { AppState } from '../store/reducers';
import PostRegisterForm from '../components/post/PostRegisterForm';
import { postActions } from '../store/actions/posts';
import PostCard from '../components/post/PostCard';

function Home() {
  const { info } = useSelector((state: AppState) => state.user.auth);
  const { data } = useSelector((state: AppState) => state.post.mainPosts);
  return (
    <>
      {info && <PostRegisterForm />}
      {data && data.map((post) => <PostCard key={post.id} post={post} />)}
    </>
  );
}

Home.getInitialProps = async ({ store }: NextPageContext) => {
  console.log('home initial props');
  store.dispatch(postActions.loadMainPosts.request({}));
  return {};
};

export default Home;
