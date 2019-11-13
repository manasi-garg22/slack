import React from 'react';
import firebase from '../../firebse';
import {Grid,GridColumn,Header,Icon ,Dropdown} from 'semantic-ui-react';



class UserPanel extends React.Component{
  state={
    user=props.currentUser
  };

dropdownOptions= () =>
[
  {
    key :'user',
    text:( <span> signed in as <strong>{this.state.user.displayName}</strong> </span> ),
    disabled:true
  },
  {
    key :'avatar',
    text :<span> Change Avatar </span>
  },
  {
    key:'signout',
    text : <span onclick={this.handleSignout}> sign out </span>
  }
];

 handleSignout =() ={
   firbase
   .auth()
   .signout()
   .then(() => console.log('signed out'));
 };
  render()
  {
    console.log(this.props.currentUser);

    return(
      <Grid style={{ background :'#434343'}}>
      <GridColumn>
         <Grid.Row style={{padding :'1.2em', margin :0}}>
         <Header inverted floated ="left" as='h2'>
      <Icon name="code"  />
          <Header.Content>Slack Chat </Header.Content></Header>
          </Grid.Row>
          <Header style={{ padding : '0.25em'}} as='h4' inverted>
      <Dropdown trigger={
           <span>{ this.state.user.displayName } </span>}
           options={ this.dropdownOptions()}/>
         </Header>
      </GridColumn>
      </Grid>
    )
  }
}

export default UserPanel;
