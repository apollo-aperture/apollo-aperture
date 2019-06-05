import React from 'react';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';
import Divider from '@material-ui/core/Divider';
import PageBase from '../components/PageBase';
import QueryTree from '../d3.js';
import Button from '@material-ui/core/Button';

class FormPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showComponent: false,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onButtonClick() {
      this.setState({
          showComponent: true,
      });
  }

  render() {
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
        float: 'right',
        backgroundColor: 'blue'
        },
        saveButton: {
        marginLeft: 5,
        backgroundColor: 'red',
        color: 'white',
        }
    };

    return (
        <PageBase title="Query Tree Visualizer"
                navigation="Visualize">
            {this.state.showComponent ? <QueryTree/> : null}
            <br>
            </br>
                   
            <form>
            <Button onClick={this.onButtonClick} style={styles.saveButton}> Generate </Button>
            <TextField
            fullWidth={true}
            />
            <TextField
            fullWidth={true}
            />
            <TextField
            fullWidth={true}
            />
            <TextField
            fullWidth={true}
            />
            <TextField
            fullWidth={true}
            />
            <Divider/>
            </form>
        </PageBase>  
    );
  };
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
//         float: 'right',
//         backgroundColor: 'blue'
//         },
//         saveButton: {
//         marginLeft: 5,
//         backgroundColor: 'blue',
//         }
//     };
//     return (
   
//         <PageBase title="Query Tree Visualizer"
//                 navigation="Visualize">
//             <QueryTree/>
//             <br>
//             </br>
                   
//             <form>
//             <TextField
//             fullWidth={true}
//             />
//             <TextField
//             fullWidth={true}
//             />
//             <TextField
//             fullWidth={true}
//             />
//             <TextField
//             fullWidth={true}
//             />
//             <TextField
//             fullWidth={true}
//             />
//             <Divider/>
//             </form>
         

//         </PageBase>  
//     );
// }


export default FormPage;
