import React from "react";
// SkynexUI
import { TextField } from '@skynexui/components';
// AppConfig 
import appConfig from '../../config.json';

const MessageBox = ({ onKeyEnterPress, newMessage, setNewMessage }) => (


    <TextField
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
        onKeyPress={(event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                onKeyEnterPress(newMessage);
            }
        }}
        placeholder="Type your message here..."
        type="textarea"
        styleSheet={{
            margin: 'none',
            width: '100%',
            border: '0',
            resize: 'none',
            borderRadius: '5px',
            padding: '6px 8px',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            marginRight: '12px',
            color: appConfig.theme.colors.neutrals[200],
        }}
    />

);

export default MessageBox;
