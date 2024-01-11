import { Form, Input, Button, Tabs, App } from "antd";
import {
  UserOutlined,
  LockOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useMemo, useRef, useState, useEffect } from "react";
import { setToken } from "@/utils/auth";
import { useNavigate } from "react-router-dom";
import {LoginApi} from '@/api/login'
import Verify from "@/components/Verify";

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {message} = App.useApp();
  const [formValue, setFormValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState("login");
  const [mobileCodeTimer, setMobileCodeTimer] = useState(null);
  const [visible, setVisible] = useState(false); //用于控制验证码弹窗显示
  const timerRef = useRef(null);

  const onFinish = async (values) => {
    setFormValue(values);
    setVisible(true);
  };

  const LgoinForm = useMemo(() => {
    return (
      <>
        <Form.Item
          name="tenantName"
          rules={[{ required: true, message: "请输入租户" }]}
        >
          <Input
            placeholder="租户"
            prefix={<UsergroupAddOutlined />}
            maxLength={30}
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input
            placeholder="用户名"
            prefix={<UserOutlined />}
            maxLength={30}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password
            autoComplete="new-password"
            placeholder="密码"
            prefix={<LockOutlined />}
            maxLength={30}
          />
        </Form.Item>
      </>
    );
  }, []);

  const sendCode = () => {
    setMobileCodeTimer(3);
  };

  //图形验证码验证成功后
  const handleSuccess = (captchaParams) => {
    console.log(captchaParams, formValue);
    const username = formValue.username.trim();
    const password = formValue.password;
    const captchaVerification = captchaParams.captchaVerification;
    if(loginType === 'login'){
        setLoading(true);
        LoginApi(username,password,captchaVerification).then((res) => {
            console.log(res);
            setToken(res.data);
            message.success("登录成功")
            navigate('/')
        });
    }
  };

  useEffect(() => {
    if (mobileCodeTimer && mobileCodeTimer > 0) {
      timerRef.current = setTimeout(() => {
        setMobileCodeTimer((mobileCodeTimer) => mobileCodeTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [mobileCodeTimer]);

  const CodeLgoinForm = useMemo(() => {
    return (
      <>
        <Form.Item
          name="tenantName"
          rules={[{ required: true, message: "请输入租户" }]}
        >
          <Input
            placeholder="租户"
            prefix={<UsergroupAddOutlined />}
            maxLength={30}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "请输入手机号" }]}
        >
          <Input
            placeholder="手机号"
            prefix={<UserOutlined />}
            maxLength={30}
          />
        </Form.Item>
        <Form.Item
          name="code"
          rules={[{ required: true, message: "请输入验证码" }]}
        >
          <Input
            placeholder="验证码"
            prefix={<LockOutlined />}
            maxLength={30}
            suffix={
              !mobileCodeTimer ? (
                <a key="send" onClick={sendCode}>
                  发送验证码
                </a>
              ) : (
                <a key="sending">{`${mobileCodeTimer}秒后重新发送`}</a>
              )
            }
          />
        </Form.Item>
      </>
    );
  }, [mobileCodeTimer]);

  const items = [
    {
      key: "login",
      label: "密码登录",
      children: LgoinForm,
    },
    {
      key: "codeLogin",
      label: "验证码登录",
      children: CodeLgoinForm,
    },
  ];

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
        autoComplete="off"
      >
        <Tabs
          destroyInactiveTabPane
          defaultActiveKey="login"
          items={items}
          onChange={(key) => {
            setLoginType(key);
          }}
        />
        <Form.Item className="login-btn">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<UserOutlined />}
          >
            { loading ? '登录中...' : '登录'}
          </Button>
        </Form.Item>
      </Form>
      <Verify
        visible={visible}
        setVisible={setVisible}
        handleSuccess={handleSuccess}
      />
    </div>
  );
};
export default LoginForm;
