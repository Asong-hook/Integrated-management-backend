import { Button } from "antd"

import { connect } from 'react-redux';
import { setToken, a } from "@/redux/modules/global/action";
function App(props) {
  // eslint-disable-next-line react/prop-types
  const {token, a, setToken} = props;
  return (
    <>
    <h1>{token}</h1>
      <Button type="primary" onClick={()=>{a(1)}}>按钮</Button>
      <Button type="primary" onClick={()=>{setToken(1)}}>按钮</Button>
    </>
  )
}


const mapStateToProps = (state) =>state.global

const mapDispatchToProps = {setToken,a}


export default connect(mapStateToProps, mapDispatchToProps)(App)
