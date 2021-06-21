import React from "react";
import { Link } from "react-router-dom";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";
import defaultImage from "assets/components/MainImage/image.png";

import { BASEURL } from "utils/api";

const ProjectCard = (props) => {
  const { data } = props;
  return (
    <Card border noShadow className={styles.card}>
      <Link to={props.to} style={{ textDecoration: "none" }}>
        <header className={styles.header}>
          <Text size={18} color="white">
            {data?.name || "..."}
          </Text>
        </header>
        <section className={styles.content}>
          <Title>{data?.name || "..."}</Title>
          <Text>{data?.description.substring(0, 200) + "..." || "..."}</Text>
        </section>
        <section className={styles.team}>
          <Card className={styles.image} border>
            <img
              src={!!data?.file?.length ? BASEURL + data?.file : defaultImage}
              alt={data?.name}
            />
          </Card>
          <Text size={14} className={styles.names}>
            Nome Sobrenome, Nome Sobrenome, Nome Sobrenome, Nome Sobrenome, Nome
            Sobrenome
          </Text>
        </section>
      </Link>
    </Card>
  );
};

export { ProjectCard };
