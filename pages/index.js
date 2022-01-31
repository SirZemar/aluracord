import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

const Title = ({ tag, children }) => {
  const Tag = tag || 'h1';
  return (
    <>
      <Tag>{children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.pallet['color3']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

const HomePage = () => {
  const [username, setUsername] = React.useState('SirZemar');
  const roteamento = useRouter();

  return (
    <>
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
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.pallet['color1'],
            border: '3px solid', borderColor: appConfig.theme.colors.pallet['color5']
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              roteamento.push(`/chat?username=${username}`);
              // window.location.href = '/chat';
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">
              Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.pallet['color5'] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={event => {
                console.log('usuario digitou', event.target.value);
                const valor = event.target.value;
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.pallet['color3'],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.pallet["color5"],
                mainColor: appConfig.theme.colors.pallet['color4'],
                mainColorLight: appConfig.theme.colors.pallet['color1'],
                mainColorStrong: appConfig.theme.colors.pallet['color2'],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.pallet['color5'],
              border: '1px solid',
              borderColor: appConfig.theme.colors.pallet['color3'],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[700],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

export default HomePage;