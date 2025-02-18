import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import Head from "next/head";
import Script from "next/script";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Header from "./header.js";
import Footer from "./footer.js";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/red-hat-display/500.css";
import "@fontsource/poppins/400.css";

const theme = extendTheme({
  fonts: {
    //heading: '\'Space Grotesk\', sans-serif',
    heading: "'Poppins', sans-serif",
    body: "'Red Hat Display', sans-serif",
  },
  colors: {
    rpblue: "#123456",
    rpmblue: "#5689DB",
    rpgrey: "#52565A",
    poolblue: "#29B2D4",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 100,
      },
    },
  },
});

const title = "TensorPool — Execute ML jobs on the cloud with natural language";
const description = "Save ML developer time and money with TensorPool";
const ogImage = "https://tensorpool.dev/images/preview.jpeg";

const Layout = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Head>
      {/* Primary Meta Tags */}
      <title>
        TensorPool — the easiest way to execute ML jobs on the cloud
      </title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/images/preview.jpeg" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tensorpool.dev/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://ridepoolapp.com/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Google Analytics Adsense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3060901036251860"
        crossorigin="anonymous"
      />
    </Head>

    {/* <Header /> */}

    <Box py={[2, 5]} bg="black" color="white">
      {children}
    </Box>

    {/* <Footer /> */}
  </ChakraProvider>
);

export default Layout;
