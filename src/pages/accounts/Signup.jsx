import { Avatar, Box, colors, Link, Stack, Typography } from '@mui/material';
import { AccountPaper, AccountField } from '../../components/customs/accounts';
import { AppbarHeader } from '../../components/customs/Appbar';
import { useNotify } from '../../contexts/NotifyContext';
import NotifyUser from '../../components/ui/NotifyUser';
import { SubmitBtn } from '../../components/ui/UiBtns';
import { Navigate } from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import logo from '../../assets/images/Logo.png';
import { verifyUser } from '../../contexts/UserAuth';
import { config, USER_API } from '../../App';
import { useProfile } from '../../states/user';
import { Helmet } from 'react-helmet-async';

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmpassword: '',
};

const validationSchema = yup.object({
  username: yup.string().required('Required'),
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup
    .string()
    .min(8, 'Password must be atleast 8 chararters long')
    .max(16, `Password can't exceed 16 characters`)
    .required('Required'),
  confirmpassword: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('password'), null], 'Confirm password must match password'),
});

const Signup = () => {
  const { user, setUser } = useProfile();
  const { setSnackbar } = useNotify();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      const response = await fetch(`${USER_API}/new`, {
        ...config,
        method: 'POST',
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!data.success) throw new Error(data.message);
      setSubmitting(false);
      resetForm();
      setSnackbar({
        open: true,
        severity: 'success',
        message: data.message,
      });
      setUser(data.user);
    } catch (error) {
      setSubmitting(false);
      setSnackbar({
        open: true,
        severity: 'error',
        message: error.message,
      });
    }
  };

  if (verifyUser()) {
    return <Navigate to={`/${user?.username}`} />;
  }

  return (
    <Box>
      <Helmet>
        <title>QuestSite | login</title>
      </Helmet>
      <Navbar />
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: colors.blueGrey[50],
        }}
      >
        <AccountPaper>
          <Stack sx={{ alignItems: 'center' }}>
            <Avatar variant="rounded" alt="Logo" src={logo} />
            <AppbarHeader>QuestSite</AppbarHeader>
          </Stack>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, touched, errors, getFieldProps }) => (
              <Form>
                <Stack sx={{ rowGap: 2 }}>
                  <AccountField
                    field={'Username'}
                    fieldProps={getFieldProps('username')}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <AccountField
                    field={'Email'}
                    fieldProps={getFieldProps('email')}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <AccountField
                    field={'Password'}
                    fieldProps={getFieldProps('password')}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <AccountField
                    field={'Confirm password'}
                    fieldProps={getFieldProps('confirmpassword')}
                    error={
                      touched.confirmpassword && Boolean(errors.confirmpassword)
                    }
                    helperText={
                      touched.confirmpassword && errors.confirmpassword
                    }
                  />
                  <SubmitBtn isSubmitting={isSubmitting} />
                </Stack>
              </Form>
            )}
          </Formik>
          {/* Notifies the user if registered successfully or there is error  */}
          <NotifyUser />
          <Stack direction={'row'} justifyContent={'space-between'} mt={1.4}>
            <Typography
              sx={{ letterSpacing: 0.5, '&:hover': { cursor: 'pointer' } }}
            >
              {/* Link to be added for forgot password page!!! */}
              <Link sx={{ color: colors.indigo[800], textDecoration: 'none' }}>
                Forgot Password?
              </Link>
            </Typography>
            <Typography
              sx={{ letterSpacing: 0.5, '&:hover': { cursor: 'pointer' } }}
            >
              <Link
                href="/accounts/login"
                sx={{ color: colors.indigo[800], textDecoration: 'none' }}
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </AccountPaper>
      </Box>
    </Box>
  );
};

export default Signup;
