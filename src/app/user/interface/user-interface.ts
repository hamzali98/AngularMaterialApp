export interface userInterface {
    id: string,
    personal_details: {
        user_first_name: string,
        user_last_name: string,
        user_gender: string,
        user_dob: string
    },
    contact_details: {
        user_email_address: string,
        user_phone: string,
        user_address: string,
    }
}