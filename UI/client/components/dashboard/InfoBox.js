import React from 'react';
import Paper from '@material-ui/core/Paper';
import blue from '@material-ui/core/colors/blue'; // white
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';


function InfoBox(props) {
  
    const styles = {
      content: {
        padding: '5px 10px',
        marginLeft: 90,
        height: 80
      },
      number: {
        display: 'block',
        fontWeight: Typography.fontWeightMedium,
        fontSize: 18,
        color: grey[800],
      },
      text: {
        fontSize: 20,
        fontWeight: Typography.fontWeightLight,
        color: grey[800],
      },
      iconSpan: {
        float: 'left',
        height: 90,
        width: 90,
        textAlign: 'center',
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: '100%'

      }
    };

    return (
      <Paper>
        <span style={styles.iconSpan}> </span>
    

        <div style={styles.content}>
          <span style={styles.text}>{props.title}</span>
          <span style={styles.number}>{props.value}</span>
        </div> 
      </Paper>
      );

}



// class InfoBox extends React.Component {
//     render() {
//       const {color, title, value, Icon} = this.props;
  
//       const styles = {
//         content: {
//           padding: '5px 10px',
//           marginLeft: 90,
//           height: 80
//         },
//         number: {
//           display: 'block',
//           fontWeight: Typography.fontWeightMedium,
//           fontSize: 18,
//           color: grey[800],
//         },
//         text: {
//           fontSize: 20,
//           fontWeight: Typography.fontWeightLight,
//           color: grey[800],
//         },
//         iconSpan: {
//           float: 'left',
//           height: 90,
//           width: 90,
//           textAlign: 'center',
//           backgroundColor: color
//         },
//         icon: {
//           height: 48,
//           width: 48,
//           marginTop: 20,
//           maxWidth: '100%'
  
//         }
//       };
  
//       return (
//         <Paper>
//           <span style={styles.iconSpan}>
//             <Icon color={blue[50]}
//                   style={styles.icon}
//             />
//           </span>
  
//           <div style={styles.content}>
//             <span style={styles.text}>{title}</span>
//             <span style={styles.number}>{value}</span>
//           </div>
//         </Paper>
//         );
//     }
//   }
  
export default InfoBox;