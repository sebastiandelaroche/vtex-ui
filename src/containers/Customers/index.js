import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { fetchCustomers, createCustomers, deleteCustomer, updateCustomer } from '../../store/customer/thunks';
import { fetchCountries } from '../../store/country/thunks';
import { fetchSalespersons } from '../../store/salesperson/thunks';
import { selectCustomers, selectIsLoading as customersIsLoading, selectIsCustomerCreationLoading, selectIsCustomerUpdatingLoading } from '../../store/customer/selectors';
import { selectCountries, selectIsLoading as countriesIsLoading } from '../../store/country/selectors';
import { selectSalespersons, selectIsLoading as salespersonIsLoading } from '../../store/salesperson/selectors';

import customerTableConfig from './utils/customerTableConfig';

import Table from '../../components/Table';
import CustomerModal from '../../components/CustomerModal';

const Customers = () => {
  const dispatch = useDispatch();
  const customers = useSelector(selectCustomers);
  const countries = useSelector(selectCountries);
  const salespersons = useSelector(selectSalespersons);
  const isCustomersLoading = useSelector(customersIsLoading);
  const isCountriesLoading = useSelector(countriesIsLoading);
  const isCustomerCreationLoading = useSelector(selectIsCustomerCreationLoading);
  const isCustomerUpdatingLoading = useSelector(selectIsCustomerUpdatingLoading);
  const isSalespersonLoading = useSelector(salespersonIsLoading);
  const [isCreateNewCustomerModalVisible, setIsCreateNewCustomerModalVisible] = useState(false);
  const [isEditCustomerModalVisible, setEditCustomerModalVisible] = useState(false);
  const [customerSelected, setCustomerSelected] = useState([]);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchCountries());
    dispatch(fetchSalespersons());
  }, []);

  const addNewCustomerOnClickHandler = () => {
    setIsCreateNewCustomerModalVisible(true);
  };

  const onCancelNewCustomer = () => {
    setIsCreateNewCustomerModalVisible(false);
  };

  const onCreateNewCustomer = (data) => {
    dispatch(createCustomers(data));
    setIsCreateNewCustomerModalVisible(false);
  };

  const onDeleteCustomer = (data) => {
    dispatch(deleteCustomer(data.id));
  };

  const onEditCustomer = (data) => {
    const mappedFields = Object.entries(data)
      .map(([key, value]) => ({ value, name: [key] }));
    setCustomerSelected(mappedFields);
    setEditCustomerModalVisible(true);
  };

  const onCancelEditCustomer = () => {
    setEditCustomerModalVisible(false);
  };

  const onSaveEditCustomer = (data) => {
    dispatch(updateCustomer(data));
    setEditCustomerModalVisible(false);
  };

  if (isCustomersLoading || isCountriesLoading || isSalespersonLoading)
    return <div>Loading ...</div>;

  return (
    <div style={{ margin: '30px' }}>
      <Button type="primary"
        icon={<PlusCircleOutlined />}
        size='large'
        style={{ float: 'right', margin: '0 0 25px 0' }}
        onClick={addNewCustomerOnClickHandler}>
        Add A New Customer
      </Button>
      <Table
        columns={customerTableConfig.columns}
        data={customers}
        onEdit={onEditCustomer}
        onDelete={onDeleteCustomer}
      />
      <CustomerModal
        title={'Create A New Customer'}
        visible={isCreateNewCustomerModalVisible}
        onSave={onCreateNewCustomer}
        onCancel={onCancelNewCustomer}
        countries={countries}
        salespersons={salespersons}
        isLoading={isCustomerCreationLoading}
      />
      <CustomerModal
        title={'Edit A Customer'}
        visible={isEditCustomerModalVisible}
        onSave={onSaveEditCustomer}
        onCancel={onCancelEditCustomer}
        countries={countries}
        salespersons={salespersons}
        isLoading={isCustomerUpdatingLoading}
        fields={customerSelected}
      />
    </div>
  );
}

export default Customers;
