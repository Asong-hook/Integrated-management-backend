import { Outlet } from "react-router-dom";
import SvgIcon from "../components/svgIcon";
import { Layout } from "antd";
import NavHead from './components/navHead'
import LayoutMenu from './components/layoutMenu'
import { useState } from 'react'
import './index.less'

const { Sider, Content } = Layout;
const LayoutIndex = () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className="page_container">
            <NavHead />
            <Layout style={{ height: 'calc(100% - 50px)' }}>
                <Sider trigger={null} collapsed={collapsed} width={220} theme="dark">
                    <LayoutMenu collapsed={collapsed} setCollapsed={setCollapsed}></LayoutMenu>
                </Sider>
                <Layout>
                    <Content>
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}
export default LayoutIndex;