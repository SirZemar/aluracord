import React from "react";
// SkynexUI
import { Box, Text, Image } from '@skynexui/components';
//Config
import appConfig from '../../config.json';

const MessageList = ({ messages, loggedUser }) => {
    return (
        <Box
            className='scroll-style'
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                maxWidth: '100%',
                '&::after': {
                    content: `''`,
                    display: 'block',
                    width: '100px',
                    height: '10px',
                }
            }}
        >
            {messages.map((message) => (
                <Text
                    key={message.id}
                    tag="li"
                    styleSheet={{
                        borderRadius: '5px',
                        padding: '6px',
                        marginBottom: '12px',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        wordWrap: 'break-word',
                    }}
                >
                    <Box
                        styleSheet={{
                            marginBottom: '8px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            src={`https://github.com/${message.from}.png`}
                        />
                        <Text tag="strong">
                            {message.from}
                        </Text>
                        <Text
                            styleSheet={{
                                fontSize: '10px',
                                marginLeft: '8px',
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                            tag="span"
                        >
                            {(new Date().toLocaleDateString())}
                        </Text>
                    </Box>
                    {message.sticker
                        ? <Image
                            src={message.sticker}
                            alt='Sticker'
                            styleSheet={{
                                width: {
                                    xs: '70px',
                                    sm: '100px',
                                },
                            }}
                        />
                        : message.value
                    }
                    {message.id === 1 && ` ${loggedUser}`}
                </Text>
            ))}
        </Box>
    )
};

export default MessageList;