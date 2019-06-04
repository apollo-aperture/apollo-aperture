import React from 'react';
import { Link } from 'react-router-dom'; 
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow'; 
// import Fab from 'material-ui/Fab'; // CHECK
// import ContentCreate from 'material-ui/svg-icons/content/create';
// import ContentAdd from 'material-ui/svg-icons/content/add';
// import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey'
import PageBase from '../components/PageBase';
import Data from '../data';

const TablePage = () => {
  const styles = {
    fab: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    editButton: {
      fill: grey[500]
    },
    columns: {
      id: {
        width: '10%'
      },
      name: {
        width: '40%'
      },
      price: {
        width: '20%'
      },
      category: {
        width: '20%'
      },
      edit: {
        width: '10%'
      }
    }
  };

  return (
    <PageBase title="Data Visualizer"
              navigation="Re-rendered Components">
      <div>
        <h1> HOWDY </h1>
        {/* <Link to="/form" >
          <Fab style={styles.fab} backgroundColor={grey[500]}>
            <ContentAdd />
          </Fab>
        </Link>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles.columns.id}>ID</TableCell>
              <TableCell style={styles.columns.name}>Name</TableCell>
              <TableCell style={styles.columns.price}>Field</TableCell>
              <TableCell style={styles.columns.category}>Category</TableCell>
              <TableCell style={styles.columns.edit}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.tablePage.items.map(item =>
              <TableRow key={item.id}>
                <TableRowColumn style={styles.columns.id}>{item.id}</TableCell>
                <TableCell style={styles.columns.name}>{item.name}</TableCell>
                <TableCell style={styles.columns.price}>{item.price}</TableCell>
                <TableCell style={styles.columns.category}>{item.category}</TableCell>
                <TableCell style={styles.columns.edit}>
                  <Link className="button" to="/form">
                    <Fab zDepth={0}
                                          mini={true}
                                          backgroundColor={grey[200]}
                                          iconStyle={styles.editButton}>
                      <ContentCreate  />
                    </Fab>
                  </Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>     */}
      </div>
    </PageBase>
  );
};

export default TablePage;
