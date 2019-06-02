import React from 'react';
import Paper from '@material-ui/core/Paper';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import GlobalStyles from '../../styles';
import Typography from '@material-ui/core/Typography';
import cyan from '@material-ui/core/colors/cyan'
import grey from '@material-ui/core/colors/grey'

const Pies = (props) => {
  const styles = {
    paper: {
      minHeight: 344,
      padding: 10,
    },
    legend: {
      paddingTop: 20,
    },
    pieChartDiv: {
      height: 290,
      textAlign: 'center'
    },
    subheader: {
        fontSize: 24,
        fontWeight: Typography.fontWeightLight,
        backgroundColor: cyan[600],
        color: grey[100],
    },
  };
  return (

    <Paper style={styles.paper}>
      <ListSubheader style={styles.subheader}>Re-Rendered Components</ListSubheader>
      {/* <span style={GlobalStyles.title}>Re-Rendered Components</span> */}

      <div style={GlobalStyles.clear}/>

      <div className="row">

        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
          <div style={styles.pieChartDiv}>
            <ResponsiveContainer>
              <PieChart >
                <Pie
                  innerRadius={80}
                  outerRadius={130}
                  data={props.data}
                  dataKey="value"
                  fill="#8884d8">
                  {
                    props.data.map((item) => <Cell key={item.name} fill={item.color}/>)
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <div style={styles.legend}>
            <div style={styles.legend}>
              <List>
                {props.data.map((item) =>
                  <ListItem
                    key={item.name}
                    leftavatar={
                      <Avatar icon={item.icon}
                              backgroundColor={item.color}/>
                    }>
                    {item.name}
                  </ListItem>
                )}
              </List>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Pies;
