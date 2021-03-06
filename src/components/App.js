import React from 'react';
import ReactDOM from 'react-dom';
import  {Grid,GridColumn} from 'semantic-ui-react';
import './App.css';
import {connect} from "react-redux";
import ColorPanel from "./ColorPanel/Colorpanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import  MetaPanel from "./MetaPanel/MetaPanel";



const App = ({ currentUser }) =>{
  return(

<Grid columns="equal" className="app" style={{background:'#eee'}}>


     <ColorPanel />
     <SidePanel currentUser={ currentUser }/>


     <Grid.Column style={{marginLeft:320}}><Messages /></Grid.Column>
     <Grid.Column width={4}><MetaPanel /></Grid.Column>

   </Grid>
 )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})


export default connect(mapStateToProps)(App);
