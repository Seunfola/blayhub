'use client'

import React, { useState } from "react";
import styles from "./pages.module.css";
import SeeMoreButton from "@/components/seeMore/SeeMoreButton";
import Image from "next/image";
import { items } from "./data.js";
import { notFound } from "next/navigation";

const getData = (cat) => {
  const data = items[cat];

  if (data) {
    return data;
  }

  return notFound();
};

const Category = ({ params }) => {
  const [activeItem, setActiveItem] = useState(null);

  const data = getData(params.category);

  const handleSeeMore = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
            {activeItem === item.id && (
              <div className={styles.fullContent}>
                <p>{item.fullContent}</p>
              </div>
            )}
            <div className={styles.buttonContainer}>
              <SeeMoreButton text={activeItem === item.id ? "See Less" : "See More"} onClick={() => handleSeeMore(item.id)} />
            </div>
          </div>
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              fill={true}
              src={item.image}
              alt={item.title}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
