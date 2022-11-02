import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import React from 'react';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import NextLink from 'next/link';

const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Create user
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Full name" variant="filled" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label="email" type="email" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={12}>
            <NextLink href="/auth/login" passHref>
              <Link underline="always">Already have an account?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
