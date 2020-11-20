import React from 'react';
import ForumFake from '../assets/ForumFake.png'

export default function Forum() {
    return (
        <div style={{position:"relative", height:"760px"}}>
            <img src={ForumFake} alt='ForumFake'></img>
            <a href='https://arbitrage-4c056.firebaseapp.com' style={{color:"white", textAlign:"left", fontSize:"12px", position:"absolute", bottom:"0", left:"32%"}}>Forum</a>
        </div>
    );
}
