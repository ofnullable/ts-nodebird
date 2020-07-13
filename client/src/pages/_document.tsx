import Helmet, { HelmetData } from 'react-helmet';
import Document, { Main, NextScript, DocumentContext, Html } from 'next/document';

class AppDocument extends Document<{ helmet: HelmetData }> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      helmet: Helmet.renderStatic(),
    };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();

    return (
      <Html {...htmlAttrs}>
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
          <title>NODEBIRD</title>
          {this.props.styles}
          {Object.values(helmet).map((el) => el.toComponent())}
        </head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
