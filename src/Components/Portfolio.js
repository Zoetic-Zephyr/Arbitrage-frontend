import React, {useState, useEffect} from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { AsyncStorage } from 'AsyncStorage';
// import Paper from '@material-ui/core/Paper';


// Func from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    fontWeight: 700,
  },
  body: {
    // fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 760,
  },
  table: {
    minWidth: 350,
  },
});

async function getUsernameFromStorage() {
  let current_username = ""; 
  
  try {
    current_username = await AsyncStorage.getItem('username');
    if (current_username == null) {
      alert('empty local storage for auth'); 
    }
  } catch (error) {
    alert(error); 
  }

  return current_username;
}

export default function TransHistory() {
    const [holdings, setHoldings] = useState([])
    const [money, setMoney] = useState(0)
    const [portfolio, setPortfolio] = useState(0)

    useEffect(async () => {
      let current_username = await getUsernameFromStorage(); 
      let data = {
        username: current_username, 
      };

      // CORS problem?
      postData('https://todo-sm7v5imswq-uc.a.run.app/user_portfolio', data)
      .then(res => {
        console.log(current_username);
        console.log(res.data); // JSON data parsed by `data.json()` call
        setHoldings(res.data.coins);
        setMoney(res.data.money);
        setPortfolio(res.data.portfolio);
      })
      .catch(err => {
        console.log(err);
      });
    }, [])

    const classes = useStyles();

    return (
        <TableContainer className={classes.container}>
          <h2>Credits: {money}</h2>
          <h2>Net worth: {portfolio}</h2>
          <Table stickyHeader className={classes.table} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Coin_ID</StyledTableCell>
                <StyledTableCell align="right">Holding</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holdings.map((holding, index) => (
                <TableRow hover key={index}>
                  <TableCell component="th" scope="row">
                    {holding.coin_id}
                  </TableCell>
                  <TableCell align="right">{holding.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}
