import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';
import Divider from '@material-ui/core/Divider';
import PageBase from '../components/PageBase';
function FormPage(props) {
    
    const styles = {
        toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
        },
        toggleLabel: {
        color: grey[400],
        fontWeight: 100
        },
        buttons: {
        marginTop: 30,
        float: 'right'
        },
        saveButton: {
        marginLeft: 5
        }
    };
    return (
        <h1>YASDFASDFSF</h1> 
    );
}
  
// function FormPage(props) {
    
//     const styles = {
//         toggleDiv: {
//         maxWidth: 300,
//         marginTop: 40,
//         marginBottom: 5
//         },
//         toggleLabel: {
//         color: grey[400],
//         fontWeight: 100
//         },
//         buttons: {
//         marginTop: 30,
//         float: 'right'
//         },
//         saveButton: {
//         marginLeft: 5
//         }
//     };
//     return (
//         <PageBase title="Query / Mutation Form"
//                 navigation="Post Schema">
//         <form>
//             <TextField
//             hintText="Astronaut Name"
//             floatingLabelText="Astronaut Name"
//             fullWidth={true}
//             />
//             <TextField
//             hintText="Nationality"
//             floatingLabelText="Nationality"
//             fullWidth={true}
//             />
//             <TextField
//             hintText="Rank"
//             floatingLabelText="Rank"
//             fullWidth={true}
//             />
//             <TextField
//             hintText="Mission"
//             floatingLabelText="Mission"
//             fullWidth={true}
//             />
//             <TextField
//             hintText="Status"
//             floatingLabelText="Status"
//             fullWidth={true}
//             />
//             <Divider/>
//             <div style={styles.buttons}>
//             <Link to="/">
//                 <Button label="Cancel"/>
//             </Link>

//             {/* // Redirects to Dashboard */}
//             <Link to="/">
//             <Button label="LAUNCH"
//                             style={styles.saveButton}
//                             type="submit"
//                             primary={true} />
//             </Link>
//             </div>
//         </form>
//         </PageBase>  
//     );
// }
  




// class FormPage extends React.Component {
//   constructor(props) {
//     super(props);
//   };
  
//   render() {
//     const styles = {
//       toggleDiv: {
//         maxWidth: 300,
//         marginTop: 40,
//         marginBottom: 5
//       },
//       toggleLabel: {
//         color: grey[400],
//         fontWeight: 100
//       },
//       buttons: {
//         marginTop: 30,
//         float: 'right'
//       },
//       saveButton: {
//         marginLeft: 5
//       }
//     };
//     return (
//       <PageBase title="Query / Mutation Form"
//                 navigation="Post Schema">
//         <form>
//           <TextField
//             hintText="Astronaut Name"
//             floatingLabelText="Astronaut Name"
//             fullWidth={true}
//           />
//           <TextField
//             hintText="Nationality"
//             floatingLabelText="Nationality"
//             fullWidth={true}
//           />
//           <TextField
//             hintText="Rank"
//             floatingLabelText="Rank"
//             fullWidth={true}
//           />
//           <TextField
//             hintText="Mission"
//             floatingLabelText="Mission"
//             fullWidth={true}
//           />
//           <TextField
//             hintText="Status"
//             floatingLabelText="Status"
//             fullWidth={true}
//           />
//           <Divider/>
//           <div style={styles.buttons}>
//             <Link to="/">
//               <Button label="Cancel"/>
//             </Link>
  
//             {/* // Redirects to Dashboard */}
//             <Link to="/">
//             <Button label="LAUNCH"
//                           style={styles.saveButton}
//                           type="submit"
//                           primary={true} />
//             </Link>
//           </div>
//         </form>
//       </PageBase>  
//     );
//   }
// }

export default FormPage;
