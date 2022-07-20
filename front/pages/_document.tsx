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
          {/* pwa 설정 */}
          <meta name="application-name" content="알약 프로젝트" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="알약 프로젝트" />
          <meta name="description" content="Best PWA App in the world" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/imags/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          {/* iphone */}
          <link rel="apple-touch-icon" href="/imags/icons/icon-48x48.png" />
          {/* ipad */}
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/imags/icons/icon-152x152.png"
          />
          {/* <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/imags/icons/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/imags/icons/touch-icon-ipad-retina.png"
          /> */}

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/imags/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/imags/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          {/* <link
            rel="mask-icon"
            href="/imags/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          /> */}
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="http://localhost:3000/" />
          <meta name="twitter:title" content="PWA App" />
          <meta
            name="twitter:description"
            content="Best PWA App in the world"
          />
          <meta
            name="twitter:image"
            content="http://localhost:3000/icons/icon-192x192.png"
          />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="PWA App" />
          <meta property="og:description" content="Best PWA App in the world" />
          <meta property="og:site_name" content="PWA App" />
          <meta property="og:url" content="http://localhost:3000/" />
          <meta
            property="og:image"
            content="http://localhost:3000/icons/icon-48x48.png"
          />

          {/* font */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
            rel="stylesheet"
          />
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
