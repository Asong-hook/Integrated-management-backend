import { connect } from 'react-redux';
import { setToken, a } from "@/redux/modules/global/action";
import Router from "@/routers/index";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./routers/util/authRouter";
function App() {
  // eslint-disable-next-line react/prop-types
  // const { token, a, setToken } = props;
  return (
    <>
      <BrowserRouter>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </BrowserRouter>
    </>
  )
}
const mapStateToProps = (state) => state.global
const mapDispatchToProps = { setToken, a }
export default connect(mapStateToProps, mapDispatchToProps)(App)
