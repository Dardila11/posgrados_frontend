import React from 'react';
import {
    Button, Grid, makeStyles, Input
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(() => ({
    field: {
        marginTop: '18px'
    }
}));

const UploadPDF = (props) => {
    const classes = useStyles();
    return (
        <Grid container alignItems="center" className={classes.field}>
            <Grid>
                <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} >
                    Justificante
                    <Input type="file" name="file" inputProps={{ accept: '.pdf' }} style={{ display: "none" }}
                        onChange={(e) => props.uploadFile(e.target.files)}
                    />
                </Button>
            </Grid>
                &nbsp;
            <Grid id="text-file"></Grid>
        </Grid>
    );
};
export default UploadPDF;