namespace App {
    // Validation
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }

    export function validate(validatableInput: Validatable) {
        const { value } = validatableInput;
        let isValid = true;
        if (validatableInput.required) {
            isValid &&= value.toString().trim().length !== 0;
        }
        if (typeof value === "string") {
            if (validatableInput.minLength !== undefined) {
                isValid &&= value.length >= validatableInput.minLength;
            }
            if (validatableInput.maxLength !== undefined) {
                isValid &&= value.length <= validatableInput.maxLength;
            }
        }
        if (typeof value === "number") {
            if (validatableInput.min !== undefined) {
                isValid &&= value >= validatableInput.min;
            }
            if (validatableInput.max !== undefined) {
                isValid &&= value <= validatableInput.max;
            }
        }
        return isValid;
    }
}
