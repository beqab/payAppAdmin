import React from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

import classNames from 'classnames';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as data from './components/data';
import './style.scss';
import BreadCrumbs from './components/BreadCrumbs';
import ComponentCard from './components/ComponentCard';
import Endpoints from '../../../services/endpints';
import useCountries from './hooks/useCounties';
import Axios from '../../../services/Axios';
// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// This is for the Delete row
function onAfterDeleteRow(rowKeys) {
  // eslint-disable-next-line no-alert
  alert(`The rowkey you drop: ${rowKeys}`);
}

// This is for the Search item
function afterSearch(searchText, result) {
  // console.log(`Your search text is ${searchText}`);
  // console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log(`Fruit: ${result[i].id}, ${result[i].name}, ${result[i].price}`);
  }
}

const options = {
  afterDeleteRow: onAfterDeleteRow, // A hook for after dropping rows
  afterSearch, // define an after search hook
  sortIndicator: true,
};

const selectRowProp = {
  mode: 'checkbox',
};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
};

const Datatables = () => {
  const { data: countriesData, error, isLoading } = useCountries();
  const queryClient = useQueryClient();

  const updateCountriesStatus = useMutation({
    mutationFn: (requestData) => {
      return Axios.post(Endpoints.updateCountries, requestData).then((res) => res.data);
    },
    onSuccess: () => {
      toast.success('updated successfully!');

      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });

  // Handler for button click
  const handleButtonClick = (row) => {
    // console.log(row);

    const userConfirmed = window.confirm(
      `Are you sure you want to change the status for: ${row.country}?`,
    );

    if (userConfirmed) {
      updateCountriesStatus.mutate({ countryId: row._id, status: !row.allowed });
    }
    // updateCountriesStatus.mutate({ countryId: row._id, status: !row.allowed });
  };
  // Custom button cell renderer
  const buttonFormatter = (cell, row) => {
    // console.log(row, 'rrrr');
    return (
      <button
        type="button"
        onClick={() => handleButtonClick(row)}
        className={classNames('btn  btn-sm', {
          'btn-warning ': !row.allowed,
          'btn-primary': row.allowed,
        })}
      >
        {row.allowed ? 'Deactivate Country' : 'Activate Country'}
      </button>
    );
  };

  if (isLoading) return <p> ..loading</p>;
  if (error) return <p> {error.message}</p>;
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <ComponentCard title="Countries ist">
            <BootstrapTable
              striped
              hover
              condensed
              search
              data={countriesData}
              // deleteRow
              // selectRow={selectRowProp}
              // pagination
              // insertRow
              options={options}
              // cellEdit={cellEditProp}
              tableHeaderClass="mb-0"
            >
              <TableHeaderColumn
                width="100"
                dataField="flag"
                isKey
                dataFormat={(cell, row) => {
                  // console.log(cell, row, 'ttttt');
                  return <img width={30} src={cell} alt="" />;
                }}
              >
                Flag
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="country">
                Name
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="code">
                Code
              </TableHeaderColumn>
              <TableHeaderColumn
                width="100"
                dataField="allowed"
                dataSort
                sortIndicator
                dataFormat={(cell, row) => {
                  // console.log(cell, row, 'ttttt');
                  return (
                    <span
                      className={classNames('badge ', {
                        'bg-danger': row.allowed,
                        'bg-success': !row.allowed,
                      })}
                    >
                      {row.allowed ? 'active' : 'inactive'}
                    </span>
                  );
                }}
              >
                Status
              </TableHeaderColumn>
              <TableHeaderColumn
                width="100"
                dataFormat={buttonFormatter} // Adding the custom button
              >
                Action
              </TableHeaderColumn>
            </BootstrapTable>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default Datatables;
