import React from 'react'
import { categoryInfo } from "./CategoryInfo.js";
import CategoryCard from './CategoryCard';
import styles from "./Category.module.css"

function Category() {
  return (
    <section className={styles.category_container }>
      {
        categoryInfo.map((infos, i)=>(
          <CategoryCard key={i} data={infos}/>
        ))
      }
    </section>
  )
}

export default Category