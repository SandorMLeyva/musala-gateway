import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { IGateway } from '@gateway/models';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        minWidth: 250,
        maxWidth: 250,
        minHeight: 220,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    link: {
        textDecoration: "none"
    },
    cardContent:{
        height: 140
    }
});

export function GatewayCard(params: { gateway: IGateway }) {
    const classes = useStyles();

    return (
        <Box m={1}>
            <Card className={classes.root}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {params.gateway.ipv4Address}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {params.gateway.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {params.gateway.serial}
                    </Typography>

                </CardContent>
                <CardActions>
                    <Link aria-label={params.gateway.serial} className={classes.link} to={`/gateway/${params.gateway._id}`}>
                        <Button size="small">Details</Button>
                    </Link>
                </CardActions>
            </Card>
        </Box>
    );
}
