import React from 'react';
import Paper from '@material-ui/core/Paper';
import blueGrey from '@material-ui/core/colors/blueGrey';
import {ResponsiveContainer} from 'recharts';
import GlobalStyles from '../../styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import styled, { keyframes } from 'styled-components';

// For cloud shadow animation in Query response Box
const pulse = (shadow) => keyframes`
  to {
    box-shadow: 0 0 8px 8px ${shadow};
  }
`;
const Cloud = styled.div`
  background-color: blueGrey[500];
  border-radius: 15px;
  color: 'white';
  height: 115%,
  shadow: 'rgba(0, 0, 0, 0.7)';
  box-shadow: 0 0 0 0 ${props => props.theme.shadow};
  animation: ${props => pulse(props.theme.shadow)} 1.75s infinite cubic-bezier(0.646, 0, 0, 1);
`;

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
      borderRadius: '15px',
      margin: '0 auto',
      display: 'block',
      height: '75%',
      width: 150,
      marginTop: 30,
      backgroundColor: blue[500],
      color: 'white',
      shadow: 'rgba(0, 0, 0, 0.7)',
    }
  };
  return (
    <Paper style={styles.paper}>
      <div style={{...GlobalStyles.title, ...styles.header}}> Query Response </div>
      <div style={styles.div}>
  
        <ResponsiveContainer>
          <Button variant="contained" color="default" style={styles.image}>
            <Cloud><CloudUploadIcon /></Cloud>
          </Button>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default ExtraSpace;
