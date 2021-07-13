import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "components/Card";
import { Loading } from "components/Loading";
import { Title, Text } from "components/Text";
import {
  InputGroup,
  Input,
  InputFile,
  Textarea,
  AddGroup,
  RemoveGroup,
  SelectInputMulti,
  InputWithMask,
  Radio,
} from "components/Inputs";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";

import { skills as skillsFetch } from "services/skills";

import "react-toastify/dist/ReactToastify.css";

const Challenge = ({
  noShadow = true,
  handleStep,
  handleGoBack,
  handleHasAvaliation,
  hasAvaliation,
  handleSubmit: handleIsSubmit,
}) => {
  const [countResume, setCountResume] = useState(0);
  const [materials, setMaterials] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [skills, setSkills] = useState([]);

  const dispatch = useDispatch();
  const { data: skillsData } = useSelector((state) => state.skills);
  const { loading } = useSelector((state) => state.cep);

  const { register, errors, control, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });

  useEffect(() => {
    dispatch(skillsFetch());
  }, [dispatch]);

  useEffect(() => {
    skillsData?.length && setSkills([skillsData]);
  }, [skillsData]);

  const handleCountChar = (e) => {
    setCountResume(e.target.value.length);
  };

  const onSubmit = (data) => {
    const materialsCounter = {};
    for (let i = 0; i < 10; i++) {
      if (data[`materials_${i}`])
        materialsCounter[`materials_${i}`] = data[`materials_${i}`][0];
    }
    const dataWithMaterials = { ...data, materialsCounter };
    console.log(dataWithMaterials);
    if (handleHasAvaliation) {
      handleIsSubmit("trail", dataWithMaterials);
    } else {
      handleStep("avaliacao", dataWithMaterials);
    }
  };

  const marginTitulo = {
    marginBottom: 32,
  };
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Sobre o desafio</Title>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Nome do desafio
          </Title>
          <InputGroup>
            <Input
              defaultValue={""}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Digite o nome do desafio"
              name="name"
              placeholder="Digite o nome do desafio"
            ></Input>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Capa do desafio
          </Title>
          <InputGroup>
            <InputFile
              ref={register()}
              name={`curriculum`}
              control={control}
              accept="image/png, image/gif, image/jpeg"
              errors={errors}
              errorMessage={errors?.curriculum?.message}
            >
              Capa em JPG ou PNG (limite de 4mb):
            </InputFile>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Resumo do desafio
          </Title>
          <InputGroup>
            <Textarea
              defaultValue={""}
              disabled={loading}
              ref={register({ required: true })}
              name="resume"
              onChange={handleCountChar}
              errors={errors}
              maxLength="140"
              rows="3"
              errorMessage="Escreva aqui o que é o desafio"
              placeholder="Escreva aqui o que é o desafio"
            ></Textarea>
            <div
              style={{ width: "100%", font: { size: 14 }, textAlign: "right" }}
            >
              {countResume}/140
            </div>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Descreva o desafio
          </Title>
          <InputGroup>
            <Textarea
              defaultValue={""}
              disabled={loading}
              ref={register({ required: true })}
              name="description"
              errors={errors}
              rows="12"
              errorMessage="Escreva aqui a descrição completa do desafio"
              placeholder="Escreva aqui a descrição completa do desafio"
            ></Textarea>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Prazo do desafio
          </Title>
          <InputGroup>
            <InputWithMask
              defaultValue={""}
              disabled={loading}
              control={control}
              ref={register({ required: true })}
              name="deadline"
              errors={errors}
              mask="99/99/9999"
              rows="12"
              errorMessage="Digite o prazo do desafio"
              placeholder="Digite o prazo do desafio"
            ></InputWithMask>
          </InputGroup>
          <InputGroup>
            <div>
              <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                Materiais
              </Title>
              {materials.map((item, index) => (
                <InputFile
                  key={index}
                  disabled={loading}
                  ref={register()}
                  name={`materials_${index}`}
                  control={control}
                  errors={errors}
                  errorMessage="Descreva sua solução"
                  placeholder="Descreva sua solução"
                />
              ))}
              <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
                <AddGroup
                  onClick={() => setMaterials((prev) => [...prev, prev++])}
                  text="Adicionar material"
                />
                {materials?.length > 1 && (
                  <RemoveGroup
                    onClick={() =>
                      setMaterials((state) => [...state].slice(0, -1))
                    }
                    text="Remover material"
                  />
                )}
              </InputGroup>
            </div>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Vídeo de apresentação
          </Title>
          <InputGroup>
            <Input
              defaultValue={""}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Cole o link do vídeo"
              name="link"
              placeholder="Cole o link do vídeo"
            ></Input>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Premiação
          </Title>
          <InputGroup>
            <Input
              defaultValue={""}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Digite a premiação"
              name="prize"
              placeholder="Digite a premiação"
            ></Input>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Skills
          </Title>
          {/* {console.log(availableSkills[0])} */}
          <InputGroup>
            <SelectInputMulti
              name={`skills`}
              // ref={register({ required: true })}
              control={control}
              placeholder="Digite sua skill"
            />
          </InputGroup>
        </Card>

        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Insígnias</Title>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Nome da insígnia
          </Title>
          <InputGroup>
            <Input
              defaultValue={""}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Digite o nome da insígnia"
              name="badge_name"
              placeholder="Digite o nome da insígnia"
            ></Input>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Descrição da insígnia
          </Title>
          <InputGroup>
            <Input
              defaultValue={""}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Descrição da insígnia"
              name="badge_description"
              placeholder="Descrição da insígnia"
            ></Input>
          </InputGroup>
        </Card>

        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Pessoas mentoras</Title>

          {mentors.map((social, index) => {
            return (
              <InputGroup key={index}>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Nome do mentor {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.link}
                    ref={register({ required: true })}
                    errors={errors}
                    errorMessage="Nome do mentor"
                    name={`mentors.${index}.name`}
                    placeholder="Nome do mentor"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    E-mail do Mentor {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.platform}
                    ref={register({ required: true })}
                    name={`mentors.${index}.email`}
                    control={control}
                    errors={errors}
                    errorMessage="E-mail do mentor"
                    placeholder="E-mail do mentor"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Senha do mentor {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.link}
                    ref={register({ required: true })}
                    errors={errors}
                    errorMessage="Repita a senha"
                    name={`mentors.${index}.password`}
                    placeholder="Repita a senha"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Repita a senha do mentor {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.platform}
                    ref={register({ required: true })}
                    name={`mentors.${index}.repeat_password`}
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
              onClick={() => setMentors((prev) => [...prev, prev++])}
              text="Adicionar mentor"
            />
            {mentors?.length > 1 && (
              <RemoveGroup
                onClick={() => setMentors((state) => [...state].slice(0, -1))}
                text="Remover mentor"
              />
            )}
          </InputGroup>
        </Card>

        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Avaliação</Title>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Terá avaliação?
          </Title>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 12 }}
          >
            <Radio
              onChange={() => handleHasAvaliation(true)}
              name={"hasAssessment"}
            >
              Sim
            </Radio>
            <Radio
              onChange={() => handleHasAvaliation(false)}
              name={"hasAssessment"}
            >
              Não
            </Radio>
          </div>
        </Card>

        <ButtonGroup>
          <Button Tag={"span"} onClick={() => handleGoBack("job")} type="gray">
            Voltar
          </Button>
          <Button Tag={"button"} submit disabled={loading} type="secondary">
            {hasAvaliation ? "Continuar" : "Salvar"}
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export { Challenge };