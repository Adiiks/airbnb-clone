import { CounterAction } from './BasicInformationSelection';
import styles from '../listing-creation.module.css';
import { FiPlus, FiMinus } from "react-icons/fi";

type Props = {
    title: string
    defaultValue: number,
    minValue: number,
    maxValue?: number
    onCounterChange: (action: CounterAction, counterTitle: string) => void
}

const CounterInput: React.FC<Props> = ({ title, defaultValue, minValue, maxValue, onCounterChange }) => {
    return (
        <div className={styles['counter-input-container']}>
            <p>{title}</p>
            <div className={styles['counter-input-wrapper']}>
                <button
                    className={styles['counter-btn']}
                    disabled={defaultValue <= minValue}
                    onClick={() => onCounterChange(CounterAction.DECREASE, title)}
                >
                    <FiMinus />
                </button>
                <p>{defaultValue}</p>
                <button
                    className={styles['counter-btn']}
                    disabled={maxValue === undefined ? false : defaultValue > maxValue}
                    onClick={() => onCounterChange(CounterAction.INCREASE, title)}
                >
                    <FiPlus />
                </button>
            </div>
        </div>
    );
}

export default CounterInput;