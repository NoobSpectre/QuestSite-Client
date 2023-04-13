import { Delete, PhotoCamera } from '@mui/icons-material';
import {
  Autocomplete,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  colors,
  useMediaQuery,
} from '@mui/material';
import { useNotify } from '../../contexts/NotifyContext';
import { USER_API } from '../../App';
import { HiExternalLink } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { _getItem, _setItem } from '../../contexts/UserAuth';

const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];

export const UploadBtn = () => {
  const { setSnackbar, setRefresh } = useNotify();
  const username = _getItem('username');

  const uploadAvatar = async form => {
    try {
      const response = await fetch(`${USER_API}/${username}/avatar`, {
        withCredentials: true,
        credentials: 'include',
        method: 'PATCH',
        body: form,
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      setRefresh(prev => !prev);
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

  const handleChange = e => {
    const avatar = e.target.files[0];
    if (!validImageTypes.find(type => type === avatar.type)) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Image format not allowed!',
      });
      return;
    }

    const form = new FormData();
    form.append('avatar', avatar);

    uploadAvatar(form);
  };

  return (
    <Tooltip title="Upload" placement="right" arrow>
      <Paper sx={{ backgroundColor: colors.grey[700] }}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          size="small"
          disableRipple
          disableFocusRipple
          disableTouchRipple
        >
          <input hidden type="file" id="image-upload" onChange={handleChange} />
          <PhotoCamera htmlColor={colors.grey[200]} />
        </IconButton>
      </Paper>
    </Tooltip>
  );
};

export const DeleteBtn = () => {
  const { setSnackbar, setRefresh } = useNotify();
  const username = _getItem('username');

  const deleteAvatar = async () => {
    try {
      const response = await fetch(`${USER_API}/${username}/avatar`, {
        withCredentials: true,
        credentials: 'include',
        method: 'DELETE',
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      setRefresh(prev => !prev);
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

  return (
    <Tooltip title="Delete" placement="right" arrow>
      <Paper sx={{ backgroundColor: colors.grey[700] }}>
        <IconButton
          color="primary"
          aria-label="delete picture"
          size="small"
          onClick={() => deleteAvatar()}
          disableRipple
          disableFocusRipple
          disableTouchRipple
        >
          <Delete htmlColor={colors.grey[200]} />
        </IconButton>
      </Paper>
    </Tooltip>
  );
};

export const UserAvatarData = () => {
  const username = _getItem('username');
  const navigate = useNavigate();
  const { refresh } = useNotify();

  return (
    <Stack direction={'row'} alignItems={'center'} px={1} py={0.2}>
      <Typography color={'#ccc'} fontWeight={'bold'}>
        {username}
      </Typography>
      <IconButton
        size="small"
        onClick={() => navigate(`/${username}`)}
        sx={{
          color: '#3a6df0',
          '&:hover, &:focus': { color: '#225af0' },
        }}
      >
        <HiExternalLink />
      </IconButton>
    </Stack>
  );
};

export const SelectLocaion = ({ type, value, setValue, options }) => {
  const isSmallScreen = useMediaQuery('(max-width: 1024px)');

  const handleChange = newValue => {
    if (!newValue) setValue('');
    else setValue(newValue.label);
  };

  return (
    <Autocomplete
      isOptionEqualToValue={(option, val) => option.value === val.value}
      id={`${type}-select`}
      value={value}
      onChange={(e, newValue) => handleChange(newValue)}
      options={options}
      sx={{ width: isSmallScreen ? '7.5rem' : '9rem' }}
      renderInput={params => <TextField {...params} label={type} />}
    />
  );
};
