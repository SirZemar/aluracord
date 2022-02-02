import React from "react";
// SkynexUI
import { Box } from '@skynexui/components';
// Config
import appConfig from '../../config.json';

const Background = () => (
    <Box
        styleSheet={{
            backgroundColor: appConfig.theme.colors.pallet['color5'],
            backgroundImage: 'url(https://www.crunchyroll.com/animeawards/static/3e4fd37b523bddf5e0ea4f73e33ea068/4542c/particles.png)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'luminosity',
            width: '100vw', height: '100vh',
            position: 'fixed', zIndex: '-100'
        }}
    >
    </Box>
);

export default Background;