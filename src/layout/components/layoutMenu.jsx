import { Menu } from 'antd'
import { StepForwardOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import '../index.less'
const LayoutMenu = (props) => {
    // eslint-disable-next-line react/prop-types
    const { setCollapsed, collapsed } = props;
    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem('Navigation One', 'sub1', null, [
            getItem('Option 1', '1'),
            getItem('Option 2', '2'),
            getItem('Option 3', '3'),
            getItem('Option 4', '4'),
        ]),
        getItem('Navigation Two', 'sub2', null, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'sub3', null, [getItem('Option 7', '7', <StepForwardOutlined />), getItem('Option 8', '8')]),
        ]),
        getItem('Navigation Three', 'sub4', null, [
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
            getItem('Option 11', '11'),
            getItem('Option 12', '12'),
        ]),
    ];
    return (
        <div className='menu'>
            <Menu
                theme="dark"
                mode="inline"
                triggerSubMenuAction="click"
                items={items}
            ></Menu>
            <div className='menu_toggle' onClick={() => { setCollapsed(!collapsed) }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
        </div>
    )
}
export default LayoutMenu