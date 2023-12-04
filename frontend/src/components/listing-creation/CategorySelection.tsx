import { useEffect, useState } from 'react';
import styles from './listing-creation.module.css';
import Category from '../../models/Category';
import { backendUrl } from '../../global-proporties';
import axios from 'axios';
import { ListingCreationAction, ListingCreationActionType } from './ListingCreation';

type Props = {
    dispatch: React.Dispatch<ListingCreationAction>,
    selectedCategoryId?: number
}

const CategorySelection: React.FC<Props> = ({ dispatch, selectedCategoryId }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const url = backendUrl + '/categories'

        axios.get(url)
            .then(({ data }) => {
                setCategories(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <h1>Which of these best describes your place?</h1>
            <div id={styles['categories-wrapper']}>
                {categories.length > 0 && categories.map((category) =>
                    <div
                        key={category.id}
                        className={`${styles['category-item']} ${(category.id === selectedCategoryId) && styles['selected-category']}`}
                        onClick={() => dispatch({ type: ListingCreationActionType.UPDATE_CATEGORY_ID, payload: category.id })}
                    >
                        <img src={require('../../assets/categories-icons/' + category.iconName)} />
                        <p>{category.name}</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default CategorySelection;