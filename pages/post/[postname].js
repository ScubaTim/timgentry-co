import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { Container } from 'reactstrap'

import Layout from '../../components/Layout'

export default function BlogPost({ siteTitle, frontmatter, markdownBody, theme, themeToggler }) {
    if (!frontmatter) return <></>

    return (
        <Layout themeToggler={themeToggler} theme={theme} pageTitle={`${siteTitle} | ${frontmatter.title}`}>
            <Link href="/">
                <a style={{ textDecoration: "none" }} className="d-flex flex-row align-items-center mx-4"><span style={{ fontSize: "2rem" }}>&#8672;</span>&nbsp;BACK</a>
            </Link>
            <Container className="mt-4 mb-5 pb-5">
                <article>
                    <h1>{frontmatter.title}</h1>
                    <p>By {frontmatter.author}</p>
                    <div >
                        <ReactMarkdown source={markdownBody} />
                    </div>
                </article>
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