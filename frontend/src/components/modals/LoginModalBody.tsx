import { useState } from 'react';
import styles from './modals.module.css';
import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import { backendUrl } from '../../global-proporties';

const LoginModalBody = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    function onSubmit(data: FieldValues) {
        setIsLoading(true);

        const url = backendUrl + '/auth/register';
        
        axios.post(url, data)
        .then(() => {

        })
        .catch(() => {
            
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
                <button className={`${styles["continue-btn"]} ${isLoading && styles["loading"]}`}>Log in</button>
            </form>
        </>
    );
}

export default LoginModalBody;