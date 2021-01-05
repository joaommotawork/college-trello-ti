import styles from '../styles/App.module.css'

import { useEffect, useState } from 'react'

import Head from 'next/head'

import dynamic from 'next/dynamic'
const Board = dynamic(import('../components/Board'))

export default function Home() {
    const [winReady, setWinReady] = useState(false)
    useEffect(() => {
        setWinReady(true)
    }, [])

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.App}>
                {winReady ? <Board /> : null}
            </div>
        </div>
    )
}
