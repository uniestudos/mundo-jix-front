import React from "react";
import parse from "html-react-parser";

import { Card } from "components/Card";
import { Text, Title } from "components/Text";

import defaultImage from "assets/components/MainImage/image.png";

import styles from "./styles.module.sass";

const Resume = (props) => {
  const { data } = props;

  return (
    <section className={styles.resume}>
      <Card className={styles.card} style={{ padding: 0 }} border noShadow>
        <img src={data?.image || defaultImage} alt={data?.name} />
        <div className={styles.content}>
          {/* <Text className={styles.status}>{"Em desenvolvimento"}</Text> */}
          <Title className={styles.title}>{data?.name}</Title>
          <div className={styles.forcefont}>
            {data?.resume ? parse(data?.resume) : ""}
          </div>
        </div>
      </Card>
    </section>
  );
};

export { Resume };