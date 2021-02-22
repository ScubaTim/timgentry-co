import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { Container, Row, Col } from 'reactstrap'

import Layout from '../../components/Layout'

export default function BlogPost({ siteTitle, frontmatter, markdownBody, theme, themeToggler }) {
    if (!frontmatter) return <></>

    return (
        <Layout themeToggler={themeToggler} theme={theme} pageTitle={`${siteTitle} | ${frontmatter.title}`}>
            <Link href="/">
                <a style={{ textDecoration: "none" }} className="d-flex flex-row align-items-center mx-3"><span style={{ fontSize: "2rem" }}>&#8672;</span>&nbsp;BACK</a>
            </Link>
            <Container className="mt-4 mb-5 pb-5">
                <Row>
                    <Col className="mx-auto" xs="12" sm="10" xl="8">
                        <article>
                            <h1 className="display-4">{frontmatter.title}</h1>
                            <p className="mx-2">By {frontmatter.author}</p>
                            <div className="my-5 mx-2">
                                <ReactMarkdown className="article-container" source={markdownBody} />
                            </div>
                        </article>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export async function getStaticProps({ ...ctx }) {
    const { postname } = ctx.params

    const content = await import(`../../posts/${postname}.md`)
    const config = await import(`../../siteconfig.json`)
    const data = matter(content.default)

    return {
        props: {
            siteTitle: config.title,
            frontmatter: data.data,
            markdownBody: data.content,
        }
    }
}

export async function getStaticPaths() {
    const blogSlugs = ((context) => {
        const keys = context.keys()
        const data = keys.map((key, index) => {
            let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)

            return slug
        })
        return data
    })(require.context('../../posts', true, /\.md$/))

    const paths = blogSlugs.map((slug) => `/post/${slug}`)

    return {
        paths,
        fallback: false,
    }
}