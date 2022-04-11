import {
  Card,
  Button,
  PageHeader,
  Form,
  Input,
  Row,
  Col,
  Typography,
  Modal,
  DatePicker,
} from 'antd';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import moment from 'moment';

const { Title } = Typography;

function AddOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderSelected, setOrderSelected] = useState(null);
  const [existingOrders, setExistingOrders] = useState('');

  const [orderAddedModal, setOrderAddedModal] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (location?.state?.order?.order) {
      setOrderSelected(location?.state?.order?.order);
    }

    setExistingOrders(location?.state?.ordersData);

    // eslint-disable-next-line
  }, []);

  const onFinish = async (valuesData) => {
    const values = {
      customer_address: valuesData?.customer_address,
      customer_name: valuesData?.customer_name,
      customer_phone: valuesData?.customer_phone,
      order_id: valuesData?.order_id,
      order_total: valuesData?.order_total,
      due_date:
        valuesData?.due_date !== undefined
          ? moment(valuesData?.due_date?._d).format('DD/MM/YYYY')
          : orderSelected?.due_date,
    };

    let removeEditOrder;
    if (orderSelected) {
      removeEditOrder = existingOrders.filter(
        (item) => item.order_id != values?.order_id
      );
      setExistingOrders([...removeEditOrder, values]);
    } else {
      setExistingOrders((prevState) => [...prevState, values]);
    }

    setOrderAddedModal(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const goBackToOrderPage = () => {
    navigate('/orderPage', {
      state: {
        newOrder: existingOrders,
      },
    });
  };

  const dateFormat = 'DD/MM/YYYY';

  return (
    <>
      <PageHeader
        className='site-page-header'
        title='Category'
        onBack={() => navigate(-1)}
      />

      <Card>
        <Title level={3}>
          {orderSelected
            ? 'Edit Order Details'
            : 'Add Details to Add new Order'}
        </Title>
        <Form
          name='basic'
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 19,
          }}
          layout={'vertical'}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          fields={
            orderSelected
              ? [
                  {
                    name: ['customer_name'],
                    value: orderSelected?.customer_name,
                  },
                  {
                    name: ['customer_phone'],
                    value: orderSelected?.customer_phone,
                  },
                  {
                    name: ['customer_address'],
                    value: orderSelected?.customer_address,
                  },
                  {
                    name: ['order_id'],
                    value: orderSelected?.order_id,
                  },

                  {
                    name: ['order_total'],
                    value: orderSelected?.order_total,
                  },
                ]
              : null
          }
        >
          <Form.Item
            label='Order Id '
            name='order_id'
            rules={[
              {
                required: true,
                message: 'Please input Order Id!',
                whitespace: true,
              },
            ]}
          >
            <Input
              placeholder='Order Id '
              required={true}
              disabled={orderSelected ? true : false}
              addonBefore={'#'}
              maxLength={6}
            />
          </Form.Item>
          <Form.Item
            label='Customer Name '
            name='customer_name'
            rules={[
              {
                required: true,
                message: 'Please input Customer Name!',
                whitespace: true,
              },
            ]}
          >
            <Input placeholder=' Customer Name' required={true} />
          </Form.Item>
          <Form.Item
            label='Phone No'
            name='customer_phone'
            rules={[
              {
                required: true,
                message: 'Please input Customer Phone No!',
                whitespace: true,
              },
            ]}
          >
            <Input
              placeholder='PhoneNo'
              required={true}
              minLength={10}
              maxLength={10}
            />
          </Form.Item>
          <Form.Item
            label='Customer Address '
            name='customer_address'
            rules={[
              {
                required: true,
                message: 'Please input Customer Address!',
                whitespace: true,
              },
            ]}
          >
            <Input
              placeholder=' Customer Address'
              required={true}
              maxLength={70}
            />
          </Form.Item>

          <Form.Item
            label='OrderTotal '
            name='order_total'
            rules={[
              {
                required: true,
                message: 'Please input Total Order Price!',
                whitespace: true,
              },
            ]}
          >
            <Input
              placeholder='Total Order Price '
              required={true}
              addonBefore='₹'
            />
          </Form.Item>
          <Form.Item
            label='Due Date '
            name='due_date'
            rules={[
              {
                required: orderSelected ? false : true,
                message: 'Please input Due DAte!',
                // whitespace: true,
              },
            ]}
          >
            <DatePicker
              required={true}
              format={dateFormat}
              placeholder={
                orderSelected ? orderSelected.due_date : 'Select Due Date'
              }
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 12,
                offset: 8,
              },
            }}
          >
            {' '}
            <Row>
              <Col style={{ textAlign: 'center' }}>
                <Button type='primary' onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Col>
              <Col offset={2} style={{ textAlign: 'center' }}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Modal
          visible={orderAddedModal}
          onCancel={goBackToOrderPage}
          closable={true}
          footer={null}
          width={'50rem'}
          centered='true'
        >
          <div style={{ height: 150 }}>
            <Title level={3} className='modal-content'>
              {orderSelected ? 'Order Edit Successful' : 'New Order Added'}
            </Title>
            <Row>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button type='primary' onClick={goBackToOrderPage}>
                  Okay
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
      </Card>
    </>
  );
}
export default AddOrder;
