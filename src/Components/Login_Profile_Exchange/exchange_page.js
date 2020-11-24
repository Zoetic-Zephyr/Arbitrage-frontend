import React from 'react';
import { Link } from 'react-router-dom';
// import { 
//   BrowserRouter as Router, 
//   Route, 
//   Link, 
//   Switch 
// } from 'react-router-dom'; 

// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles'; 

import { postData } from './utils';
import { Alert } from '@material-ui/lab';
import { AsyncStorage } from 'AsyncStorage';

import Portfolio from '../Portfolio';


// var data = 0; 
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
    exchange_id: "binance",
    // ZZ
    amount: 0,
    coin_id: "BTC", // TODO: add switching later
    money: 0,
    portfolio: 0,
    // ZZ
    alertKey: 'key',
    alertStatus: '',
  }

  constructor(props) {
    super(props);
    this.bitcoin_buy = this.bitcoin_buy.bind(this); 
    this.bitcoin_sell = this.bitcoin_sell.bind(this); 
    this.handleChange = this.handleChange.bind(this);
  } 

  // handleChange = (event) => {
  //   this.setState({
  //     value: event.target.value,
  //   });
  // };

  handleChange(e){
    var obj = {}
    obj[e.target.name] = e.target.value
    this.setState(obj);
  }

 handleClick = () => {
    this.setState({
      value:'',
    });
  };

  exchangeOperation = async (exchange_id, coin_id, op, amount) => {
    let current_username = ""; 
    let current_password = ""; 

    try {
      current_username = await AsyncStorage.getItem('username');
      current_password = await AsyncStorage.getItem('password');
      if (current_username == null || current_password == null) {
        alert('empty local storage for auth'); 
      }
    } catch (error) {
      alert(error); 
    }

    let json_data = {
      username: current_username, 
      password: current_password,
      exchange: exchange_id, 
      coin_id: coin_id, 
      op: op, 
      amount: parseInt(amount),
    }

    let return_value = await postData('https://todo-sm7v5imswq-uc.a.run.app/exchange', json_data); 
    return return_value;
  };


  bitcoin_buy = async (e) => {
    e.preventDefault();
    await this.exchangeOperation(this.state.exchange_id, this.state.coin_id, 'buy', this.state.amount).then((response) => {
      console.log(response);
      // alert("bought");
    }); 
    this.state.alertStatus = true;
  }

  bitcoin_sell = async (e) => {
    e.preventDefault();
    await this.exchangeOperation(this.state.exchange_id, this.state.coin_id, 'sell', this.state.amount).then((response) => {
      console.log(response);
      // alert("sold");
    }); 
    this.state.alertStatus = true;
  }

  componentDidMount() {
    //this.bitcoin_buy();
  }

  render() {
    return (
      <div className="exchange">

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          {this.state.alertStatus ? <Alert key={this.state.alertkey} message={'success'} /> : null}

          <h1 className="page-title">Portfolio and Trading</h1>

          <Portfolio />

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="coin_id"
              label="Bitcoin ID"
              name="coin_id"
              autoComplete="coin_id"
              autoFocus
              value={this.state.coin_id}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="exchange_id"
              label="Exchange ID"
              id="exchange_id"
              autoComplete="exchange_id"
              value={this.state.exchange_id}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="amount"
              label="Amount (by coin unit)"
              id="amount"
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
              onClick={e => this.bitcoin_buy(e)}
            >
              Buy
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={e => this.bitcoin_sell(e)}
            >
              Sell
            </Button>
            <Button component={ Link } to="/" color="primary">
              Log out
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