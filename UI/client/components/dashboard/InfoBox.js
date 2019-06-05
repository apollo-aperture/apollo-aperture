import React from 'react';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

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
        color: grey[500],
      },
      iconSpan: {
        float: 'left',
        height: 80,
        width: 90,
        textAlign: 'center',
        backgroundColor: props.color,
      },
      icon: {
        height: 72,
        width: 72,
        marginTop: 30,
        maxWidth: '100%',
        color: 'white',
      }
    };
    return (
      <Paper>
          {/* FIX ICONS , ADD CONDITIONAL RENDERING */}

          <span style={styles.iconSpan}> 
           <Icon color="inherit" 
                icon={props.Icon}
                style={styles.icon}
            >
            {props.Icon}
            </Icon>
         </span>
        <div style={styles.content}>
          <span style={styles.text}>{props.title}</span>
          <span style={styles.number}>{props.value}</span>
        </div> 
      </Paper>
      );
}



// class InfoBox extends React.Component {
//   constructor(props) {
//     super(props);
//   };
//   render() {
//     // const {color, title, value, Icon} = this.props;

//     const styles = {
//       content: {
//         padding: '5px 10px',
//         marginLeft: 90,
//         height: 80
//       },
//       number: {
//         display: 'block',
//         fontWeight: Typography.fontWeightMedium,
//         fontSize: 18,
//         color: grey[800],
//       },
//       text: {
//         fontSize: 20,
//         fontWeight: Typography.fontWeightLight,
//         color: grey[500],
//       },
//       iconSpan: {
//         float: 'left',
//         height: 80,
//         width: 90,
//         textAlign: 'center',
//         backgroundColor: props.color,
//       },
//       icon: {
//         height: 72,
//         width: 72,
//         marginTop: 20,
//         maxWidth: '100%'
//       }
//     };

//     return (
//       <Paper>
//           {/* FIX ICONS , ADD CONDITIONAL RENDERING */}

//           <span style={styles.iconSpan}> 
//           <Icon color="inherit" 
//                 style={styles.icon}
//         >{['check_box']}</Icon>  
//           {/* <Icon styles={styles.icon}>star</Icon> */}
//          </span>
//         <div style={styles.content}>
//           <span style={styles.text}>{this.props.title}</span>
//           <span style={styles.number}>{this.props.value}</span>
//         </div> 
//       </Paper>
//       );
//   }
// }

export default InfoBox;