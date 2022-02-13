import React from "react";
// SkynexUI
import { Box, Text, Button } from '@skynexui/components';
//Config
import appConfig from '../../config.json';

const Header = () => {
    return (
        <>
            <Box styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingBottom: '16px',
                paddingLeft: '2rem',
                color: appConfig.theme.colors.pallet['color3'],
                height: '5%',
            }} >
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