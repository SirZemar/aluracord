import React from "react";
// SkynexUI
import { Box, Text, Button } from '@skynexui/components';
//Config
import appConfig from '../../config.json';

const Header = () => {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: appConfig.theme.colors.pallet['color3'] }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                    style={{ color: appConfig.theme.colors.neutrals[200] }}
                />
            </Box>
        </>
    )
};

export default Header;