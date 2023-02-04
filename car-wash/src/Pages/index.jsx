import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "../Contexts/AuthContextProvider";
import RoutesMain from "../Routes";

function Pages() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <RoutesMain />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Pages;
