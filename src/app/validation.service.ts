import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class ValidationService {

    getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
        const config = {
            required: 'Required.',
            email: 'Invalid email.',
            invalidPassword: 'Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.',
            passwordMismatch: 'Passwords dont match.',
            minlength: `Minimum length ${validatorValue.requiredLength}.`,
            min: `Minimum value is ${validatorValue.min}.`,
            max: `Minimum value is ${validatorValue.max}.`,
            invalidEmail: 'Invalid email. Email must be like: example@gmail.com',
            invalidPhone: 'Invalid phone. Phone must contain 9 numbers.',
            invalidPostalCode: 'Invalid postal code. Postal code must have the next pattern: 1111-123'
        };
        return config[validatorName];
    }

    postalCodeValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('^[0-9]{4}-[0-9]{1,4}$');
            return regex.test(control.value) ? null : {invalidPostalCode: true};
        };
    }

    phoneValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('^[0-9]{9}');
            return regex.test(control.value) ? null : {invalidPhone: true};
        };
    }

    emailValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}');
            return regex.test(control.value) ? null : {invalidEmail: true};
        };
    }

    passwordValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
            return regex.test(control.value) ? null : {invalidPassword: true};
        };
    }

    MatchPassword(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password], confirmPasswordControl = formGroup.controls[confirmPassword];

            if (!passwordControl || !confirmPasswordControl) {
                return null;
            }

            if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
                return null;
            }

            if (passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({passwordMismatch: true});
            } else {
                confirmPasswordControl.setErrors(null);
            }
        }
    }

    userNameValidator(userControl: AbstractControl) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (this.validateUserName(userControl.value)) {
                    resolve({userNameNotAvailable: true});
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    validateUserName(userName: string) {
        const UserList = ['ankit', 'admin', 'user', 'superuser'];
        return (UserList.indexOf(userName) > -1);
    }
}
