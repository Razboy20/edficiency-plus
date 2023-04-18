// @refresh reload
import "~/assets/css/global.scss";

import { createSignal, Suspense } from "solid-js";
import { Body, ErrorBoundary, FileRoutes, Head, Html, Link, Meta, Routes, Scripts, Title } from "solid-start";

import { FastSpinner } from "./components/Spinner";

export default function Root() {
  // const styles: StyleData[] = [];
  const [darkMode, _setDarkMode] = createSignal(false);

  return (
    <Html lang="en" classList={{ dark: darkMode() }}>
      <Head>
        <Title>Flex Manager</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Body>
        <ErrorBoundary>
          {/* Wait for https://github.com/lxsmnsyc/solid-styled/pull/11 to be published */}
          {/* <StyleRegistry styles={styles}>
                <Style>{renderSheets(styles)}</Style> */}
          <Suspense
            fallback={
              <div>
                <FastSpinner class="fixed right-4 top-4 h-6 w-6 stroke-2 text-blue-500" show />
              </div>
            }
          >
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
          {/* </StyleRegistry> */}
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
