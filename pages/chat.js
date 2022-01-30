import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import appConfig from '../config.json';
import HomePage from '.';

const SUPABASE_URL = 'https://iricuibhafwpxwjaiddj.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_API_KEY;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log(HomePage)

export default function ChatPage() {
  const [newMessage, setNewMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    supabaseClient
      .from('messages')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setMessageHistory(data)
      });
  }, []);

  const handleNewMessage = (newMessage) => {
    if (newMessage === '') return;

    const message = {
      value: newMessage,
      from: 'SirZemar',
    };

    supabaseClient
      .from('messages')
      .insert([
        message
      ])
      .then(({ data }) => {
        setMessageHistory([
          data[0],
          ...messageHistory
        ]);
        console.log(data)
      })

    /*  setMessageHistory([
       message,
       ...messageHistory,
     ]); */
    setNewMessage('');
  }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.pallet['color5'],
        backgroundImage: 'url(https://www.crunchyroll.com/animeawards/static/3e4fd37b523bddf5e0ea4f73e33ea068/4542c/particles.png)',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'luminosity',
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.pallet['color5'],
          height: '100%',
          maxWidth: 'min(95vw, 1200px)',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.pallet['color1'],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList message={messageHistory} />
          {/*  {messageHistory.map((message) => (
            <li key={message.id}>
              {message.value}
            </li>
          ))} */}

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleNewMessage(newMessage);
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
            <Button
              label='Send'
              styleSheet={{
                height: 'calc(100% - 8px)',
                alignSelf: 'flex-start'
              }}
              onClick={() => handleNewMessage(newMessage)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

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
}

const MessageList = ({ message: messages }) => {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
        overflow: 'hidden',
        maxWidth: '100%'
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

            // hover: {
            //   backgroundColor: appConfig.theme.colors.neutrals[700],
            // }
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
          {message.value} {message.id === 1 && <span>you!</span>}
        </Text>
      ))}
    </Box>
  )
}