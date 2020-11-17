import React, { useState, useRef } from 'react';
import { Modal as AntdModal, Form, Input, Select, Row, Col, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const CustomerModal = ({ title, onSave, onCancel, visible, countries, isLoading, salespersons, fields }) => {
  const formRef = useRef();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const onCountrySelected = (countrySelected) => {
    const country = countries.find(({ name }) => name === countrySelected);
    setStates(country.states);
  };

  const onStateSelected = (stateSelected) => {
    const state = states.find(({ name }) => name === stateSelected);
    setCities(state.cities);
  };

  const onSaveHandler = (values) => {
    onSave(values);
    formRef.current.resetFields();
  }

  return (
    <AntdModal
      title={title}
      okButtonProps={{ form: 'create-new-customer-form', key: 'submit', htmlType: 'submit' }}
      onCancel={onCancel}
      okText='Save'
      cancelText='Cancel'
      visible={visible}
      confirmLoading={isLoading}
      width={1200}
    >
      <Form
        id='create-new-customer-form'
        name="basic"
        ref={formRef}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onSaveHandler}
        fields={fields}>
        <Form.Item name='id' style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label='Nit'
              name='nit'
              rules={[{ required: true, message: 'Nit is required!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Full Name'
              name='fullName'
              rules={[{ required: true, message: 'Full Name is required!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Phone'
              name='phone'
              rules={[{ required: true, message: 'Phone is required!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Address'
              name='address'
              rules={[{ required: true, message: 'Address is required!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Country'
              name='country'
              rules={[{ required: true, message: 'Country is required!' }]}>
              <Select allowClear onChange={onCountrySelected}>
                {countries.map(({ name }, index) =>
                  (<Select.Option key={`country-${index}`} value={name}>{name}</Select.Option>))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='State'
              name='state'
              rules={[{ required: true, message: 'State is required!' }]}>
              <Select allowClear onChange={onStateSelected}>
                {states.map(({ name }, index) =>
                  (<Select.Option key={`state-${index}`} value={name}>{name}</Select.Option>))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='City'
              name='city'
              rules={[{ required: true, message: 'City is required!' }]}>
              <Select allowClear>
                {cities.map(({ name }, index) =>
                  (<Select.Option key={`city-${index}`} value={name}>{name}</Select.Option>))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Quote'
              name='quote'
              rules={[{ required: true, message: 'Quote is required!' }]}>
              <Input type='number' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Balance Quote'
              name='balanceQuote'
              rules={[{ required: true, message: 'Balance Quote is required!' }]}>
              <Input type='number' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Visit Percentage'
              name='visitPercentage'
              rules={[{ required: true, message: 'Visit Percentage is required!' }]}>
              <Input type='number' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.List name='visits' >
              {(fields, { add, remove }) => (
                <>

                  <Form.Item style={{ width: '100%' }}>
                    <Button style={{ width: '100%', marginLeft: '30%' }} type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                      Add Visits
                    </Button>
                  </Form.Item>

                  {fields.map(field => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        {...field}
                        label="Date"
                        name={[field.name, 'date']}
                        fieldKey={[field.fieldKey, 'date']}
                        rules={[{ required: true, message: 'Date is required!' }]}
                      >
                        <Input type='date' />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Salesperson"
                        name={[field.name, 'salesperson']}
                        fieldKey={[field.fieldKey, 'salesperson']}
                        rules={[{ required: true, message: 'Salesperson is required!' }]}
                      >
                        <Select allowClear>
                          {salespersons.map(({ name }, index) =>
                            (<Select.Option key={`salesperson-${index}`} value={name}>{name}</Select.Option>))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Value"
                        name={[field.name, 'value']}
                        fieldKey={[field.fieldKey, 'value']}
                        rules={[{ required: true, message: 'Value is required!' }]}
                      >
                        <Input type='number' />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Visit Value"
                        name={[field.name, 'visitValue']}
                        fieldKey={[field.fieldKey, 'visitValue']}
                        rules={[{ required: true, message: 'Visit Value is required!' }]}
                      >
                        <Input type='number' />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Observations"
                        name={[field.name, 'visitObservations']}
                        fieldKey={[field.fieldKey, 'Observations']}
                      >
                        <Input />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </AntdModal >
  );
}

export default CustomerModal;
