import { useEffect, useState } from 'react';
import styles from './navbar.module.css';
import Category from '../../../models/Category';
import axios from 'axios';
import { backendUrl } from '../../../global-proporties';
import { createSearchParams, useNavigate } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

    const navigate = useNavigate();

    useEffect(() => {
        const url = backendUrl + '/categories'

        axios.get(url)
            .then(({ data }) => {
                setCategories(data);
                handleSelectCategory(data[0].id);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    function handleSelectCategory(categoryId: number) {
        setSelectedCategoryId(categoryId);

        const params = {'category': categoryId + ''};

        navigate({
            pathname: '/',
            search: `${createSearchParams(params)}`
        });
    }

    return (
        <div id={styles["categories-container"]}>
            {categories.length > 0 && categories.map((category) =>
                <div
                    key={category.id}
                    className={`${styles["category-item-wrapper"]} ${category.id === selectedCategoryId && styles["selected-category"]}`}
                    onClick={() => handleSelectCategory(category.id)}
                >
                    <img src={require('../../../assets/categories-icons/' + category.iconName)} />
                    <p>{category.name}</p>
                </div>
            )}
        </div>
    );
}

export default Categories;