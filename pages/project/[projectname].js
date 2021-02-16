// import Link from 'next/link'
// import matter from 'gray-matter'
// import ReactMarkdown from 'react-markdown'
// import { Container, Button } from 'reactstrap'

// import Layout from '../../components/Layout'

// export default function PersonalProject({ siteTitle, frontmatter, markdownBody, themeToggler }) {
//     if (!frontmatter) return <></>
//     console.log('frontmatter', frontmatter)

//     return (
//         <Layout themeToggler={themeToggler} pageTitle={`${siteTitle} | ${frontmatter.title}`}>
//             <div className="my-3 mx-4 px-3">
//                 <Link href="/">
//                     <a>Back to project list</a>
//                 </Link>
//             </div>
//             <Container>
//                 <article>
//                     <h1>{frontmatter.title}</h1>
//                     <p>By {frontmatter.author}</p>
//                     <Link href={frontmatter.link}>
//                         <Button outline className="mt-3 mb-5">Visit {frontmatter.title}</Button>
//                     </Link>
//                     <ReactMarkdown className="markdown-body" source={markdownBody} />
//                 </article>
//             </Container>
//         </Layout>
//     )
// }

// export async function getStaticProps({ ...ctx }) {
//     const { projectname } = ctx.params

//     const content = await import(`../../projects/${projectname}.md`)
//     const config = await import(`../../siteconfig.json`)
//     const data = matter(content.default)

//     return {
//         props: {
//             siteTitle: config.title,
//             frontmatter: data.data,
//             markdownBody: data.content,
//         }
//     }
// }

// export async function getStaticPaths() {
//     const projectSlugs = ((context) => {
//         const keys = context.keys()
//         const data = keys.map((key, index) => {
//             let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)

//             return slug
//         })
//         return data
//     })(require.context('../../projects', true, /\.md$/))

//     const paths = projectSlugs.map((slug) => `/project/${slug}`)

//     return {
//         paths,
//         fallback: false,
//     }
// }