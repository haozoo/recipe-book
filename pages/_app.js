import { UserAuthContextProvider } from "../context/UserAuthContext";
import "../styles/globals.css";

export default function RecipeApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <UserAuthContextProvider>
      {getLayout(<Component {...pageProps} />)}
    </UserAuthContextProvider>
  );
}
