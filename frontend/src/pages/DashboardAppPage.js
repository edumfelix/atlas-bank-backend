import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Grid, Container, } from '@mui/material';

import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

import { useAuthContext } from '../hooks/useAuthContext';

export default function DashboardAppPage() {
  const navigate = useNavigate();
  const { logout, userData } = useAuthContext();

  return (
    <>
      <Helmet>
        <title> Home | ABK </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <AppWidgetSummary title="Saldo" total={`R$ ${userData.balance ?? 10000}`} color="info" icon={'mdi:cash'} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} sx={{cursor: "pointer"}} onClick={() => navigate('/dashboard/deposit')}>
            <AppWidgetSummary title="Realizar Depósito" icon={'mdi:instant-deposit'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6} sx={{cursor: "pointer"}} onClick={() => navigate('/dashboard/withdrawal')}>
            <AppWidgetSummary title="Realizar Saque" color="info" icon={'uil:money-withdrawal'} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} onClick={() => logout()} sx={{cursor: "pointer"}}>
            <AppWidgetSummary title="Sair" color="error" icon={'fluent:arrow-exit-20-filled'} />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
