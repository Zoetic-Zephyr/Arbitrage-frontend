import React, {useState, useEffect} from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

export default function TransHistory() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
      let data = {
        username: 'testusername', 
        start_time: '00:00:00',
        end_time: '23:59:59'
      };

      // CORS problem?
      postData('https://todo-sm7v5imswq-uc.a.run.app/trans_history', data)
      .then(res => {
        console.log(res.data.trans_history); // JSON data parsed by `data.json()` call
        setTransactions(res.data.trans_history)
      })
      .catch(err => {
        console.log(err);
      });
    }, [])

    const classes = useStyles();

    return (
        <TableContainer className={classes.container}>
          <h1 className="page-title">Transactions</h1>
          <Table stickyHeader className={classes.table} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Timestamp</StyledTableCell>
                <StyledTableCell align="right">Platform</StyledTableCell>
                <StyledTableCell align="right">Coin_id</StyledTableCell>
                <StyledTableCell align="right">Buy/Sell</StyledTableCell>
                <StyledTableCell align="right">Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow hover key={index}>
                  <TableCell component="th" scope="row">
                    {transaction.dt}
                  </TableCell>
                  <TableCell align="right">{transaction.exchange}</TableCell>
                  <TableCell align="right">{transaction.coin_id}</TableCell>
                  <TableCell align="right">{transaction.op}</TableCell>
                  <TableCell align="right">{transaction.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}
