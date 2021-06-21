import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Project } from "containers/private/Project";
import { Projects } from "containers/private/Projects";
import { Trilha } from "containers/private/Trilha";
import { Forum } from "containers/private/Forum";

import { MainImage } from "components/MainImage";
import { Dialog } from "components/Dialog";
import Button from "components/Button";
import { ProfileCard } from "components/ProfileCard";
import { Loading } from "components/Loading";
import { Title, Text } from "components/Text";
import { TabFlat } from "components/Tabs";
import { SubHeader } from "components/Header";

import { Presentation } from "./components/Presentation";
import { Downloads } from "./components/Downloads";
import { Infos } from "./components/Infos";

import { all, get } from "services/challenges";
import { get as getProject } from "services/project";
import { project as getProjectAsMentor } from "services/projects";

import styles from "./styles.module.sass";

const Challenge = (props) => {
  const [currentChallenge, setCurrentChallenge] = useState();
  const [buttonContent, setButtonContent] = useState();
  const [owned, setOwned] = useState(false);
  const [notGuardianModal, setNotGuardianModal] = useState(false);
  // const isCard = useRef();
  const dispatch = useDispatch();
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: user } = useSelector((state) => state.user);
  const { data: project, loadingProject } = useSelector(
    (state) => state.project
  );
  // const { current: mentorProject } = useSelector((state) => state.projects);
  const { data, loading } = useSelector((state) => state.challenge);
  const challenges = useSelector((state) => state.challenges);

  const { type, id, page, trail_type } = useParams();

  useEffect(() => {
    dispatch(get(usertype, { challenge_id: id }))
      .then((res) => {
        setOwned(true);
      })
      .catch((err) => {
        setOwned(false);
        console.log(err);
      });
  }, [dispatch, usertype, id]);

  // Mentor, jurado
  useEffect(() => {
    if (!!user?.user?.is_mentor || !!user?.user?.is_judge)
      dispatch(
        getProjectAsMentor(usertype, {
          challenge_id: id,
          project_id: trail_type,
        })
      )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    else
      dispatch(getProject(usertype, { challenge_id: id }))
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          // setHasProject(false);
        });
  }, [
    dispatch,
    usertype,
    id,
    trail_type,
    user?.user?.is_mentor,
    user?.user?.is_judge,
  ]);

  // Fetch all
  useEffect(() => {
    dispatch(all(usertype));
  }, [dispatch, usertype]);

  useEffect(() => {
    const data = challenges.data;
    data &&
      setCurrentChallenge(
        [...data].filter((item) => item.id === parseInt(id))[0]
      );
  }, [challenges?.data, id]);

  useEffect(() => {
    data?.team?.id && window.localStorage.setItem("current_team", data.team.id);
  }, [data?.team?.id]);

  const handleClickToSubscribe = (props) => {
    setButtonContent(true);
    console.log(buttonContent);
  };

  const handleCloseBackdrop = (e) => {
    setButtonContent(false);
    // console.log("try close backdrop");
  };

  const handleNotGuardian = () => setNotGuardianModal((prev) => !prev);

  return (
    <>
      {(owned || !!user?.user?.is_mentor || !!user?.user?.is_judge) && (
        <SubHeader>
          <TabFlat to={`/meus-desafios/${type}/${id}/inicio`} color={"white"}>
            Início
          </TabFlat>
          {!!user?.user?.is_mentor || !!user?.user?.is_judge ? (
            <TabFlat
              to={`/meus-desafios/${type}/${id}/projetos`}
              color={"white"}
            >
              Projetos
            </TabFlat>
          ) : project?.project ||
            !project?.team ||
            !!data?.team?.pivot?.is_guardian ? (
            <TabFlat
              to={`/meus-desafios/${type}/${id}/projeto`}
              color={"white"}
            >
              Projeto
            </TabFlat>
          ) : (
            <TabFlat
              Tag={"span"}
              onClick={() => handleNotGuardian()}
              color={"white"}
            >
              Projeto
            </TabFlat>
          )}
          <TabFlat
            to={`/meus-desafios/${type}/${id}/trilha/normal`}
            color={"white"}
          >
            Trilha
          </TabFlat>
          <TabFlat to={`/meus-desafios/${type}/${id}/forum`} color={"white"}>
            Fórum
          </TabFlat>
        </SubHeader>
      )}
      {notGuardianModal && (
        <Dialog handleClose={handleNotGuardian} style={{ textAlign: "center" }}>
          <Title>Sem projeto cadastrado</Title>
          <Text style={{ margin: "12px 0" }}>
            Aguarde o guardião publicar o projeto para poder editar
          </Text>
          <Button
            Tag={"span"}
            type={"green"}
            onClick={() => handleNotGuardian()}
          >
            Fechar
          </Button>
        </Dialog>
      )}
      {owned && !!data?.challenge && (page === "inicio" || !page) && (
        <section className={`${styles.challenge}`}>
          <MainImage data={data.challenge} />
          <Presentation
            handleClickToSubscribe={handleClickToSubscribe}
            data={data.challenge}
            buttonContent={buttonContent}
            isModal={props.isModal}
          />
          {!!data.challenge.materials.length && (
            <Downloads
              data={data.challenge.materials || ""}
              isModal={props.isModal}
            />
          )}
          {/* {!props.isModal && ( */}
          <Infos data={data.challenge} />
          {/* )} */}
          {!props.isModal && !!(data?.team?.users?.length > 0) && (
            <div className={styles.section}>
              <Title size={24}>Equipe</Title>
              <div className={styles.container}>
                {data?.team?.users.map((item) => (
                  <ProfileCard
                    border
                    key={item.id}
                    data={item}
                    keeper={item?.pivot?.is_guardian}
                  ></ProfileCard>
                ))}
              </div>
            </div>
          )}
          {!props.isModal && !data?.team && (
            <div className={styles.section}>
              <Title size={24}>Individual</Title>
              <div className={styles.container}>
                <ProfileCard border data={data?.user}></ProfileCard>
              </div>
            </div>
          )}
          {data?.mentors && !!(data.mentors.length > 0) && (
            <div
              className={
                props.isModal ? styles.section : styles.section__border
              }
              style={{ textAlign: props.isModal ? "left" : "auto" }}
            >
              <Title size={24}>Mentores</Title>
              <div className={styles.container}>
                {data?.mentors?.map((item, index) => (
                  <ProfileCard border data={item} key={item.id} small />
                ))}
              </div>
            </div>
          )}
          {data?.judges && !!(data.judges.length > 0) && (
            <div
              className={
                props.isModal ? styles.section : styles.section__border
              }
              style={{ textAlign: props.isModal ? "left" : "auto" }}
            >
              <Title size={24}>Jurados</Title>
              <div className={styles.container}>
                {data?.judges?.map((item, index) => (
                  <ProfileCard border data={item} key={item.id} small />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
      {!owned && currentChallenge && (
        <section className={`${styles.challenge}`}>
          <MainImage data={currentChallenge} />
          <Presentation
            handleClickToSubscribe={handleClickToSubscribe}
            data={currentChallenge}
            buttonContent={buttonContent}
            isModal={props.isModal}
          />
          <Infos data={currentChallenge} />
          {currentChallenge?.materials?.length > 0 && (
            <Downloads
              data={currentChallenge?.materials}
              // isModal={props.isModal}
            />
          )}
          {currentChallenge?.mentors > 1 && (
            <div
              className={
                props.isModal ? styles.section : styles.section__border
              }
              style={{ textAlign: props.isModal ? "left" : "auto" }}
            >
              <Title size={24}>Mentores</Title>
              <div className={styles.container}>
                {currentChallenge?.mentors?.map((item, index) => (
                  <ProfileCard border data={item} key={item.id} small />
                ))}
              </div>
            </div>
          )}
          {currentChallenge?.judges && !!(currentChallenge.judges.length > 0) && (
            <div
              className={
                props.isModal ? styles.section : styles.section__border
              }
              style={{ textAlign: props.isModal ? "left" : "auto" }}
            >
              <Title size={24}>Jurados</Title>
              <div className={styles.container}>
                {currentChallenge?.judges?.map((item, index) => (
                  <ProfileCard border data={item} key={item.id} small />
                ))}
              </div>
            </div>
          )}
          {buttonContent && (
            <div
              onClick={() => handleCloseBackdrop()}
              className={styles.hasbackdrop}
            ></div>
          )}
        </section>
      )}
      {!!data && (page === "projeto" || !page) && <Project data={data} />}
      {!!data && (page === "projetos" || !page) && <Projects data={data} />}
      {!!data && (page === "trilha" || !page) && <Trilha />}
      {!!data && (page === "forum" || !page) && <Forum />}
      {(loading || loadingProject) && <Loading />}
    </>
  );
};

export { Challenge };
