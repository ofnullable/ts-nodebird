import { AppContext, AppProps } from 'next/app';
import { END } from 'redux-saga';
import { ReduxStore, wrapper } from '../store';
import AppLayout from '../components/AppLayout';

const NodeBird = ({ Component, pageProps }: AppProps) => {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
};

NodeBird.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };

  if (ctx.req) {
    ctx.store.dispatch(END);
    await (ctx.store as ReduxStore).sagaTask.toPromise();
  }

  return { pageProps };
};

export default wrapper.withRedux(NodeBird);
