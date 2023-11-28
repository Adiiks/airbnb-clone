import React from 'react';
import styles from './modals.module.css';
import { FieldValues, useForm } from 'react-hook-form';

interface AuthModalBodyProps {
    isLogin: boolean
}

const AuthModalBody: React.FC<AuthModalBodyProps> = ({ isLogin }) => {
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    function onSubmit(data: FieldValues) {
        //TODO
    }

    let emailError = errors.email?.message;
    let passwordError = errors.password?.message;
    let fullNameError = errors.fullName?.message;

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
                {!isLogin &&
                    <>
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
                    </>
                }
                <button className={styles["continue-btn"]}>Continue</button>
            </form>
        </>
    );
}

export default AuthModalBody;