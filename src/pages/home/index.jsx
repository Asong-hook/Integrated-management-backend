import { App, Button } from "antd"

const Home = () => {

    const {message} = App.useApp();
    return <div><Button onClick={()=>{
        message.success("??")
    }}>1</Button></div>
}

export default Home