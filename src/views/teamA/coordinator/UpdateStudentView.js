import React,{useState} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Borders,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Card, 
  CardContent,
  makeStyles,
  Divider
} from '@material-ui/core';
import Page from 'src/components/Page';
import {UpdateStudent} from './service';
import { SearchInstitution } from 'src/views/teamd/Search/searchInstitution';
import { SearchCity } from 'src/views/teamd/Search/searchCity';
import { SearchCountry } from 'src/views/teamd/Search/searchCountry';
import { SearchDeparmentI } from 'src/views/teamd/Search/searchDepartmentI';


const typeDedications = [
  {
    value: 'exclusive',
    label: 'Exclusiva'
  },
  {
    value: 'partTime',
    label: 'Tiempo parcial'
  },
];
const states = [
  {
    value: 'active',
    label: 'Activo'
  },
  {
    value: 'inactive',
    label: 'Inactivo'
  },
  {
    value: 'retired',
    label: 'Retirado'
  },
  {
    value: 'graduade',
    label: 'Graduado'
  },
  {
    value: 'balanced',
    label: 'Balanceado'
  },
];
const academicHelp = [
  {
    value: 'scholarship',
    label: 'Beca'
  },
  {
    value: 'Agreement',
    label: 'Convenio'
  },
  {
    value: 'none',
    label: 'Ninguno'
  },
  
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBlockEnd: theme.spacing(3)
  },
  BtmCreate:{
    paddingTop: 4,
        paddingBottom: 2,
        height: 90,
  },
  dividerFullWidth: {
    margin: `10px 0 0 ${theme.spacing(1)}px`,
  }
}));


const UpdateStudentView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [identification, setIdentification]  = useState('');
  const [code, setCode]  = useState('');
  const [names, setNames]  = useState('');
  const [lastNames, setLastNames]  = useState('');
  const [email, setEmail]  = useState('');
  const [program, setProgram]  = useState('');
  const [admissionDate, setAdmissionDate]  = useState('');
  const [enrollmentDate, setEnrollmentDate]  = useState('');
  const [phone, setPhone]  = useState('');
  const [address, setAddress]  = useState('');
  const [dedicationType, setDedicationType]  = useState('');
  const [stateStudent, setStateSudent]  = useState('');
  const [scholarshipAgreement, setScholarshipAgreement]  = useState('');
  const [director, setDirector]  = useState('');
  const [coDirectors, setCoDirectors]  = useState('');
  const [investigationGroup, setInvestigationGroup]  = useState('');
  const [institution, setInstitution] = useState('');
  const [cityI, setCityI] = useState('');
  const [countryI, setCountryI] = useState('')
  const [city, setCity] = useState('');
  const [department, setDeparment] = useState('')

  const handleChangeIdentification = (e) =>{
      setIdentification(e.target.value)
  }
  const handleChangeCode = (e) =>{
    setCode(e.target.value)
  }
  const handleChangeNames = (e) =>{
    setNames(e.target.value)
  }
  const handleChangeLastNames = (e) =>{
    setLastNames(e.target.value)
  }
  const handleChangeEmail = (e) =>{
    setEmail(e.target.value)
  }
  const handleChangeProgram = (e) =>{
    setProgram(e.target.value)
  }
  const handleChangeAdmissionDate = (e) =>{
    setAdmissionDate(e.target.value)
    console.log(e.value)
  }
  const handleChangeEnrollmentDate = (e) =>{
    setEnrollmentDate(e.target.value)
  }
  const handleChangePhone =(e) =>{
    setPhone(e.target.value)
  }
  const handleChangeAddress = (e)=>{
    setAddress(e.target.value)
  }
  const handleChangeDedicationType = (e)=>{
    setDedicationType(e.target.value)
  }
  const handleChangeStateStudent=(e) =>{
    setStateSudent(e.target.value)
  }
  const handleChangeScholarshipAgreement = (e) =>{
    setScholarshipAgreement(e.target.value)
  }
  const handleChangeDirector=(e)=>{
    setDirector(e.target.value)
  }
  const handleChangeCoDirectors = (e) =>{
    setCoDirectors(e.target.value)
  }
  const handleChangeInvestigationGroup = (e)=>{
    setInvestigationGroup(e.target.value)
  }
  const handleChangeInstitution = (result) =>{
    setInstitution(result)
  }
  const handleChangeCityI = (result) =>{
    setCityI(result)
  }
  const handleChangeCountryI = (result) =>{
    setCountryI(result)
  }
  const handleChangeCity = (result) =>{
    setCity(result)
  }
  const handleChangeDepartament = (result) =>{
    setDeparment(result)
  }
  const handleSubmitUpdate = (e) =>{
      UpdateStudent({
        'identificacion': identification,
        'codigo' : code,
        'nombres' : names,
        'apellidos' : lastNames,
        'email' : email,
        'programa' : program,
        'admissionDate' : admissionDate,
        'fechaMatricula' : enrollmentDate,
        'telefono' : phone,
        'direccion' : address, 
        'tipoDedicacion' : dedicationType,
        'estadoEstudiante' : stateStudent,
        'ayuda' : scholarshipAgreement,
        'director' : director,
        'codirector' : coDirectors,
        'grupoInvestigacion' : investigationGroup,
        'institucion' : institution,
        'ciudadInstitucion' : cityI,
        'paisInstitucion' : countryI,
        'ciudad' : city,
        'departamento' : department



      }).then(result => {alert('Se actualizo correctamente el estudiante')}).catch( () => alert('No se actualizo correctamente el estudiante'))

  }
  return (
    <Page
      className={classes.root}
      title="Actualizar estudiante"
    >
      <Box
        display="flex"
        flexDirection="column"
        
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Formik
            initialValues={{
                identification: '',
                code: '',
                names: '',
                lastnames: '',
                email: '',
                program: '',
                admissionDate: '',
                enrollmentDate: '',
                phone: '',
                address: '',
                dedicationType: '',
                stateStudent: '',
                scholarshipAgreement: '',
                director: '',
                coDirectors: '',
                investigationGroup:'',
            }}
            validationSchema={
              Yup.object().shape({
                //identification: Yup.string().required('Debe ingresar un código'),
                //code: Yup.string().required('Debe ingresar un código'),
               // names: Yup.string().required('Debe ingresar nombres'),
                //lastnames: Yup.string().required('Debe ingresar apellidos'),
                //email: Yup.string().email('Debe ingresar un email válido').max(255).required('Debe ingresar un email'),
                //program: Yup.string().required('Debe ingresar el programa'),
                //admissionDate: Yup.date().required('Debe ingresar una fecha de admisión'),
                //enrollmentDate: Yup.date().required('Debe ingresar una fecha de matrícula'),
                //phone: Yup.number().required('Debe ingresar un teléfono').min(6, 'Ingrese un teléfonoc on mínimo 6 caracteres'),
                address: Yup.string().required('Debe ingresar una dirección'),
                dedicationType: Yup.string().required('Debe seleccionar el tipo de dedicación'),
                studentState: Yup.string().required('Debe seleccionar el estado del estudiante'),
                //scholarshipAgreement: Yup.string().required('Debe seleccionar si tiene una beca o convenio'),
                director: Yup.string().required('Debe ingresar un director'),
                //coDirectors: Yup.string().required('Debe ingresar un codirector'),
                //investigationGroup: Yup.string().required('Debe ingresar un grupo de investigación'),
              })
            }
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <Card className = {classes.UpdateStudentView}>
                  <CardContent>
                      <form onSubmit={handleSubmitUpdate}>
                        <Box mb={3}>
                          <Typography
                            color="textPrimary"
                            variant="h2"
                          >
                            Actualizar estudiante
                          </Typography>
                          <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                          >
                            Los campos con * son obligatorios
                          </Typography>
                        </Box>
                        {/* <TextField
                            error={Boolean(touched.identification && errors.identification)}
                            fullWidth
                            helperText={touched.identification && errors.identification}
                            label="Cedula"
                            margin="normal"
                            name="identification"
                            onBlur={handleBlur}
                            onChange={handleChangeIdentification}
                            type="text"
                            value={values.identification}
                            variant="outlined"
                        /> */}
                       
                       <Divider />
                        
                        <Typography
                          className={classes.dividerFullWidth}
                          color="textSecondary"
                          display="block"
                          variant="caption"
                        >
                          Informacion basica
                        </Typography>
                        <Grid
                          container
                          spacing={2}
                        >
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <TextField
                              error={Boolean(touched.identification && errors.identification)}
                              fullWidth
                              helperText={touched.identification && errors.identification}
                              disabled
                              label="Identificación"
                              margin="normal"
                              name="identification"
                              required
                              onBlur={handleBlur}
                              onChange={(e) => {handleChangeIdentification(e); handleChange(e)}}
                              
                              type='number'
                              value={values.identification}
                              variant="outlined"
                            /> 
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <TextField
                              error={Boolean(touched.code && errors.code)}
                              fullWidth
                              helperText={touched.code && errors.code}
                              disabled
                              label="Código"
                              margin="normal"
                              name="code"
                              required
                              onBlur={handleBlur}
                              onChange={(e) => {handleChangeCode(e); handleChange(e)}}
                              type='number'
                              value={values.code}
                              variant="outlined"
                            />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <TextField
                              error={Boolean(touched.names && errors.names)}
                              fullWidth
                              helperText={touched.names && errors.names}
                              disabled
                              label="Nombres"
                              margin="normal"
                              name="names"
                              required
                              onBlur={handleBlur}
                              onChange={(e) => {handleChangeNames(e); handleChange(e)}}
                              value={values.names}
                              variant="outlined"
                            />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <TextField
                              error={Boolean(touched.lastnames && errors.lastnames)}
                              fullWidth
                              helperText={touched.lastnames && errors.lastnames}
                              disabled
                              label="Apellidos"
                              margin="normal"
                              name="lastnames"
                              required
                              onBlur={handleBlur}
                              onChange={(e) => {handleChangeLastNames(e); handleChange(e)}}
                              value={values.lastnames}
                              variant="outlined"
                            />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                               <TextField
                                error={Boolean(touched.phone && errors.phone)}
                                fullWidth
                                helperText={touched.phone && errors.phone}
                                label="Teléfono"
                                margin="normal"
                                name="phone"
                                onBlur={handleBlur}
                                onChange={(e) => {handleChangePhone(e); handleChange(e)}}
                                type='number'
                                value={values.phone}
                                variant="outlined"
                              />

                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <TextField
                                error={Boolean(touched.address && errors.address)}
                                fullWidth
                                helperText={touched.address && errors.address}
                                label="Dirección"
                                margin="normal"
                                name="address"
                                required
                                onBlur={handleBlur}
                                onChange={(e) => {handleChangeAddress(e); handleChange(e)}}
                                value={values.address}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <SearchCity callback={handleChangeCity}/>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <SearchDeparmentI callback={handleChangeDepartament}/>
                            </Grid>
                            
                            <Grid
                              item
                              md={12}
                              xs={12}
                            >
                              <TextField
                              error={Boolean(touched.email && errors.email)}
                              fullWidth
                              helperText={touched.email && errors.email}
                              disabled
                              label="E-mail"
                              margin="normal"
                              name="email"
                              required
                              onBlur={handleBlur}
                              onChange={(e) => {handleChangeEmail(e); handleChange(e)}}
                              type="email"
                              value={values.email}
                              variant="outlined"
                            />
                            </Grid>
                          </Grid>
                          <Divider />
                        
                          <Typography
                            className={classes.dividerFullWidth}
                            color="textSecondary"
                            display="block"
                            variant="caption"
                          >
                            Información Institución
                          </Typography>
                      
                          <Grid
                            container
                            spacing={2}
                          >
                            <Grid
                              item
                              md={6}
                              xs={12}
                            > 
                              <TextField
                                error={Boolean(touched.name && errors.name)}
                                fullWidth
                                helperText={touched.name && errors.name}
                                label="Título académico"
                                name="name"
                                margin="normal"
                                onBlur={handleBlur}
                                onChange={ (e) => {handleChange(e); handleChangeNames(e)}}
                                type="text"
                                value={values.name}
                                variant="outlined"
                                required
                              />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            > 
                            <SearchInstitution callback = {handleChangeInstitution}/>
                            
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <SearchCity callback ={handleChangeCityI}/>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <SearchCountry callback={handleChangeCountryI}/>
                            </Grid>
                          </Grid>

                          <Divider />
                        
                          <Typography
                            className={classes.dividerFullWidth}
                            color="textSecondary"
                            display="block"
                            variant="caption"
                          >
                            Informacion matricula
                          </Typography>
                      
                          <Grid
                            container
                            spacing={2}
                          >
                            <Grid
                              item
                              md={12}
                              xs={12}
                            >
                              <TextField
                                error={Boolean(touched.program && errors.program)}
                                fullWidth
                                helperText={touched.program && errors.program}
                                disabled
                                label="Programa"
                                margin="normal"
                                name="program"
                                required
                                type='search'
                                onBlur={handleBlur}
                                onChange={(e) => {handleChangeProgram(e); handleChange(e)}}
                                value={values.program}
                                variant="outlined"
                              />

                            </Grid>
                            
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <TextField
                                error={Boolean(touched.admissionDate && errors.admissionDate)}
                                fullWidth
                                helperText={touched.admissionDate && errors.admissionDate}
                                disabled
                                id="date"
                                label="Fecha de adimisión"
                                margin='normal'
                                name='admissionDate'
                                type="date"
                                required
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onBlur={handleBlur}
                                onChangeCapture={(e) => {handleChangeAdmissionDate(e); handleChange(e)}}
                                value={values.admissionDate}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <TextField
                                error={Boolean(touched.enrollmentDate && errors.enrollmentDate)}
                                fullWidth
                                helperText={touched.enrollmentDate && errors.enrollmentDate}
                                disabled
                                id="date"
                                label="Fecha de matricula"
                                margin='normal'
                                name='enrollmentDate'
                                type="date"
                                required
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onBlur={handleBlur}
                                onChangeCapture={(e) => {handleChangeEnrollmentDate(e); handleChange(e)}}
                                value={values.enrollmentDate}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <TextField
                                fullWidth
                                label="Tipo dedicación"
                                name="dedicationType"
                                onChange={(e) => {handleChangeDedicationType(e); handleChange(e)}}
                                required
                                select
                                margin="normal"
                                required
                                SelectProps={{ native: true }}
                                value={values.dedicationType}
                                variant="outlined"
                              >
                                {typeDedications.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>

                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            > 
                              <TextField
                                fullWidth
                                label="Estado"
                                name="stateStudent"
                                margin="normal"
                                onChange={(e) => {handleChangeStateStudent(e); handleChange(e)}}
                                disabled
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.stateStudent}
                                variant="outlined"
                              >
                                {states.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>


                            </Grid>
                            
                        </Grid>
                                                          
                        
                        
                        <TextField
                          fullWidth
                          label="Ayuda"
                          name="scholarshipAgreement"
                          margin="normal"
                          onChange={(e) => {handleChangeScholarshipAgreement(e); handleChange(e)}}
                          select
                          SelectProps={{ native: true }}
                          value={values.scholarshipAgreement}
                          variant="outlined"
                        >
                          {academicHelp.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      
                                <TextField
                                error={Boolean(touched.director && errors.director)}
                                fullWidth
                                helperText={touched.director && errors.director}
                                label="Director"
                                margin="normal"
                                name="director"
                                type='search'
                                required
                                onBlur={handleBlur}
                                onChange={(e) => {handleChangeDirector(e); handleChange(e)}}
                                value={values.director}
                                variant="outlined"
                              />
                          
                          <TextField
                          error={Boolean(touched.coDirectors && errors.coDirectors)}
                          fullWidth
                          helperText={touched.coDirectors && errors.coDirectors}
                          label="Co-Directores"
                          margin="normal"
                          name="coDirectors"
                          type='search'
                          onBlur={handleBlur}
                          onChange={(e) => {handleChangeCoDirectors(e); handleChange(e)}}
                          value={values.coDirectors}
                          variant="outlined"
                        />
                         
                          <TextField
                          error={Boolean(touched.investigationGroup && errors.investigationGroup)}
                          fullWidth
                          helperText={touched.investigationGroup && errors.investigationGroup}
                          label="Grupo de investigacion"
                          margin="normal"
                          name="investigationGroup"
                          type='search'
                          onBlur={handleBlur}
                          onChange={(e) => {handleChangeInvestigationGroup(e); handleChange(e)}}
                          value={values.investigationGroup}
                          variant="outlined"
                        />

                         
                        
                        <Divider />
                        <Box my={2}>
                          <Button
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                          >
                            Actualizar
                          </Button>
                        </Box>
                        
                      </form>
              </CardContent>
            </Card>   
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default UpdateStudentView;
