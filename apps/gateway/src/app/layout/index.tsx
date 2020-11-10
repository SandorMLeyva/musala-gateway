import React from 'react';
import SearchAppBar from '../components/app-bar';
import { Container, Box } from '@material-ui/core';



function Layout({ children }) {
    return (
        <div>
            <SearchAppBar />
            <Box p={4}>
                <Container fixed children={children} />
            </Box>
        </div>
    );
}
export default Layout;
