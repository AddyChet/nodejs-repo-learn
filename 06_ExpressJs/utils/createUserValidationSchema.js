export const createUserValidationSchema = {
    name : {
        isLength : {
            options : {
                min : 5,
                max : 32
            },
            errorMessage : "name must be within 5 - 32 chars"
        },
        isString : {
            errorMessage : "name must be a string"
        },
        notEmpty : {
            errorMessage : "name must not be Empty"
        }
    },

    username: {
        notEmpty : {
            errorMessage : "Username must not be Empty"
        }
    }
}