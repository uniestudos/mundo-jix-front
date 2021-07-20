import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "components/Card";
import { Loading } from "components/Loading";
import { Title, Text } from "components/Text";
import { InputGroup, Input, AddGroup, RemoveGroup } from "components/Inputs";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";

import "react-toastify/dist/ReactToastify.css";

const Avaliation = ({
  noShadow = true,
  handleStep,
  handleGoBack,
  handleSubmit: handleSubmitData,
}) => {
  const [assessments, setAssessments] = useState([]);
  const [judges, setJudges] = useState([]);

  const { loading } = useSelector((state) => state.cep);
  const { register, errors, control, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    // console.log(data);
    handleSubmitData("end", data);
  };

  const marginTitulo = {
    marginBottom: 32,
  };
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Sobre a avaliação</Title>
          {assessments.map((item, index) => {
            return (
              <InputGroup key={index}>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    O que deseja avaliar?
                  </Title>
                  <Input
                    // defaultValue={social.link}
                    ref={register({ required: true })}
                    errors={errors}
                    errorMessage="Digite o critério que deseja avaliar"
                    name={`assessments.new.${index}.evaluate`}
                    placeholder="Digite o critério que deseja avaliar"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Nota máxima {index + 1}
                  </Title>
                  <Input
                    // defaultValue={social.platform}
                    ref={register({ required: true })}
                    name={`assessments.new.${index}.max_grade`}
                    control={control}
                    errors={errors}
                    errorMessage="Nota máxima"
                    placeholder="Digite a nota máxima"
                  ></Input>
                </div>
              </InputGroup>
            );
          })}

          <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
            <AddGroup
              onClick={() => setAssessments((prev) => [...prev, prev++])}
              text="Adicionar critério"
            />
            {assessments?.length > 1 && (
              <RemoveGroup
                onClick={() =>
                  setAssessments((state) => [...state].slice(0, -1))
                }
                text="Remover critério"
              />
            )}
          </InputGroup>
        </Card>

        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Pessoas juradas</Title>

          {judges.map((social, index) => {
            return (
              <InputGroup key={index}>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Nome do Jurado {index + 1}
                  </Title>

                  <Input
                    defaultValue={social.link}
                    ref={register({ required: true })}
                    errors={errors}
                    errorMessage="Nome do jurado"
                    name={`judges.${index}.name`}
                    placeholder="Nome do jurado"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    E-mail do Jurado {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.platform}
                    ref={register({ required: true })}
                    name={`judges.${index}.email`}
                    control={control}
                    errors={errors}
                    errorMessage="E-mail do jurado"
                    placeholder="E-mail do jurado"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Senha do jurado {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.link}
                    ref={register({ required: true })}
                    errors={errors}
                    errorMessage="Repita a senha"
                    name={`judges.${index}.password`}
                    placeholder="Repita a senha"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Repita a senha do jurado {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.platform}
                    ref={register({ required: true })}
                    name={`judges.${index}.repeat_password`}
                    control={control}
                    errors={errors}
                    errorMessage="Repita a senha"
                    placeholder="Repita a senha"
                  ></Input>
                </div>
              </InputGroup>
            );
          })}

          <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
            <AddGroup
              onClick={() => setJudges((prev) => [...prev, prev++])}
              text="Adicionar jurado"
            />
            {judges?.length > 1 && (
              <RemoveGroup
                onClick={() => setJudges((state) => [...state].slice(0, -1))}
                text="Remover jurado"
              />
            )}
          </InputGroup>
        </Card>

        <ButtonGroup>
          <Button
            Tag={"span"}
            onClick={() => handleStep("desafio")}
            type="gray"
          >
            Voltar
          </Button>
          <Button Tag={"button"} submit disabled={loading} type="secondary">
            Finalizar
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export { Avaliation };
