import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNotify } from '../../contexts/NotifyContext';
import { USER_API, config } from '../../App';
import { ClusterDivider } from '../../components/customs/Profile';
import { _getItem, _setItem } from '../../contexts/UserAuth';
import { SelectLocaion } from '../../components/customs/EditProfile';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
  countries,
  states,
  cities,
} from '../../pages/editProfile/EditProfileData';
import { useProfile } from '../../states/user';
import { useState } from 'react';

export const UserName = ({ username }) => {
  const [opn, setOpn] = useState(false);
  const [value, setValue] = useState(username);
  const { setSnackbar, setRefresh } = useNotify();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${USER_API}/${username}/username`, {
        method: 'PATCH',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: value }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      _setItem('username', data.user.username);
      setRefresh(prev => !prev);
      setOpn(false);
      setSnackbar({
        open: true,
        severity: 'success',
        message: data.message,
      });
    } catch (error) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: error.message,
      });
    }
  };

  const handleClose = () => {
    setOpn(false);
    setValue(username);
  };

  return (
    <Stack direction={'row'} p={1}>
      <Typography width={'6rem'}>Username</Typography>
      <Stack
        display={opn ? 'none' : 'flex'}
        direction={'row'}
        justifyContent={'space-between'}
        width={'100%'}
        pl={3}
      >
        <Typography>{username}</Typography>
        <Box>
          <Button size="small" onClick={() => setOpn(true)}>
            Edit
          </Button>
        </Box>
      </Stack>
      <Stack display={opn ? 'flex' : 'none'} px={4} gap={0.8}>
        <TextField value={value} onChange={e => setValue(e.target.value)} />
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleSubmit(value)}
          >
            Save
          </Button>
          <Button variant="outlined" size="small" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const UserGender = ({ username, gender }) => {
  const [opn, setOpn] = useState(false);
  const [value, setValue] = useState(gender);
  const { setSnackbar, setRefresh } = useNotify();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${USER_API}/${username}/gender`, {
        method: 'PATCH',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gender: value }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      _setItem('username', data.user.username);
      setRefresh(prev => !prev);
      setOpn(false);
      setSnackbar({
        open: true,
        severity: 'success',
        message: data.message,
      });
    } catch (error) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: error.message,
      });
    }
  };

  const handleClose = () => {
    setOpn(false);
  };

  return (
    <Stack direction={'row'} p={1}>
      <Typography width={'6rem'}>Gender</Typography>
      <Stack
        display={opn ? 'none' : 'flex'}
        direction={'row'}
        justifyContent={'space-between'}
        width={'100%'}
        pl={3}
      >
        <Typography>{gender}</Typography>
        <Box>
          <Button size="small" onClick={() => setOpn(true)}>
            Edit
          </Button>
        </Box>
      </Stack>
      <Stack display={opn ? 'flex' : 'none'} px={4} gap={0.8}>
        <TextField
          id="gender"
          select
          label="Select"
          defaultValue={gender ? gender : ''}
          value={value}
          onChange={e => setValue(e.target.value)}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </TextField>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleSubmit(value)}
          >
            Save
          </Button>
          <Button variant="outlined" size="small" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const UserBirthday = ({ username, birthday }) => {
  const [opn, setOpn] = useState(false);
  const [value, setValue] = useState(dayjs(birthday));
  const { setSnackbar, setRefresh } = useNotify();

  const formatDate = val => {
    if (!val) return '';
    const [_year, _month, _date, ...rest] = val.split(/[T-]/);
    return `${_date}/${_month}/${_year}`;
  };

  const formattedDate = formatDate(birthday);

  const handleSubmit = async () => {
    console.log(value);
    try {
      const response = await fetch(`${USER_API}/${username}/birthday`, {
        ...config,
        method: 'PATCH',
        body: JSON.stringify({ birthday: value }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      // _setItem('username', data.user.username);
      setRefresh(prev => !prev);
      setOpn(false);
      setSnackbar({
        open: true,
        severity: 'success',
        message: data.message,
      });
    } catch (error) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: error.message,
      });
    }
  };

  const handleClose = () => {
    setOpn(false);
  };

  return (
    <Stack direction={'row'} p={1}>
      <Typography width={'6rem'}>Birthday</Typography>
      <Stack
        display={opn ? 'none' : 'flex'}
        direction={'row'}
        justifyContent={'space-between'}
        width={'100%'}
        pl={3}
      >
        <Typography>{formattedDate}</Typography>
        <Box>
          <Button size="small" onClick={() => setOpn(true)}>
            Edit
          </Button>
        </Box>
      </Stack>
      <Stack display={opn ? 'flex' : 'none'} px={4} gap={0.8}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['Datepicker']}>
            <DatePicker
              label={'DD/MM/YYYY'}
              format="DD/MM/YYYY"
              defaultValue={dayjs(birthday)}
              value={value}
              onChange={newVal => setValue(newVal)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleSubmit(value)}
          >
            Save
          </Button>
          <Button variant="outlined" size="small" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const UserLocation = ({ username, location }) => {
  const [opn, setOpn] = useState(false);
  const [country, setCountry] = useState(location.country);
  const [state, setState] = useState(location.state);
  const [city, setCity] = useState(location.city);
  const { setSnackbar, setRefresh } = useNotify();

  const formatLocation = loc => {
    const { country, state, city } = loc;
    let newLocation = `${country} ${state} ${city}`;
    newLocation.trim();
    return newLocation;
  };

  const formattedLocation = formatLocation(location);

  const handleSubmit = async () => {
    const value = { country, state, city };
    try {
      const response = await fetch(`${USER_API}/${username}/location`, {
        ...config,
        method: 'PATCH',
        body: JSON.stringify({ location: value }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      setRefresh(prev => !prev);
      setOpn(false);
      setSnackbar({
        open: true,
        severity: 'success',
        message: data.message,
      });
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: error.message,
      });
    }
  };

  return (
    <Stack direction={'row'} p={1}>
      <Typography width={'6rem'}>Location</Typography>
      <Stack
        display={opn ? 'none' : 'flex'}
        direction={'row'}
        justifyContent={'space-between'}
        width={'100%'}
        pl={3}
      >
        <Typography>{formattedLocation}</Typography>
        <Box>
          <Button size="small" onClick={() => setOpn(true)}>
            Edit
          </Button>
        </Box>
      </Stack>
      <Stack display={opn ? 'flex' : 'none'} px={4} gap={0.8}>
        <Stack direction={'row'} gap={1}>
          <SelectLocaion
            type={'country'}
            value={country}
            setValue={setCountry}
            options={countries}
          />
          <SelectLocaion
            type={'state'}
            value={state}
            setValue={setState}
            options={country ? states[country] : []}
          />
          <SelectLocaion
            type={'city'}
            value={city}
            setValue={setCity}
            options={state ? cities[state] : []}
          />
        </Stack>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button variant="contained" size="small" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" size="small" onClick={() => setOpn(false)}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const EditProfileBox = () => {
  const username = _getItem('username');
  const { user } = useProfile();

  return (
    <>
      <UserName username={username} />
      <ClusterDivider />
      <UserGender username={username} gender={user.gender} />
      <ClusterDivider />
      <UserBirthday username={username} birthday={user.birthday} />
      <ClusterDivider />
      <UserLocation username={username} location={user.location} />
    </>
  );
};
