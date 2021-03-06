import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useParams } from "react-router-dom"

import { Title } from "components/Text"
import { Loading } from "components/Loading"
import { SubHeader } from "components/Header"
import { TabFlat } from "components/Tabs"
import { ChallengeCard } from "components/ChallengeCard"

import styles from "./styles.module.sass"
import { all, my } from "services/challenges"

const Challenges = (props) => {
	const dispatch = useDispatch()
	const location = useLocation()
	const { type } = useParams()
	const [autodesafio, setAutodesafio] = useState([])
	const [inCompany, setInCompany] = useState([])
	const [ultradesafio, setUltradesafio] = useState([])
	const [signedChallenges, setSignedChallenges] = useState([])
	const { data, loading } = useSelector((state) => state.challenges)
	const { data: myChallenges, loading: loadingMyChallenges } = useSelector(
		(state) => state.myChallenges
	)

	useEffect(() => {
		dispatch(all())
	}, [dispatch])

	useEffect(() => {
		dispatch(my())
	}, [dispatch])

	useEffect(() => {
		if (data) {
			const autodesafio = [...data].filter(
				(item) => item.challenge_type === "autodesafio"
			)
			const in_company = [...data].filter(
				(item) => item.challenge_type === "in_company"
			)
			const ultradesafio = [...data].filter(
				(item) => item.challenge_type === "ultradesafio"
			)
			setAutodesafio((prev) => autodesafio)
			setInCompany((prev) => in_company)
			setUltradesafio((prev) => ultradesafio)
		}
	}, [data])

	useEffect(() => {
		if (myChallenges) {
			for (let i = 0; i < myChallenges.length; i++) {
				setSignedChallenges((prev) => [...prev, myChallenges[i]?.id])
			}
		}
	}, [myChallenges])

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>
					Mundo Jix - Desafios -{" "}
					{(type === "autodesafio" && "Autodesafios") ||
						(type === "in_company" && "In Company") ||
						(type === "ultradesafio" && "Ultradesafios")}
				</title>
				{/* <link rel="canonical" href="http://mysite.com/example" /> */}
			</Helmet>
			<SubHeader>
				<TabFlat to={`/desafios/autodesafio`} color={"white"}>
					Autodesafio
				</TabFlat>
				<TabFlat to={`/desafios/in_company`} color={"white"}>
					In company
				</TabFlat>
				<TabFlat to={`/desafios/ultradesafio`} color={"white"}>
					Ultradesafio
				</TabFlat>
			</SubHeader>
			<section className={styles.container}>
				<Title className={styles.title}>Desafios</Title>
				<section className={styles.content}>
					{loading && !data && <Loading />}
					{type === "autodesafio" &&
						!!autodesafio.length &&
						autodesafio?.map((item, index) => (
							<ChallengeCard
								canSubscribe
								isExpired={item.deadline}
								loading={loadingMyChallenges}
								subscribed={signedChallenges.includes(item.id)}
								noButton
								item={item}
								key={item.id}
								to={`${location.pathname}/modal/desafio/${item.id}`}
							/>
						))}
					{type === "autodesafio" && !autodesafio?.length && !loading && (
						<>Sem Autodesafios cadastrados.</>
					)}
					{type === "in_company" &&
						!!inCompany.length &&
						inCompany?.map((item, index) => (
							<ChallengeCard
								canSubscribe
								isExpired={item.deadline}
								loading={loadingMyChallenges}
								subscribed={signedChallenges.includes(item.id)}
								noButton
								item={item}
								key={item.id}
								to={`${location.pathname}/modal/desafio/${item.id}`}
							/>
						))}
					{type === "in_company" && !inCompany.length && !loading && (
						<>Sem desafios In Company cadastrados</>
					)}

					{type === "ultradesafio" &&
						!!ultradesafio.length &&
						ultradesafio?.map((item, index) => (
							<ChallengeCard
								canSubscribe
								loading={loadingMyChallenges}
								subscribed={signedChallenges.includes(item.id)}
								noButton
								item={item}
								key={item.id}
								to={`${location.pathname}/modal/desafio/${item.id}`}
							/>
						))}
					{type === "ultradesafio" && !ultradesafio.length && !loading && (
						<>Sem Ultradesafios cadastrados</>
					)}
				</section>
			</section>
		</>
	)
}

export { Challenges }
