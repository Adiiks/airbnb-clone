import { useContext, useState } from 'react';
import styles from './modals.module.css';
import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import { backendUrl } from '../../global-proporties';
import { AuthContext } from '../../store/auth-context';

interface LoginModalBodyProps {
    onClose: () => void
}

const LoginModalBody: React.FC<LoginModalBodyProps> = ({ onClose }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoginError, setIsLoginError] = useState<boolean>();

    const authContext = useContext(AuthContext);

    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    function onSubmit(data: FieldValues) {
        setIsLoading(true);

        const url = backendUrl + '/auth/login';
        
        axios.post(url, data)
        .then(({ data }) => {
            authContext.setAuth(data);
            onClose();
        })
        .catch(({ response }) => {
            if (response.status === 401) {
                setIsLoginError(true);
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    let emailError = errors.email?.message;
    let passwordError = errors.password?.message;

    return (
        <>
            <h2>Welcome to Airbnb</h2>
            <form id={styles["auth-form"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles["input-wrapper"]}>
                    <input
                        id='email'
                        className={emailError && styles["invalid-input"]}
                        type="text"
                        {...register("email", { required: "Email is required" })}
                        placeholder=''
                    />
                    <label htmlFor="email">Email</label>
                </div>
                {emailError &&
                    <span>{emailError + ''}</span>
                }
                <div className={styles["input-wrapper"]}>
                    <input
                        id='password'
                        className={passwordError && styles["invalid-input"]}
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        placeholder=''
                    />
                    <label htmlFor="password">Password</label>
                </div>
                {passwordError &&
                    <span>{passwordError + ''}</span>
                }
                {isLoginError && <span>Invalid credentials</span>}
                <button className={`${styles["continue-btn"]} ${isLoading && styles["loading"]}`}>Log in</button>
            </form>
        </>
    );
}

export default LoginModalBody;