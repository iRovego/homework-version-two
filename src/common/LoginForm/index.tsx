import * as React from 'react';
import { Alert, Form, FormField, FormInput, Button } from 'elemental';
import { connect } from 'react-redux';
import {checkEmail, checkPassword} from '../../client/actions/loginFormActions';

import styles from './style.less';
import { bindActionCreators } from 'redux';

export interface IProps {
	login: {
		emailValid: boolean,
		emailError: string,
		passwordValid: boolean,
		passwordError: string,
	},
	checkEmail,
	checkPassword
}
export interface IState {
	login: {
		emailValid: boolean,
		emailError: string,
		passwordValid: boolean,
		passwordError: string,
	},
	emailValue: string,
	passwordValue: string,	
	checkEmail: Function,
	checkPassword: Function,
}

class LoginForm extends React.Component<IProps, IState> {
	constructor(props: IState) {
		super(props);
		this.state = {
			login: {
				emailValid: props.login.emailValid,
				emailError: props.login.emailError,
				passwordValid: props.login.passwordValid,
				passwordError: props.login.passwordError,
			},
			emailValue:'',
			passwordValue: '',
			checkEmail: props.checkEmail,
			checkPassword: props.checkPassword,
		}		

		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
	}

	private handleChangeEmail = (event) => {
		this.setState({emailValue: event.target.value});
	}

	private handleChangePassword = (event) => {
		this.setState({passwordValue: event.target.value});
	}	

	private onSubmit = () => {
		this.props.checkEmail(this.state.emailValue);
		this.props.checkPassword(this.state.passwordValue);
		
		if (this.props.login.emailValid && this.props.login.passwordValid) {
			console.log("Success");
		}
	}

	public render() {
		let {emailError, passwordError} = this.props.login;
		let formErrors;

		if (emailError && passwordError) {
			formErrors = <Alert type="danger">{emailError} , {passwordError}</Alert>
		} else {
			if (emailError || passwordError) {
				formErrors = <Alert type="danger">{emailError || passwordError}</Alert>
			} else {
				formErrors = ''
			}
		}

		return (
			<div>
				{formErrors}
				<Form>
					<FormField label="Email address" htmlFor="basic-form-input-email">
						<FormInput
							autoFocus
							type="email"
							placeholder="Enter email"
							name="basic-form-input-email"
							className={emailError ? styles.invalid : ''}
							onChange={this.handleChangeEmail}
						/>
					</FormField>
					<FormField label="Password" htmlFor="basic-form-input-password">
						<FormInput
							type="password"
							placeholder="Enter password"
							name="basic-form-input-password"
							className={passwordError ? styles.invalid : ''}
							onChange={this.handleChangePassword}
						/>
					</FormField>
					<Button type="primary" onClick={this.onSubmit}>Log in</Button>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.login,
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({checkEmail,checkPassword}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)