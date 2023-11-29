import React, { useState } from 'react';
import styles from './modals.module.css';
import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import { backendUrl } from '../../global-proporties';

interface RegistrationModalBodyProps {
    onClose: () => void
}

const RegistrationModalBody: React.FC<RegistrationModalBodyProps> = ({ onClose }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(true);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    let emailError = errors.email?.message;
    let passwordError = errors.password?.message;
    let fullNameError = errors.fullName?.message;

    if (!isEmailAvailable) {
        emailError = 'Email already in use';
    }

    function onSubmit(data: FieldValues) {
        setIsLoading(true);

        const url = backendUrl + '/auth/register';

        axios.post(url, data)
            .then(() => {
                onClose();
            })
            .catch(({ response }) => {
                if (response.status === 400 && response.data.emailNotAvailable) {
                    setIsEmailAvailable(false);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

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
                <div className={styles["input-wrapper"]}>
                    <input
                        id='name'
                        className={fullNameError && styles["invalid-input"]}
                        type="text"
                        {...register("fullName", { required: "Full name is required" })}
                        placeholder=''
                    />
                    <label htmlFor="name">Full Name</label>
                </div>
                {fullNameError &&
                    <span>{fullNameError + ''}</span>
                }
                <button className={`${styles["continue-btn"]} ${isLoading && styles["loading"]}`}>Sign up</button>
            </form>
        </>
    );
}

export default RegistrationModalBody;