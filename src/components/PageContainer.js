import React from "react";
// SkynexUI
import { Box } from '@skynexui/components';

const PageContainer = ({ children }) => (
    <Box
        styleSheet={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        {children}
    </Box>
);

export default PageContainer;