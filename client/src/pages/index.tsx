import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';
import PostRegisterForm from '../components/post/PostRegisterForm';

function Home() {
  const { info } = useSelector((state: AppState) => state.user.auth);
  return (
    <>
      {info && <PostRegisterForm />}
      <p>main page</p>
    </>
  );
}

export default Home;
