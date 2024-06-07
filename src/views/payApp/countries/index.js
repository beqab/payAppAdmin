import React from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as data from './components/data';
import './style.scss';
import BreadCrumbs from './components/BreadCrumbs';
import ComponentCard from './components/ComponentCard';

// This is for the Delete row
function onAfterDeleteRow(rowKeys) {
  // eslint-disable-next-line no-alert
  alert(`The rowkey you drop: ${rowKeys}`);
}

// This is for the Search item
function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log(`Fruit: ${result[i].id}, ${result[i].name}, ${result[i].price}`);
  }
}

const options = {
  afterDeleteRow: onAfterDeleteRow, // A hook for after dropping rows
  afterSearch, // define an after search hook
};

const selectRowProp = {
  mode: 'checkbox',
};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
};
// Handler for button click
const handleButtonClick = (row) => {
  alert(`Button clicked for: ${row.name}`);
};
// Custom button cell renderer
const buttonFormatter = (cell, row) => {
  return (
    <button type="button" onClick={() => handleButtonClick(row)} className="btn btn-primary btn-sm">
      Action
    </button>
  );
};

const Datatables = () => {
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <ComponentCard title="Bootstrap DataTable">
            <BootstrapTable
              striped
              hover
              condensed
              search
              data={data.JsonData}
              deleteRow
              selectRow={selectRowProp}
              pagination
              insertRow
              options={options}
              cellEdit={cellEditProp}
              tableHeaderClass="mb-0"
            >
              <TableHeaderColumn
                width="100"
                dataField="name"
                isKey
                dataFormat={(cell, row) => {
                  return (
                    <button
                      type="button"
                      onClick={() => handleButtonClick(row)}
                      className="btn btn-primary btn-sm"
                    >
                      delete
                    </button>
                  );
                }}
              >
                Name
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="gender">
                Gender
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="company">
                Company
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
