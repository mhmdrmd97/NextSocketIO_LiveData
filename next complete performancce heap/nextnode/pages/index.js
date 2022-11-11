import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const socket = io("http://localhost:5000");

function Appy() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [data,setData] = useState(null);
  const [objData,setObjData] = useState(null);
  
  
    const sendPing = () => {
      socket.emit('ping');
    }
  
const [columnDefs] = useState([
  { field: 'Exchange' },
  { field: 'Symbol' },
  { field: 'LastTradePrice' },
  { field: 'NetChange' },
  { field: 'NetChangePerc' },
  { field: 'TotalVolume' },
  { field: 'TotalValue' },
  { field: 'Executed' },
]);


const [arr,setArr] = useState(
  [
      {Exchange:"DFM",Symbol:"DAMAC",LastTradePrice:"1.50",NetChange:"0.10",NetChangePerc:"6.667",TotalVolume:"50",TotalValue:null,Executed:null},
      {Exchange:"DFM",Symbol:"GULFNAV",LastTradePrice:"1.50",NetChange:"0.10",NetChangePerc:"6.667",TotalVolume:"50",TotalValue:null,Executed:null},
     
      {Exchange:"DFM",Symbol:"MASQ",LastTradePrice:"1.50",NetChange:"0.10",NetChangePerc:"6.667",TotalVolume:"50",TotalValue:null,Executed:null},
      {Exchange:"DFM",Symbol:"TABREED",LastTradePrice:"1.50",NetChange:"0.10",NetChangePerc:"6.667",TotalVolume:"50",TotalValue:null,Executed:null},
  ]
);
const constarr =
  [
      {Exchange:"DFM",Symbol:"DAMAC",LastTradePrice:"1.50",NetChange:"0.10",NetChangePerc:"6.667",TotalVolume:"50",TotalValue:null,Executed:null},
      {Exchange:"DFM",Symbol:"GULFNAV",LastTradePrice:"1.50",NetChange:"0.10",NetChangePerc:"6.667",TotalVolume:"50",TotalValue:null,Executed:null},
     
      {Exchange:"DFM",Symbol:"MASQ",LastTradePrice:"1.50",NetChange:"0.10",NetChangePerc:"6.667",TotalVolume:"50",TotalValue:null,Executed:null},
      {Exchange:"DFM",Symbol:"TABREED",LastTradePrice:"1.50",NetChange:"0.10",NetChangePerc:"6.667",TotalVolume:"50",TotalValue:null,Executed:null},
  ];


  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('getdata', (msg) => {
      console.log(msg);
    if(msg) setData(msg);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });
  
function  getOverride(myarr,ovr){
const symbolList= ["DAMAC","GULFNAV","MASQ","TABREED"]
const newR = myarr.map((obj, i)=>{
  let arr = [];
  if(obj.Symbol==symbolList[i]) arr = {...obj,Exchange:"DFM",...ovr[i],Symbol:constarr[i].Symbol};
return arr;
});
setArr(newR);
return newR;
}

data && setObjData(JSON.stringify(getOverride(arr,JSON.parse(data))))


return () => {
  socket.off('connect');
  socket.off('disconnect');
  socket.off('pong');
};


},[data]);

  return (
    <div>

<div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact rowData={arr} columnDefs={columnDefs}></AgGridReact>
    </div>

      <h1>{data? data : "hi"}</h1>
      <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button>
    </div>
  );
}

export default Appy;