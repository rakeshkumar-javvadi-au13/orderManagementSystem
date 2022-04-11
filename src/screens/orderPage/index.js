import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';

import { PageHeader } from 'antd';
import { Table, Space, Button, Row, Col, Typography, Modal, Card } from 'antd';

const DummyOrdersData = [
  {
    order_id: 1,

    customer_name: 'Rakesh Kumar',
    customer_address: 'Sai Spurthy Enclave ,Venkatagiri,Yousuguda,Hyderabad',
    customer_phone: 9160789333,
    due_date: '29/4/2022',
    order_total: 1245,
  },
  {
    order_id: 2,

    customer_name: 'Rakesh Kumar',
    customer_address: 'Aparna ,Jubilee Hills,Hyderabad',
    customer_phone: 9768543213,
    due_date: '4/12/2022',
    order_total: 1567,
  },
  {
    order_id: 3,

    customer_name: 'Ramesh Kumar',
    customer_address: 'Gayatri Residency ,Jubilee Hills,Hyderabad',
    customer_phone: 9566465413,
    due_date: '9/3/2022',
    order_total: 1054,
  },
];
const { Title } = Typography;
function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ordersData, setOrdersData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState('');

  useEffect(() => {
    getOrdersDetail();
  }, []);
  const getOrdersDetail = () => {
    if (localStorage.getItem('token') === 'iLikeThisTask') {
      location?.state?.newOrder
        ? setOrdersData(location?.state?.newOrder)
        : setOrdersData(DummyOrdersData);
    } else {
      navigate('/');
    }
  };

  // eslint-disable-next-line

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 100,
    },

    {
      title: 'Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'PhoneNo',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
    },
    {
      title: 'Address',
      dataIndex: 'customerAddress',
      key: 'customerAddress',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 100,
    },
    {
      title: 'Total Price',
      dataIndex: 'orderTotal',
      key: 'orderTotal',
      width: 100,
    },

    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (order) => (
        <Space size='middle'>
          <Button
            type='default'
            style={{ background: '#FFECE3', color: '#EF6E2C' }}
            success='true'
            onClick={() => editOrder(order)}
          >
            Edit
          </Button>
          <Button
            type='warning'
            style={{ background: '#EEF9FF', color: '#3CB3E7' }}
            success='true'
            onClick={() => deleteOrder(order)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  let tableData = [];
  ordersData?.map((order, index) => {
    console.log('date', order.due_date);
    tableData.push({
      key: index,

      orderId: '#' + order?.order_id,

      customerName: order?.customer_name,

      customerPhone: order?.customer_phone,
      customerAddress: order?.customer_address,
      dueDate: order?.due_date.trim(),
      orderTotal: '₹' + order?.order_total,
      order: order,
    });
  });

  const addOrder = () => {
    navigate('/addOrder', {
      state: { ordersData },
    });
  };
  const editOrder = (order) => {
    navigate('/editOrder', {
      state: { order, ordersData },
    });
  };
  const deleteOrder = (order) => {
    console.log('order', order);
    setDeleteOrderId(order?.order?.order_id);
    setDeleteModal(true);
  };

  const updateOrdersHandler = () => {
    let removeOrder = ordersData.filter(
      (item) => item.order_id != deleteOrderId
    );
    setOrdersData([...removeOrder]);
    setDeleteModal(false);
  };
  const logoutHandler = () => {
    // localStorage.clear()
    localStorage?.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <PageHeader
        className='site-page-header'
        title='Open Tickets'
        title={
          ordersData?.length > 0 ? `Orders(${ordersData?.length})` : 'Orders'
        }
        extra={
          <Row gutter={10}>
            <Col>
              <Space>
                <Button
                  size={'large'}
                  style={{
                    fontSize: 15,

                    color: '#D5683B',
                    borderColor: '#D5683B',
                  }}
                  onClick={addOrder}
                >
                  Add New Order
                </Button>
                <Button
                  size={'large'}
                  style={{
                    fontSize: 15,

                    color: '#D5683B',
                    borderColor: '#D5683B',
                  }}
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </Space>
            </Col>
          </Row>
        }
      />
      <Card>
        <div className='container'>
          <Table columns={columns} dataSource={tableData} pagination={false} />
        </div>
        <Modal
          visible={deleteModal}
          onCancel={() => setDeleteModal(false) && setDeleteOrderId('')}
          closable={true}
          footer={null}
          width={'40rem'}
          centered='true'
        >
          <div style={{ height: 150 }}>
            <Title level={3} className='modal-content'>
              Are you sure you want to delete this order
            </Title>
            <Row>
              <Col offset={8} span={4} style={{ textAlign: 'center' }}>
                <Button
                  type='primary'
                  onClick={() => setDeleteModal(false) && setDeleteOrderId('')}
                >
                  Cancel
                </Button>
              </Col>
              <Col offset={2} span={4} style={{ textAlign: 'center' }}>
                <Button type='primary' onClick={updateOrdersHandler}>
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
export default OrderPage;
