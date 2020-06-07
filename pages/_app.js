import Layout from '../components/_app/Layout';
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/redirectUser"
import axiosapi from "../utils/axiosApi"

function MyApp({ Component, pageProps }) {
   return (
      <>
         <Layout {...pageProps}>
            <Component {...pageProps} />
         </Layout>
      </>
   );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
   const { token } = parseCookies(ctx);
   let pageProps = {};

   if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
   }
   if (!token) {
      if (ctx.pathname !== "/login" && ctx.pathname !== "/signup") {
         redirectUser(ctx, "/login")
      }
   } else {
      try {
         const payload = { headers: { Authorization: token } };
         const response = await axiosapi.get("api/account", payload);
         const user = response.data;
         pageProps.user = user;
      } catch (error) {
         console.error("Error getting current user", error);
         destroyCookie(ctx, "token");
         redirectUser(ctx, "/login");
      }
   }

   return { pageProps }
}

export default MyApp;