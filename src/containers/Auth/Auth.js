import React, {Component} from "react"
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input"
import is from 'is_js'
import axios from 'axios'


 export default class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Input valid email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Input valid password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      },
    }
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index)=>{
      const control = this.state.formControls[controlName]
      return(
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          label={control.label}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDYszNcTEZMH8eq-seBP7slaPUKx8J86aM', authData)

      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDYszNcTEZMH8eq-seBP7slaPUKx8J86aM', authData)

      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }


  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validation){
    if (!validation)  {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid

    }

    return isValid
  }

  onChangeHandler(event, controlName) {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({formControls, isFormValid})
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>

        <form className={classes.AuthForm} onSubmit={this.submitHandler}>

          { this.renderInputs() }

          <Button           
            type="success" 
            onClick={this.loginHandler}
            disabled={!this.state.isFormValid}
          >
            Log in
          </Button>
          <Button           
            type="primary" 
            onClick={this.registerHandler}
            disabled={!this.state.isFormValid}
          >
          register
          </Button>
        </form>


        </div>
      </div>
    )
  }
}