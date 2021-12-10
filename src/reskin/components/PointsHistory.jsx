import * as React from 'react';
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const pointsHistory = useSelector((state) => state.subscriber?.pointsHistory);
    let isEmpty = (pointsHistory == null);
    console.log(isEmpty)
    // const [ points, setPoints] = useState('');
    // setPoints(pointsHistory);
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const convertDate = (date) => {
      let isoDate = new Date(date);
      isoDate.toISOString().substring(9, 10);
      return isoDate;
  }

  const transactionsMap = new Map();
  transactionsMap.set("activation", "DITO SIM Activation");
  transactionsMap.set("DITO39", "DITO 39");
  transactionsMap.set("DITO99", "DITO 99");
  transactionsMap.set("DITO199", "DITO 199");
  transactionsMap.set("firstLogin", "DITO APP");
  transactionsMap.set("FirstLogin", "DITO APP");
  transactionsMap.set("firstlogin", "DITO APP");
  transactionsMap.set("VIVA1", "VIVAMAX Subscription");
  transactionsMap.set("WeTV1", "WeTV");
  transactionsMap.set("HBO1", "HBO 1 month Subscription");
  transactionsMap.set("HBO3", "HBO 3 month Subscription");


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        See Points History
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth="true"
        maxWidth="400"
      >
        <DialogTitle>{"My DITO Points History"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <table id="drawTable" style={{width: 70 + '%'}}> 
                        <thead> 
                            <tr style={{textAlign: 'center'}}>
                                <th>
                                    Transaction
                                </th>
                                <th>
                                    Points
                                </th>
                                <th>
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        { ( !isEmpty )? pointsHistory.map((item) => 
                        
                    (
                            <tr key={item._id} style={{textAlign: 'center'}}>
                                <td style={{textAlign: 'center'}}>
                                    {transactionsMap.get(item.transaction)}
                                </td>
                                <td style={{textAlign: 'center'}}>
                                    {item.points}
                                </td>
                                <td style={{textAlign: 'center'}}>
                                    {(item.date).substring(0, 10)}
                                </td>
                            </tr>
                    )) : ""}
                        </tbody>
                    </table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}