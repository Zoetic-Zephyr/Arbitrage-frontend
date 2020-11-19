import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Link, 
  Switch 
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
import { Alert } from '@material-ui/lab';
var data = 0; 
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
    coin_id: "BTC", // TODO: add switching later
    exchange_id: "binance",
    amount: 0,
    alertKey: 'key',
    alertStatus: '',
    portfolio: 0,
  }

  constructor(props) {
    super(props);
    this.bitcoin_buy = this.bitcoin_buy.bind(this); 
    this.bitcoin_sell = this.bitcoin_sell.bind(this); 
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

  exchangeOperation = (exchange_id, coin_id, op, amount) => {
    // TODO: fix amount value
    let json_data = {
      username: this.state.username, 
      password: this.state.password,
      exchange: exchange_id, 
      coin_id: coin_id, 
      op: op, 
      amount: amount,
    }

    let response = postData('https://todo-sm7v5imswq-uc.a.run.app/exchange', json_data); 
    console.log(response); 
    
    let portfolio_info = {
      username: this.state.username,
    }
    let result = postData('https://todo-sm7v5imswq-uc.a.run.app/user_portfolio', portfolio_info);
    let portfolio = result['data']['portfolio'];
    console.error(result['data']);
    this.state.portfolio = portfolio;

  }; 

  bitcoin_buy(){
    this.exchangeOperation(this.state.exchange_id, this.state.coin_id, 'buy', this.state.amount); 
    this.state.alertStatus = true;
  }

  bitcoin_sell(){
    this.exchangeOperation(this.state.exchange_id, this.state.coin_id, 'sell', this.state.amount); 
    this.state.alertStatus = true;
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="exchange">

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          {this.state.alertStatus ? <Alert key={this.state.alertkey} message={'success'} /> : null}

          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Current Portfolio: {data}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Bitcoin ID"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.coin_id}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Exchange ID"
              id="password"
              autoComplete="current-password"
              value={this.state.exchange_id}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Amount (by coin unit)"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.amount}
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.bitcoin_buy}
            >
              Buy
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={this.bitcoin_sell}
            >
              Sell
            </Button>
          </form>
        </div>
        <Box mt={8}>
        </Box>
    </Container>
    </div>
    )
  }
}