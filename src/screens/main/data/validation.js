
export default {
        fullname: {
            presence: { allowEmpty: false, message: 'is required' },
            length: {
                maximum: 10,
                minimum: 4
            }
        },
        username: {
            presence: { allowEmpty: false, message: 'is required' },
            length: {
                maximum: 10,
                minimum: 4
            }
        },
        email: {
            presence: { allowEmpty: false, message: 'is required' },
            email: true,
            length: {
                maximum: 128
            }
        },
            password: {
                presence: {allowEmpty: false, message: 'is required'},
                length: {
                    maximum: 128,
                    minimum: 6
                }
            },
        phone: {
            presence: { allowEmpty: false, message: 'is required' },
        },
        dob: {
            presence: { allowEmpty: false, message: 'is required' },
        },
        gender: {
            presence: { allowEmpty: false, message: 'is required' },
        }}