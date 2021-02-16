// import Layout from '../components/Layout'

// const About = ({ title, description, themeToggler, ...props }) => {
//     return (
//         <>
//             <Layout pageTitle={`${title} | About`} description={description} themeToggler={themeToggler}>
//                 <h1>Welcome to my blog!</h1>

//                 <p>{description}</p>

//                 <p>I am a very exciting person.</p>
//             </Layout>
//         </>
//     )
// }

// export default About

// export async function getStaticProps() {
//     const configData = await import(`../siteconfig.json`)

//     return {
//         props: {
//             title: configData.default.title,
//             description: configData.default.description
//         }
//     }
// }