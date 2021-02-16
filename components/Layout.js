import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { Container } from 'reactstrap'

export default function Layout({ children, pageTitle, theme, themeToggler, ...props }) {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{pageTitle}</title>
            </Head>

            <section>
                <Container fluid >
                    <Header theme={theme} themeToggler={themeToggler} />
                </Container>
                <hr />

                <div className="content">{children}</div>
                <Footer />
            </section>
        </>
    )
}