import React from "react";
import {Grid, Message,Button ,Form,Segment ,Icon,Header, GridColumn} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';


class Login extends React.Component {
    state = {

        email: '',
        password: '',

        errors :[],
        loading: false,


    };
    displayErrors = errors =>
     errors.map(( error,i) => <p key={i}>{error.message}</p>);

    Handlechange = event => {
        this.setState({ [event.target.name]: event.target.value})
    };

    Handlesubmit = event =>
    {
        event.preventDefault();
        if(this.isFormValid( this.state) ){
            this.setState ({errors:[], loading: true});
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(signesInUser =>
            {
                console.log(signesInUser);

            })
            .catch(err => {
                console.error(err);
                this.setState({
                    errors: this.state.errors.concat(err),
                    loading:false
                });
            });



        }
    };
    isFormValid = ({email,password}) => email && password;
        handleInputError= (errors, inputName) => {
         return errors.some(error => error.message.toLowerCase().includes(inputName))? "errors" : ""};

    render() {
        const {email,password,errors,loading} = this.state;


        return(
             <Grid textAlign="center" verticalAlign="middle" className="app">
                 <Grid.Column style={{maxwidth: 450}}>
                     <Header as="h1"
                     iconcolor="violet"
                     textAlign="center">
                         <Icon
                         name="code branch"
                         color="violet"/>
                         Login for SlackAPP
                     </Header>
                     <Form  style={{width:400}} className="center" onSubmit={this.Handlesubmit} size="large">
                         <Segment stacked>


                             <Form.Input fluid name="email" icon="mail" iconPosition="left"
                             placeholder="E-mail" onChange={this.Handlechange} type="email"
                             className={this.handleInputError(errors,'email')}
                              value={email}/>

                             <Form.Input fluid name="password" icon="lock" iconPosition="left"
                             placeholder="password" onChange={this.Handlechange} type="Password"
                             className={this.handleInputError(errors,'password')} value={ password}
                            />


                             <Button   disabled={loading} className={ loading ? 'loading' : ''} fluid sixe="large"
                              color="violet">
                                  submit
                                  </Button>


                       </Segment>

                     </Form>
                     {errors.length  > 0 && (

                             <Message error>
                                 <h3>
                                     error
                                 </h3>
                                 {this.displayErrors(errors)}

                             </Message>

                     )}

                         <Message>
                             Dont have an account? <Link to="/Register">Register</Link>
                         </Message>

                 </Grid.Column>

             </Grid>
         )
         }
        }

export default Login;
