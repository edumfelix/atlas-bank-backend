import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Helmet } from 'react-helmet-async';

import { Box, Container, Accordion, AccordionSummary, AccordionDetails, Divider, Grid, TextField, MenuItem, Typography, Button } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Logo from '../components/logo';

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

const InputSelect = ({ formik, name, label, options, ...other }) => (
  <TextField
    fullWidth
    select
    label={label}
    value={formik.values[name]}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
    margin="normal"
    variant="outlined"
    {...other}
  >
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

export default function RegisterUserPage() {
  const { registerUser } = useAuthContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      username: '',
      cpf: '',
      gender: '',
      birthDate: '',

      email: '',
      phone: '',
      cep: '',
      password: '',
      // confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      first_name: yup.string().required('Primeiro nome é obrigatório'),
      last_name: yup.string().required('Último nome é obrigatório'),
      username: yup.string().required('Nome de usuário é obrigatório'),
      cpf: yup.string().min(11, 'Cpf inválido').required('CPF é obrigatório'),
      gender: yup.string().required('Gênero é obrigatório'),
      birthDate: yup.string().required('Data de nascimento é obrigatória'),

      email: yup.string().email('Email inválido').required('Email é obrigatório'),
      phone: yup.string().min(11, 'Telefone inválido').required('Telefone é obrigatório'),
      cep: yup.string().min(8, 'CEP inválido').required('CEP é obrigatório'),
      password: yup.string().required('Senha é obrigatória'),
      // confirmPassword: yup.string().required('Confirmação de senha é obrigatória'),
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      const valuesToPost = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        cpf: values.cpf,
        gender: values.gender.toLowerCase() === "masculino" ? "M" : "F",
        birth_date: values.birthDate.split('T')[0],
        email: values.email,
        phone: values.phone,
        cep: values.cep,
        password: values.password,
      }
      try {
        const response = await registerUser(valuesToPost);
        if (response.status !== 201) {
          return;
        }
        setStatus({ success: true });
        setSubmitting(false);
        navigate('/login', { replace: true });
      } catch (err) {
        console.error(err);
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
  }
  });

  return (
    <>
      <Helmet>
        <title> Cadastrar Usuário | ABK </title>
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
              sx={{ mt: 2, color: "#6D5E89" }}
            >
              Criar nova conta
            </Typography>
            <Typography
              component="h2"
              variant="h5"
              sx={{ mb: 4, color: "#6D5E89" }}
            >
              Crie uma nova conta para acessar nossa aplicação!
            </Typography>

          </Box>
          <form onSubmit={formik.handleSubmit}>
          <Accordion
            // expanded={expanded}
            // onChange={onChange}
            sx={{
              // display: visible ? "block" : "none",
              // backgroundColor: expanded ? "#FFF5ED" : "#EFEFEF",
              backgroundColor: "#EFEFEF",
              mb: 3,
              borderRadius: "10px !important",
              boxShadow: "none",
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="personal-content"
              id="personal-header"
            >
              <Typography color={"#6D5E89"} variant="h4">
                Dados Pessoais
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ mb: 1, borderBottomWidth: 2 }} color="#DC833C" />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <InputField
                    formik={formik}
                    id="first_name"
                    name="first_name"
                    label="Primeiro Nome"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <InputField
                    formik={formik}
                    id="last_name"
                    name="last_name"
                    label="Último Nome"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <InputField
                    formik={formik}
                    id="username"
                    name="username"
                    label="Nome de Usuário"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <InputField
                    formik={formik}
                    id="cpf"
                    name="cpf"
                    label="CPF"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  {/* <InputSelect
                    formik={formik}
                    id="gender"
                    name="gender"
                    label="Gênero"
                    options={[
                      { value: "", label: "Selecione" },
                      { value: "Masculino", label: "Masculino" },
                      { value: "Feminino", label: "Feminino" },
                      { value: "Outro", label: "Outro" },
                    ]}
                  /> */}
                  <InputField
                    formik={formik}
                    id="gender"
                    name="gender"
                    label="Gênero"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <InputField
                    formik={formik}
                    id="birthDate"
                    name="birthDate"
                    label="Data de Nascimento"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
            
          <Accordion
            // expanded={expanded}
            // onChange={onChange}
            sx={{
              // display: visible ? "block" : "none",
              // backgroundColor: expanded ? "#FFF5ED" : "#EFEFEF",
              backgroundColor: "#EFEFEF",
              mb: 2.5,
              borderRadius: "10px !important",
              boxShadow: "none",
              '&:before': {
                display: 'none',
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="personal-content"
              id="personal-header"
            >
              <Typography color={"#6D5E89"} variant="h4">
                Dados de Contato
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ mb: 1, borderBottomWidth: 2 }} color="#DC833C" />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <InputField
                    formik={formik}
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputField
                    formik={formik}
                    id="phone"
                    name="phone"
                    label="Telefone"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputField
                    formik={formik}
                    id="cep"
                    name="cep"
                    label="CEP"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputField
                    formik={formik}
                    id="password"
                    name="password"
                    label="Senha"
                    type="password"
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6} md={4}>
                  <InputField
                    formik={formik}
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirmar Senha"
                    type="password"
                  />
                </Grid> */}
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
              gap: 2,
            }}
          >
            <Button
              color="error"
              variant="contained"
              onClick={() => formik.resetForm()}
            >
              Cancelar
            </Button>
            <Button
              color="success"
              variant="contained"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Cadastrar
            </Button>
          </Box>
          </form>
          
        </Container>
      </Box>
    </>
  );
}