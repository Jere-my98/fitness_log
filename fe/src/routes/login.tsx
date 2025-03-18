// Importing React's useState hook for managing state
import { useState } from 'react';

// Importing the 'login' function from the API endpoints (handles the login logic)
import { login } from '../endpoints/api';

// Define the Login component
const Login = () => {
    // State for storing the 'username' input value
    const [username, setUsername] = useState('');
    
    // State for storing the 'password' input value
    const [password, setPassword] = useState('');

    // Function to handle the form submission
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default page refresh when submitting the form
        login(username, password); // Calls the 'login' function with the entered credentials
    };

    // JSX code for rendering the login form
    return (
        <h1>Login</h1>
    );
};

// Exports the Login component so it can be used in other parts of the app
export default Login;
