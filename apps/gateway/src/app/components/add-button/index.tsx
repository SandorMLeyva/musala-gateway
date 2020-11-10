import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Box, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    root: {
        width: 250,
        height: 200,
    },
    root2: {
        width: 250,
        height: 220,
    },
    hugeIcon: {
        fontSize: 100
    },
    center: {
        textAlign: "center",
        marginTop: "10%"
    },
    
});

interface AddCardProps {
    onClick(): void;
    small?: boolean
}

export default function AddCard(props: AddCardProps) {
    const classes = useStyles();

    return (
        <Box m={1} >
            <Card className={props.small ? classes.root : classes.root2}>
                <CardContent className={classes.center }>
                    <IconButton aria-label="add" onClick={props.onClick} >
                        <AddIcon className={classes.hugeIcon} />
                    </IconButton>
                </CardContent>

            </Card>
        </Box>

    );
}
