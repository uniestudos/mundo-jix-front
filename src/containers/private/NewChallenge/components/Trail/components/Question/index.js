import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Title } from "components/Text";
import Button from "components/Button";
import {
  Input,
  Textarea,
  InputGroup,
  InputFile,
  AddGroup,
  RemoveGroup,
} from "components/Inputs";
import { Card } from "components/Card";

import styles from "./styles.module.sass";

const Question = (props) => {
  const [editable, setEditable] = useState(true);
  const [answers, setAnswers] = useState([{ isCorrect: false }]);

  const { trails, index, handleData, handleCopy, handleDelete } = props;
  const { register, errors, control, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });

  const handleCorrect = (index) => {
    const array = [...answers];
    const map = array.map((item) => ({ isCorrect: false }));
    map[index].isCorrect = true;

    setAnswers(map);
  };

  const handleEdit = () => setEditable(true);

  const onSubmit = (data) => {
    handleData(index, data);
    setEditable(false);
  };
  return (
    <Card border>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <header className={styles.header}>
          <Title style={{ marginBottom: 32 }}>{index}) Questão</Title>
          <div className={styles.edit}>
            <span className={styles.button} onClick={() => handleEdit(index)}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15" cy="15" r="15" fill="#0094FF" />
                <path
                  d="M8.18848 19.2186V21.8748H10.9235L18.9899 14.0407L16.2549 11.3844L8.18848 19.2186ZM21.105 11.9865C21.3894 11.7102 21.3894 11.264 21.105 10.9877L19.3984 9.33023C19.1139 9.05398 18.6544 9.05398 18.37 9.33023L17.0353 10.6265L19.7703 13.2827L21.105 11.9865Z"
                  fill="white"
                />
              </svg>
            </span>

            <span className={styles.button} onClick={() => handleCopy(index)}>
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4545 0H1.63636C0.736364 0 0 0.736364 0 1.63636V13.0909H1.63636V1.63636H11.4545V0ZM10.6364 3.27273L15.5455 8.18182V16.3636C15.5455 17.2636 14.8091 18 13.9091 18H4.90091C4.00091 18 3.27273 17.2636 3.27273 16.3636L3.28091 4.90909C3.28091 4.00909 4.00909 3.27273 4.90909 3.27273H10.6364ZM9.81818 9H14.3182L9.81818 4.5V9Z"
                  fill="#05B1A8"
                />
              </svg>
            </span>

            <span className={styles.button} onClick={() => handleDelete(index)}>
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5H17"
                  stroke="#FF445A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 9V15"
                  stroke="#FF445A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 9V15"
                  stroke="#FF445A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5M2 5L3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5H2Z"
                  stroke="#FF445A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </header>
        <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
          Pergunta
        </Title>
        <InputGroup>
          <Input
            defaultValue={trails[index]?.data?.name}
            ref={register({ required: true })}
            errors={errors}
            disabled={!editable}
            name="name"
            errorMessage="Digite a pergunta"
            placeholder="Digite a pergunta"
          ></Input>
        </InputGroup>
        <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
          Descrição da pergunta
        </Title>
        <Textarea
          defaultValue={trails[index]?.data?.name}
          ref={register({ required: true })}
          errors={errors}
          disabled={!editable}
          name="description"
          rows={3}
          errorMessage="Digite a descrição da pergunta"
          placeholder="Digite a descrição da pergunta"
        ></Textarea>
        {/* <InputGroup> */}
        <div className={styles.options}>
          {answers.map((item, i) => (
            <div key={i} className={styles.answer}>
              <input
                ref={register()}
                className={styles.radio}
                type="radio"
                defaultChecked={item.isCorrect}
                id={`options[${i}].is_correct`}
                name={`options[${i}].is_correct`}
              />
              <label onClick={() => handleCorrect(i)} className={styles.mark}>
                {i + 1}
              </label>
              <div style={{ flex: 1 }}>
                <div>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Opção {item.isCorrect}
                  </Title>
                  <Input
                    disabled={!editable}
                    ref={register()}
                    name={`options[${i}].name`}
                    control={control}
                    errors={errors}
                    errorMessage="Digite a opção de resposta"
                    placeholder="Digite a opção de resposta"
                  />
                </div>
                <div>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Descrição
                  </Title>
                  <Input
                    disabled={!editable}
                    ref={register()}
                    name={`options[${i}].description`}
                    control={control}
                    errors={errors}
                    errorMessage="Explique sobre essa resposta"
                    placeholder="Explique sobre essa resposta"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
          <AddGroup
            onClick={() =>
              setAnswers((prev) => [...prev, { isCorrect: false }])
            }
            text="Adicionar opção"
          />
          {answers?.length > 1 && (
            <RemoveGroup
              onClick={() => setAnswers((state) => [...state].slice(0, -1))}
              text="Remover opção"
            />
          )}
        </InputGroup>
        {/* </InputGroup> */}
        {editable && (
          <Button Tag={"button"} submit type={"green"}>
            Salvar
          </Button>
        )}
      </form>
    </Card>
  );
};

export { Question };
