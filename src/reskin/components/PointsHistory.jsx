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
    console.log(pointsHistory[0]);
    // const [ points, setPoints] = useState('');
    // setPoints(pointsHistory);
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      >
        <DialogTitle>{"My DITO Points History"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <table id="drawTable" style={{width: 70 + '%'}}> 
                        <thead> 
                            <tr>
                            <th>
                                    #
                                </th>
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
                        {/* { pointsHistory[0] ? pointsHistory[0].map((item, i) => 
                        
                    (
                            <tr key={i} style={{textAlign: 'center'}}>
                                <td>
                                    {i+1}
                                </td>
                                <td>
                                    {item.transaction}
                                </td>
                                <td style={{textTransform: 'capitalize'}}>
                                    {item.points}
                                </td>
                                <td>
                                    {item.date}
                                </td>
                            </tr>
                    )) : ""} */}
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