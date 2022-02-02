import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//Supabase
import { createClient } from '@supabase/supabase-js';
//SkynexUI
import { Box } from '@skynexui/components';
//Components
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import MessageList from '../src/components/MessageList';
import Header from '../src/components/Header';
import MessageBox from '../src/components/MessageBox';
//Config
import appConfig from '../config.json';
import ButtonSendMessage from '../src/components/ButtonSendMessage';
import Background from '../src/components/Background';
import PageContainer from '../src/components/PageContainer';

const SUPABASE_URL = 'https://iricuibhafwpxwjaiddj.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_API_KEY;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const listenRealTimeMessages = (addNewMessage) => {
  return supabaseClient
    .from('messages')
    .on('INSERT', (resp) => {
      addNewMessage(resp.new)
    })
    .subscribe();
};

export default function ChatPage() {
  const [newMessage, setNewMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const router = useRouter();
  const loggedUser = router.query.username;

  useEffect(() => {
    supabaseClient
      .from('messages')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setMessageHistory(data)
      });

    const subscription = listenRealTimeMessages((addNewMessage) => {
      setMessageHistory((prev) => {
        return [
          addNewMessage,
          ...prev
        ]
      });
    });

    return () => {
      subscription.unsubscribe();
    }

  }, []);

  const handleNewMessage = (newMessage, newSticker = null) => {
    if (newMessage === '') return;

    if (newSticker) {
      const sticker = {
        sticker: newSticker,
        from: loggedUser,
      }

      supabaseClient
        .from('messages')
        .insert([
          sticker
        ])
        .then(() => { });

      return
    }

    const message = {
      value: newMessage,
      from: loggedUser,
    };

    supabaseClient
      .from('messages')
      .insert([
        message
      ])
      .then(() => { })

    setNewMessage('');
  }

  return (
    <PageContainer>
      <Background />
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.pallet['color5'],
          height: '100%',
          width: 'min(95vw, 1200px)',
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
          <MessageList messages={messageHistory} loggedUser={loggedUser} />
          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MessageBox onKeyEnterPress={(newMessage) => handleNewMessage(newMessage)} newMessage={newMessage} setNewMessage={(newMessage) => setNewMessage(newMessage)} />
            <ButtonSendSticker onStickerClick={(newSticker) => handleNewMessage(null, newSticker)} />
            <ButtonSendMessage onButtonClick={(newMessage) => handleNewMessage(newMessage)} newMessage={newMessage} />
          </Box>

        </Box>
      </Box>
    </PageContainer>
  )
}