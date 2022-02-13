import React from "react";
// SkynexUI
import { Box, Image } from '@skynexui/components';
// Config 
import appConfig from '../../config.json';
// styles
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const MessageChannels = ({ setChannel, addChannel, channelList }) => {


    return (

        <Box
            styleSheet={{
                height: '100%',
                maxWidth: '80px',
                backgroundColor: appConfig.theme.colors.pallet['color5'],
                borderRadius: '5px 0 0 5px',
                margin: '0 1rem',
            }}
        >
            <ul style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
                padding: '15px 0',
            }}>
                {channelList.map(channel => (
                    <li key={channel.id} onClick={() => setChannel(channel.id)}>
                        <Fab>
                            <Image src='https://placeimg.com/100/100/people' styleSheet={{ borderRadius: '50%' }} />
                        </Fab>
                    </li>
                )

                )
                }
                <li onClick={() => addChannel('nome')}>
                    <Fab >
                        <AddIcon />
                    </Fab>
                </li>

            </ul>
        </Box>
    )
}

export default MessageChannels