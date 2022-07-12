import {
  default as NextDocument,
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { Server, Sheet } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "@utils/styletron";

class MyDocument extends NextDocument<{
  stylesheets: Sheet[];
}> {
  static override async getInitialProps(context: DocumentContext) {
    const renderPage = () =>
      context.renderPage({
        // eslint-disable-next-line react/display-name
        enhanceApp: (App) => (props) =>
          (
            <StyletronProvider value={styletron}>
              <App {...props} />
            </StyletronProvider>
          ),
      });

    const initialProps = await NextDocument.getInitialProps({
      ...context,
      renderPage,
    });

    const stylesheets = (styletron as Server).getStylesheets() || [];
    return { ...initialProps, stylesheets };
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs["data-hydrate"]}
              key={i}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
