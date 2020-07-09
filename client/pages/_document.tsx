import Helmet, { HelmetData } from 'react-helmet';
import Document, { Main, NextScript, DocumentContext } from 'next/document';

class AppDocument extends Document<{ helmet: HelmetData }> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage();
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
      <html {...htmlAttrs} lang="ko">
        <head>
          {this.props.styles}
          {Object.values(helmet).map((el) => el.toComponent())}
        </head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default AppDocument;
