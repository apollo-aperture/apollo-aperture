import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';
import Divider from '@material-ui/core/Divider';
import PageBase from '../components/PageBase';
import QueryTree from '../d3.js';

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
        <PageBase title="Query / Mutation Form"
                navigation="Post Schema">
        <form>
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
            <br>
            </br>

            <div style={styles.buttons}>
            <Link to="/">
                <Button label="Cancel"/>
            </Link>

            {/* // Redirects to Dashboard */}
            <Link to="/">
            <Button label="LAUNCH"
                            style={styles.saveButton}
                            type="submit"
                            primary={"true"} />
            </Link>

            
            </div>
        </form>
        </PageBase>  
    );
}
export default FormPage;
