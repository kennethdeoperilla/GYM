// import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms'

// export class Validation {

//     public isFieldInvalid(formControl: AbstractControl, validation: string): boolean {
//         // console.log(formControl.errors);

//         return formControl.invalid
//             && (formControl.dirty || formControl.touched)
//             && (formControl.errors != null && formControl.errors[validation]);
//     }

//     public logFormValidationErrors(form: FormGroup) {
//         Object.keys(form.controls).forEach(key => {
//             const controlErrors: ValidationErrors = form.get(key).errors;

//             if (controlErrors != null) {
//                 Object.keys(controlErrors).forEach(keyError => {
//                     console.error('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
//                 });
//             }
//         });
//     }

//     public validateAllFormFields(formGroup: FormGroup) {
//         Object.keys(formGroup.controls).forEach(field => {
//             const control = formGroup.get(field);

//             if (control instanceof FormControl) {
//                 control.markAsTouched({ onlySelf: true });
//                 control.markAsDirty({ onlySelf: true });
//             } else if (control instanceof FormGroup) {
//                 this.validateAllFormFields(control);
//             }
//         });

//         let invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
//         invalidFields[1]?.focus();
//     }
// }