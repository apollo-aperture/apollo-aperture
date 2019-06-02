import React from 'react';
import Paper from '@material-ui/core/Paper';
import blueGrey from '@material-ui/core/colors/blueGrey';
import {ResponsiveContainer} from 'recharts';
import GlobalStyles from '../../styles';

const ExtraSpace = () => {
  const styles = {
    paper: {
      backgroundColor: 'white',
      height: 175,
    },
    div: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '95%',
      height: 85
    },
    header: {
      color: 'white',
      backgroundColor: blueGrey[600],
      padding: 10
    },
    image: {
      margin: '0 auto',
      display: 'block',
      maxWidth: '10%',
      height: 'auto',
      paddingBottom: '20px',
    }
  };
  return (
    <Paper style={styles.paper}>
      <div style={{...GlobalStyles.title, ...styles.header}}> Query Response </div>
      <div style={styles.div}>
        <ResponsiveContainer>
         <h1> Howdy </h1>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default ExtraSpace;
