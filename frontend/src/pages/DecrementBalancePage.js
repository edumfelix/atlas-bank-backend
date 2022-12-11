import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import { Box, Typography, Button, InputAdornment, Container, Grid, TextField } from '@mui/material';

import Logo from '../components/logo';
import Iconify from '../components/iconify';

import { useAuthContext } from '../hooks/useAuthContext';

const InputField = ({ formik, name, label, type = "text", ...other }) => (
  <TextField
    fullWidth
    type={type}
    label={label}
    value={formik.values[name]}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
    margin="normal"
    variant="outlined"
    {...other}
  />
);

export default function IncrementBalancePage() {
  const navigate = useNavigate();
  const { modifyBalance, userData, getUserData } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema: Yup.object().shape({
      amount: Yup.string().required('Valor é obrigatório'),
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      const amountNumber = parseFloat(values.amount);
      const balanceNumber = parseFloat(userData.balance);

      if (amountNumber > balanceNumber) {
        setStatus({ success: false });
        setErrors({ submit: 'Saldo insuficiente' });
        setSubmitting(false);
        return Swal.fire({
          title: 'Erro!',
          text: "Saldo insuficiente",
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      };

      try {
        const response = await modifyBalance({ balance: parseFloat(balanceNumber - amountNumber).toFixed(2) });
        if (response.status !== 200) {
          return;
        }
        getUserData();
        setStatus({ success: true });
        setSubmitting(false);
        navigate('/dashboard/app', { replace: true });
      } catch (err) {
        console.error(err);
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title> Saque | ABK </title>
      </Helmet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Logo
              disabledLink
              sx={{ width: 120, height: 120, display: 'flex' }}
            />
            <Typography
              component="h1"
              variant="h3"
              sx={{ mt: 2, mb: 4, color: "#6D5E89" }}
            >
              Saque da sua conta!
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3} sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

            }}>
              <Grid item xs={12} md={8} sm={8}>
                <InputField
                  formik={formik}
                  id="amount"
                  name="amount"
                  label="Valor"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="bx:bx-dollar" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
                gap: 2,
                width: "98%",
              }}
            >
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  formik.resetForm();
                  navigate('/dashboard/app', { replace: true }); 
                }}
              >
                Cancelar
              </Button>
              <Button
                color="success"
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Sacar
              </Button>
            </Box>
          </form>
          
        </Container>
      </Box>
    </>
  );
}