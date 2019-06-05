import React from 'react';
import { Link } from 'react-router-dom'; 
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'; 
import grey from '@material-ui/core/colors/grey'
import PageBase from '../components/PageBase';
import Data from '../data';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';


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
    <div>
    <PageBase title="Data Visualizer"
              navigation="Re-rendered Components">
        <Link to="/form" >
          <Fab style={styles.fab} color="inherit">
            <AddIcon />
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
                <TableCell style={styles.columns.id}>{item.id}</TableCell>
                <TableCell style={styles.columns.name}>{item.name}</TableCell>
                <TableCell style={styles.columns.price}>{item.price}</TableCell>
                <TableCell style={styles.columns.category}>{item.category}</TableCell>
                <TableCell style={styles.columns.edit}>
                  <Link className="button" to="/form">
                    <Fab      
                                          color="inherit"
                                          style={styles.editButton}>
                    <EditIcon/>
                    </Fab>
                  </Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>    

       
    </PageBase>
    <br>
    </br>

    </div>
  );
};

export default TablePage;
