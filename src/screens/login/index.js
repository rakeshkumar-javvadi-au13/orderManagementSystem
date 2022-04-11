import { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.css';

const Login = () => {
  const [isRemember, setIsRemember] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage?.username && localStorage?.password) {
      const rememberLoginData = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
      };
      setIsRemember(rememberLoginData);
    }
  }, []);

  const loginAPI = (details) => {
    if (details?.name === 'rakesh' && details?.password === 'goodwork') {
      const data = {
        username: details?.name,
        token: 'iLikeThisTask',
        statusCode: 200,
        message: 'ok',
      };
      return data;
    }
  };
  const onFinish = (values) => {
    console.log('Success:', values);

    let data = {
      name: values.username,
      password: values.password,
    };
    try {
      const loginResponse = loginAPI(data);
      console.log('loginResponse1', loginResponse);
      if (loginResponse?.statusCode === 200) {
        console.log('loginResponse2', loginResponse);
        localStorage.setItem('token', loginResponse?.token);
        if (values?.remember) {
          localStorage.setItem('rememberme', values.remember);
          localStorage.setItem('username', values.username);
          localStorage.setItem('password', values.password);
        }
        navigate('/orderPage');
      } else {
        message.error('User Not Found', 1);
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  return (
    <div align='center' className='card'>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        fields={
          isRemember
            ? [
                {
                  name: ['username'],
                  value: isRemember?.username,
                },
                {
                  name: ['password'],
                  value: isRemember?.password,
                },
              ]
            : null
        }
      >
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
