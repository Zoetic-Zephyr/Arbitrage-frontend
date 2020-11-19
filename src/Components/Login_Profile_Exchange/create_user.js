import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Link, 
  Switch, 
  Redirect
} from 'react-router-dom'; 

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles'; 

import { postData } from './utils';

const classes = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default class PersonList extends React.Component {
  // TODO: retrieve username and password from AsyncStorage instead
  state = {
    username: "testusername", 
    password: "testpassword", 
    toDashboard: false, 
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

 handleClick = () => {
    this.setState({
      value:'',
    });
  };

  constructor(props) {
    super(props); 
    //this.sendLoginRequest = this.sendLoginRequest.bind(this); 
  }

  sendLoginRequest = () => {
    let jsonData = {
      username: this.state.username, 
      password: this.state.password,
    }
    let response = postData('https://todo-sm7v5imswq-uc.a.run.app/create_user', jsonData); 
    console.log(response); 
    this.setState(() => ({ toDashboard: true }))
  };

  componentDidMount() {

  }

  render() {
    if (this.state.toDashboard) {
      return <Redirect to='/screener'/>
    }

    return (
      <div className="exchange">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          

          <Avatar className={classes.avatar}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.username}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.sendLoginRequest}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" to="">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" to="">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
    </Container>
    </div>
    )
  }
}