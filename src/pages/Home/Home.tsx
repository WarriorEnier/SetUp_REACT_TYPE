import React from 'react';
import { useCustomSelector, useCustomDispatch } from '../../hooks/redux';
import { login } from '../../redux/slices/auth';
import { Button, Switch, Typography, CircularProgress } from '@mui/material';
import { setThemeMode } from '../../redux/slices/settings';
import {
  AppBarStyled,
  AppBarContainerStyled,
  BodyContainerStyled,
  CardStyled
} from './HomeStyles';

const Home: React.FC = () => {
  const {
    auth: { accessToken, isLoading },
    settings: { themeMode }
  } = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();
  console.log(accessToken);

  const handleLogin = (): void => {
    dispatch(
      login({
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      })
    );
  };

  const handleChangeTheme = (): void => {
    dispatch(setThemeMode(themeMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div>
      <AppBarStyled>
        <AppBarContainerStyled>
          <Typography variant="h6">TS-REACT</Typography>
          <Switch onChange={handleChangeTheme} />
        </AppBarContainerStyled>
      </AppBarStyled>
      <BodyContainerStyled>
        <CardStyled>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          {isLoading && <CircularProgress size={24} />}
        </CardStyled>
      </BodyContainerStyled>
    </div>
  );
};

export default Home;
