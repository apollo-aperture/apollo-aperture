import React from 'react';
import Paper from '@material-ui/core/Paper';
import blueGrey from '@material-ui/core/colors/blueGrey';
import {LineChart, Line, ResponsiveContainer} from 'recharts';
import Typography from '@material-ui/core/Typography';

const QuickAccess = (props) => {
  const styles = {
    paper: {
      backgroundColor: 'white',
      height: 175,
    },
    div: {
      height: 95,
      padding: '5px 15px 0 15px',
    },
    header: {
      fontSize: 24,
      fontWeight: Typography.fontWeightLight,
      color: 'white',
      backgroundColor: blueGrey[600],
      padding: 10,
    }
  };
  return (
    <Paper style={styles.paper}>
      <div style={{...styles.header}}>GraphQL Playground Quick Access</div>
      <div style={styles.div}>
        <ResponsiveContainer >
          <LineChart data={props.data}>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default QuickAccess;
