import matter from 'gray-matter'
import { Container, Row, Col } from 'reactstrap'
import Layout from '../components/Layout'
import ItemList from '../components/ItemList'
import ProjectCard from '../components/ProjectCard'

export default function Home({ posts, projects, title, description, theme, themeToggler, ...props }) {

  const projectDeck = projects && projects.map((project, i) => {
    const { title, shortDesc, imageLg, smImages, link, tech } = project.frontmatter
    const markdown = project.markdownBody

    return (
      <ProjectCard
        key={i}
        title={title}
        shortDesc={shortDesc}
        imageLg={imageLg}
        smImages={smImages}
        markdown={markdown}
        link={link}
        tech={tech}
        cardId={i}
      />
    )
  })

  return (
    <Layout pageTitle={title} theme={theme} themeToggler={themeToggler} >
      <main>
        <Container>
          <Row className="d-flex flex-row align-items-start">
            <Col sm="12" xl="6">
              <ItemList projects={projects} />
            </Col>
            <Col sm="12" xl="6">
              <ItemList posts={posts} />
            </Col>
          </Row>
          <Row>
            <Col>
              {projectDeck}
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  )

}

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const value = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug
      }
    })
    return data
  })(require.context('../posts', true, /\.md$/))


  const projects = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const value = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug
      }
    })
    return data
  })(require.context('../projects', true, /\.md$/))


  return {
    props: {
      posts,
      projects,
      title: configData.default.title,
      description: configData.default.description,
    }
  }
}
