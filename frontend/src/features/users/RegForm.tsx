import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { registration } from './usersThunk.ts';
import {isRegisterError, isRegisterUser} from './usersSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { Registration } from '../../types';


const RegForm = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadingRegisteredUser = useAppSelector(isRegisterUser);
  const errorRegisteredUser = useAppSelector(isRegisterError);

  const [registered, setRegistered] = useState<Registration>({
    username: '',
    password: '',
    name: '',
    phone: ''
  });

  const getfieldError = (fieldError: string) => {
    try {
      return errorRegisteredUser?.errors[fieldError].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setRegistered((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(registration(registered)).unwrap();

      setRegistered((prevState) => {
        return {
          ...prevState,
          username: '',
          password: '',
          name: '',
          phone: '',
        };
      });

      setTimeout(()=> {
        navigate('/');
      }, 1600);

    } catch (e) {
      //error
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <Box component="form" noValidate onSubmit={formSubmitHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter username"
                name="username"
                value={registered.username}
                onChange={inputChangeHandler}
                autoComplete="new-username"
                error={Boolean(getfieldError('username'))}
                helperText={getfieldError('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Enter password"
                type="password"
                value={registered.password}
                onChange={inputChangeHandler}
                autoComplete="new-password"
                error={Boolean(getfieldError('password'))}
                helperText={getfieldError('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Enter your original name"
                type="text"
                value={registered.name}
                onChange={inputChangeHandler}
                autoComplete="new-name"
                error={Boolean(getfieldError('name'))}
                helperText={getfieldError('name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phone"
                label="Enter your phone number"
                type="text"
                value={registered.phone}
                onChange={inputChangeHandler}
                autoComplete="new-phone"
                error={Boolean(getfieldError('phone'))}
                helperText={getfieldError('phone')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            {loadingRegisteredUser ? <CircularProgress /> : 'Register'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Log In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegForm;