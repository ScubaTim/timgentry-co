import Link from 'next/link'
import { Row, Col } from 'reactstrap'

export default function ItemList({ posts, projects }) {

    if (posts === 'undefined') return null
    if (projects === 'undefined') return null

    if (posts) {
        return (
            <div className="mb-5">
                <Row >
                    <Col>
                        <h4 className="my-3 pt-1 font-weight-bold">Recent Articles</h4>
                        {posts.map((post) => {
                            return (
                                <div className="link-wrapper my-2 py-2 px-1">
                                    <Link key={post.slug} href={{ pathname: `/post/${post.slug}` }}>
                                        <a>
                                            <Row className=" d-flex flex-row align-items-center">
                                                <Col xs="auto">
                                                    <h6 style={{ fontSize: "0.8rem" }} className="text-muted d-inline">{post.frontmatter.date}</h6>
                                                </Col>
                                                <Col className="px-0">
                                                    <a className="text-nowrap">{post.frontmatter.title}</a>
                                                </Col>
                                            </Row>
                                        </a>
                                    </Link>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </div>
        )
    }

    if (projects) {
        return (
            <div className=" mb-4">
                <Row >
                    <Col>
                        <h4 className="my-3 py-1 font-weight-bold">Selected Work</h4>
                        {projects.map((project, index) => {
                            return (
                                <div className="link-wrapper my-2 px-1">
                                    <Link key={project.slug} href={`#${index}`}>
                                        <a>
                                            <Row className=" d-flex flex-row align-items-center my-2">
                                                <Col xs="auto">
                                                    <h6 style={{ fontSize: "2rem" }} className="text-muted d-inline">{project.frontmatter.ico}</h6>
                                                </Col>
                                                <Col xs="auto" className=" px-1">
                                                    <a className="text-nowrap">{project.frontmatter.title}</a>
                                                </Col>
                                            </Row>
                                        </a>
                                    </Link>
                                </div>
                            )
                        })
                        }
                    </Col>
                </Row>
            </div>
        )
    }


    return null
}