
import React from 'react';
import NavBar from './Navbar';
import './landing.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
            background: 'white',
            color: 'black',
            borderRadius: '10px',
            padding: '0px'
        },
    },
}));

// export default function MediaCard(prop) {
const MediaCard = (props) =>{
const classes = useStyles();

  return (
         <>
                 <div className="lcard">
                <div className="lcards">
                    <img src="/img/pro.jpg" alt="Image" className="lcard_pic"></img>
                    <div className="lcard_info">
                        <h4 className="lcard_title">{props.productName}</h4>
                        <h4 className="lcard_title">Price : {props.price} rs </h4>
                        <h5 className="lcard_title">Brand : {props.brand} </h5>
                        <h5 className="lcard_title">Available Quantity : {props.quantity} </h5>
                        <h4 className="lcard_title"><span> {props.shopName} </span></h4>

                    </div>
                </div>
            </div>
            </>
    
  );
}
export default MediaCard;
