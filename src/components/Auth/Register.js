import React from "react";
import {Grid, Message,Button ,Form,Segment ,Icon,Header, GridColumn} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';


class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordconfirmation: '',
        errors :[],
        loading: false,
        usersRef: firebase.database().ref('users')

    };
    isFormValid = event =>
    {
        let errors= [];
        let error;
        if( this.isFormEmpty(this.state))
        {
            error={message: 'fill in the fields'};
            this.setState({errors: errors.concat(error)});
            return false;


        }


          else if(!this.isPasswordValid(this.state))
        {
            error ={message:'password is invalid'};
            this.setState({errors:errors.concat(error)});
            return false;


        }
        else{
            return true;
        }
    }
    isFormEmpty =({ username, email, password, passwordconfirmation})=> {
        return ( !username.length ||
        !!email.length ||
        !password.length ||
        !passwordconfirmation.length
        );
    }
    isPasswordValid =({password,passwordconfirmation}) =>
    {
if(password.length<6|| passwordconfirmation.length<6){
    return false;

}else if(password !==passwordconfirmation)
{
    return false;
} else {
    return true;
}
    };


    displayErrors = errors =>
     errors.map(( error,i) => <p key={i}>{error.message}</p>);

    Handlechange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };
    Handlesubmit = event =>
    {
        if(this.isFormValid() ){
            this.setState ({ errors:[], loading:true});
        event.preventDefault();


        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
                console.log(createdUser);
                this.setState({loading : false});
                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL: 'http://gravator.com/avatar/${md5(createdUser.user.email)}?d=identicon'

                })
                .then(() => {
                    this.saveUser(createdUser).then(()=>
                    {
                        console.log("user saved");
                    });

                })
                .catch(err => {
                    console.error(err);
                    this.setState({ errors: this.state.errors.concat(err), loading: false});
                });


            }
        )

        .catch( err=>
            {
                console.error(err);
                this.setState({ errors: this.state.errors.concat(err),loading:false});
            });
        }
    }
    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL

        });

    };
    handleInputError= (errors, inputName) => {
         return errors.some(error => error.message.toLowerCase().includes(inputName))? "errors" : ""

    };

    render() {
        const {username,email,password,passwordconfirmation,errors,loading} = this.state;


        return(
             <Grid textAlign="center" verticalAlign="middle" className="app">
                 <Grid.Column style={{maxwidth: 450}}>
                     <Header as="h2"
                     iconcolor="orange"
                     textAlign="center">
                         <Icon
                         name="puzzle piece"
                         color="orange"/>
                         Register for SlackAPP
                     </Header>
                     <Form  style={{width:400}} className="center" onSubmit={this.Handlesubmit} size="large">
                         <Segment stacked>
                             <Form.Input fluid name="username" icon="user" iconPosition="left"
                             placeholder="username" onChange={this.Handlechange} type="text" value={username}/>

                             <Form.Input fluid name="email" icon="mail" iconPosition="left"
                             placeholder="E-mail" onChange={this.Handlechange} type="email"
                             className={this.handleInputError(errors,'email')}
                              value={email}/>

                             <Form.Input fluid name="password" icon="lock" iconPosition="left"
                             placeholder="password" onChange={this.Handlechange} type="Password"
                             className={this.handleInputError(errors,'password')} value={ password}
                            />

                            <Form.Input fluid name="passwordconfirmation" icon="repeat" iconPosition="left"
                             placeholder="password confirm" onChange={this.Handlechange} type="password"
                             className={this.handleInputError(errors,'password')} value= {passwordconfirmation}/>

                             <Button   disabled={loading} className={ loading ? 'loading' : ''} fluid sixe="large"
                              color="orange">
                                  submit
                                  </Button>


                       </Segment>

                     </Form>
                     {errors.length>0&& (

                             <Message error>
                                 <h3> Error</h3>
                                 {this.displayErrors(errors)}

                             </Message>

                     )}

                         <Message>
                             Already a user? <Link to="/Login">Login</Link>
                         </Message>

                 </Grid.Column>

             </Grid>
         )
                     }
}

export default Register;
