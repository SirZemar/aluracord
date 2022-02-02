import React from 'react';
// SkynexUI
import { Button } from '@skynexui/components';
// Appconfig
import appConfig from '../../config.json';

const ButtonSendMessage = ({ onButtonClick, newMessage }) => (
    <Button
        label='Send'
        styleSheet={{
            height: 'calc(100% - 8px)',
            alignSelf: 'flex-start',
            marginLeft: '12px'
        }}

        onClick={() => onButtonClick(newMessage)}
    />
);

export default ButtonSendMessage;