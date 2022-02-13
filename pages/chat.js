import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//Supabase
import { createClient } from '@supabase/supabase-js';
//SkynexUI
import { Box, Image } from '@skynexui/components';
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
import { Main } from 'next/document';
import MessageChannels from '../src/components/MessageChannels';

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
  const [channel, setChannel] = useState(2);
  const [channelList, setChannelList] = useState([]);
  const router = useRouter();
  const loggedUser = router.query.username;


  // <CHANNELS>
  const handleChannelClick = (channelId) => {
    setChannel(channelId);
  }
  const handleAddChannel = (newName) => {
    const newChannel = {
      name: newName,
    }
    supabaseClient
      .from('channels')
      .insert(
        [newChannel]
      )
      .then((res) => {
        setChannelList((prev) => {
          return [
            ...prev,
            res.data[0],
          ]
        })
      })
  };

  useEffect(() => {
    supabaseClient
      .from('channels')
      .select('*')
      .then(({ data }) => {
        setChannelList(data)
      })
  }, [])

  // <CHANNELS />

  useEffect(() => {
    supabaseClient
      .from('messages')
      .select('*')
      .eq('channel_id', channel)
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

  }, [channel]);

  const handleNewMessage = (newMessage, newSticker = null) => {
    if (newMessage === '') return;

    if (newSticker) {
      const sticker = {
        sticker: newSticker,
        from: loggedUser,
        channel_id: channel,
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
      channel_id: channel,
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
          height: '95vh',
          boxShadow: '0 0 10px 0 rgb(0 0 0 / 20%)',
        }}>

        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '0 5px 5px 0',
            backgroundColor: appConfig.theme.colors.pallet['color5'],
            width: 'min(95vw, 1200px)',
            padding: '2rem',
            paddingLeft: '0',
          }}
        >
          <Header />
          <Box styleSheet={{
            display: 'flex',
            height: '95%',
          }}>
            <MessageChannels setChannel={(x) => handleChannelClick(x)} addChannel={(name) => handleAddChannel(name)} channelList={channelList} />
            <Box
              styleSheet={{
                position: 'relative',
                display: 'flex',
                flex: 1,
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
        </Box>
      </Box>
    </PageContainer >
  )
}