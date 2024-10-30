export interface SignIn {
    username: string;
    password: string;
}

export interface SignUp extends SignIn{
    address: string;
    email: string;
    full_name: string;
    phone_number: string;
}

export interface Verification {
    email: string;
    verifyToken: string;
}