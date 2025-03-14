import {
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';

const Login = () => {
    return (
        <VStack>
            <form>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' autoComplete='username' />
                </FormControl>

                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' autoComplete='current-password' />
                </FormControl>

                <Button type="submit" colorScheme="blue" mt={4}>
                    Login
                </Button>
            </form>
        </VStack>
    );
};

export default Login;
