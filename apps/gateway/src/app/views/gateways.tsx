import React, { useEffect, useState } from 'react'
import { GatewayCard } from '../components/gateway'
import { Box } from '@material-ui/core'
import AddCard from '../components/add-button'
import { IGateway } from "@gateway/models"
import { ModalForm } from '../components/modal-form/modalForm'
import FormGateway from '../components/gateway/form'
import { listGateway } from '../api'


export const Gateways = () => {
    const [gateways, setGateways] = useState<IGateway[]>([]);

    useEffect(() => {
        listGateway()
            .then(r => r.json())
            .then(setGateways)
            .catch(e => console.log(e))
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const newGateway = (gateway: IGateway) => {
        setGateways([...gateways, gateway]);
        handleClose();
    };


    return (
        <div>
            <Box display="flex" flexWrap={"wrap"} >
                <AddCard onClick={handleOpen} />
                {gateways.map(gateway =>
                    <GatewayCard gateway={gateway} key={gateway._id} />)}
            </Box>
            <ModalForm open={open} handleClose={handleClose}>
                <FormGateway onSubmit={newGateway} />
            </ModalForm>
        </div>
    )
}
