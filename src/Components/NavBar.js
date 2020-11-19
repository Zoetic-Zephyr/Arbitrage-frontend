import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { Link } from 'react-router-dom';

import EqualizerIcon from '@material-ui/icons/Equalizer';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ForumIcon from '@material-ui/icons/Forum';
import TimelineIcon from '@material-ui/icons/Timeline';
import PersonIcon from '@material-ui/icons/Person';


const useStyles = makeStyles({
    root: {
      width: '100%',
      // below added by me
      position: "fixed",
      bottom: 0,
    },
  });
  
  export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('screener');
    // const MyButton = React.forwardRef((props, ref) => <div role="button" {...props} ref={ref} />);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction label="Screener" value="screener" icon={<EqualizerIcon />} component={Link} to='/screener'/>

        <BottomNavigationAction label="Forum" value="forum" icon={<ForumIcon />} component={Link} to='/forum'/>
        {/* <BottomNavigationAction label="Forum" value="forum" icon={<ForumIcon />} component={MyButton}/> */}
        {/* <BottomNavigationAction label="Forum" value="forum" icon={<ForumIcon />} component={() => { return  <a href='https://arbitrage-4c056.firebaseapp.com'>Forum</a>;}} /> */}
        {/* <BottomNavigationAction label="Forum" value="forum" icon={<ForumIcon />} component={() => { window.location.href = 'https://arbitrage-4c056.firebaseapp.com'; return null;}} /> */}
        
        <BottomNavigationAction label="History" value="history" icon={<TimelineIcon />} component={Link} to='/trans_history'/>
        <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} component={Link} to='/profile'/>
      </BottomNavigation>
    );
  }
