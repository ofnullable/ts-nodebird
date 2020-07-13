import App, { AppContext, AppProps } from 'next/app';
import { END } from 'redux-saga';
import api from '../api/config';
import wrapper, { ReduxStore } from '../store';
import AppLayout from '../components/AppLayout';
import { userActions } from '../store/actions/users';

const NodeBird = ({ Component, pageProps }: AppProps) => {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
};

NodeBird.getInitialProps = async (context: AppContext) => {
  console.log('app get initial props');
  const { ctx } = context;
  const state = ctx.store.getState();
  const cookie = ctx.req ? ctx.req.headers.cookie : '';

  api.defaults.headers.Cookie = '';
  if (ctx.req && cookie) {
    api.defaults.headers.Cookie = cookie;
  }

  if (!state.user.auth.info) {
    ctx.store.dispatch(userActions.loadUser.request(undefined));
  }

  const appProps = await App.getInitialProps(context);

  if (ctx.req) {
    ctx.store.dispatch(END);
    await (ctx.store as ReduxStore).run.toPromise();
  }
  return { ...appProps };
};

export default wrapper.withRedux(NodeBird);
