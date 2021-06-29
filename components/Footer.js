import { Container, Row, Col, Button } from 'reactstrap'
import ClipboardCopyBtn from './ClipboardCopyBtn';

const Bio = () => {
    return (
        <>
            <hr />
            <Container fluid>
                <div className="d-lg-none">
                    <Row className="pb-4">
                        <Col>
                            <h5 className="my-4 font-weight-bold">Tim Gentry</h5>
                            <p>Full Stack software engineer with almost 4 years of development experience. I thrive on creatively solving problems to build solutions that are engaging to clients and effortless to use.</p>
                            <p>Exceptional software development is the culmination of teamwork, enthusiasm, understanding, and an agile approach. Implementing solutions that are scalable and performant while exceeding the client's expectations should always be a project's focus.</p>
                        </Col>
                    </Row>
                    <Row className="border-top pb-4">
                        <Col>
                            <h5 className="my-4 font-weight-bold">Technology</h5>
                            <ul className="px-1">
                                <Row>
                                    <Col xs="auto">
                                        <li className="tech-list">ES10 Javascript</li>
                                        <li className="tech-list">React</li>
                                        <li className="tech-list">Redux</li>
                                        <li className="tech-list">Sass/Css</li>
                                        <li className="tech-list">Node.js</li>
                                        <li className="tech-list">Express</li>
                                        <li className="tech-list">Rest</li>
                                        <li className="tech-list">GraphQl</li>
                                        <li className="tech-list">Axios</li>
                                        <li className="tech-list">MongoDB</li>
                                        <li className="tech-list">Mongoose</li>
                                    </Col>
                                    <Col xs="auto">
                                        <li className="tech-list">Webpack</li>
                                        <li className="tech-list">Git</li>
                                        <li className="tech-list">Jest</li>
                                        <li className="tech-list">Enzyme</li>
                                        <li className="tech-list">Heroku</li>
                                        <li className="tech-list">Netlify</li>
                                        <li className="tech-list">Next.js</li>
                                        <li className="tech-list">Gatsby</li>
                                        <li className="tech-list">Reactstrap</li>
                                        <li className="tech-list">Material UI</li>
                                        <li className="tech-list">Styled Components</li>
                                    </Col>
                                </Row>
                            </ul>
                        </Col>
                    </Row>
                    <Row className="border-top mb-2">
                        <Col style={{ width: "100%" }}>
                            <h5 className="my-4 font-weight-bold">Contact</h5>
                            <ul className="px-1">
                                <li className="">
                                    <ClipboardCopyBtn id="clipboardCopy" block >MAIL@TIMGENTRY.DEV</ClipboardCopyBtn>
                                </li>
                                <li className="my-2">
                                    <Button href='https://www.linkedin.com/in/timhgentry/' outline block >LINKEDIN</Button>
                                </li>
                                <li className="my-2">
                                    <Button href='https://github.com/ScubaTim' outline block >GITHUB</Button>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <div className="d-none d-md-none d-lg-block">
                    <Container>
                        <Row>
                            <Col className="d-flex flex-column">
                                <div className="mx-auto">
                                    <h5 className="mb-4 mt-3 font-weight-bold">Tim Gentry</h5>
                                    <div>
                                        <p>Full Stack software engineer with 3 years of development experience. I thrive on creatively solving problems to build solutions that are engaging to clients and effortless to use.</p>
                                        <p>Exceptional software development is the culmination of teamwork, enthusiasm, understanding, and an agile approach. Implementing solutions that are scalable and performant while exceeding the client's expectations should always be a project's focus.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col className="d-flex flex-column">
                                <div className="mx-auto">
                                    <h5 className="mb-4 mt-3 font-weight-bold">Contact</h5>
                                    <div>
                                        <ul className="px-0 mt-3">
                                            <li>
                                                <ClipboardCopyBtn>MAIL@TIMGENTRY.DEV</ClipboardCopyBtn>
                                            </li>
                                            <li className="my-2">
                                                <Button href='https://github.com/ScubaTim' outline >GITHUB</Button>
                                            </li>
                                            <li>
                                                <Button href='https://www.linkedin.com/in/timhgentry/' outline >LINKEDIN</Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col className="d-flex flex-column">
                                <div className="mx-auto">
                                    <h5 className="mb-4 mt-3 font-weight-bold">Technology</h5>
                                    <div>
                                        <ul className="px-0">
                                            <Row>
                                                <Col xs="auto">
                                                    <li className="tech-list">ES10 Javascript</li>
                                                    <li className="tech-list">React</li>
                                                    <li className="tech-list">Redux</li>
                                                    <li className="tech-list">Sass/Css</li>
                                                    <li className="tech-list">Node.js</li>
                                                    <li className="tech-list">Express</li>
                                                    <li className="tech-list">Rest</li>
                                                    <li className="tech-list">GraphQl</li>
                                                    <li className="tech-list">Axios</li>
                                                    <li className="tech-list">MongoDB</li>
                                                    <li className="tech-list">Mongoose</li>
                                                </Col>
                                                <Col xs="auto">
                                                    <li className="tech-list">Webpack</li>
                                                    <li className="tech-list">Git</li>
                                                    <li className="tech-list">Jest</li>
                                                    <li className="tech-list">Enzyme</li>
                                                    <li className="tech-list">Heroku</li>
                                                    <li className="tech-list">Netlify</li>
                                                    <li className="tech-list">Next.js</li>
                                                    <li className="tech-list">Gatsby</li>
                                                    <li className="tech-list">Bootstrap</li>
                                                    <li className="tech-list">Reactstrap</li>
                                                    <li className="tech-list">Material UI</li>
                                                </Col>
                                            </Row>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="text-right pb-3" style={{ width: "100%" }}>
                    <a href="#top" alt="to top" className="font-weight-bold">Back To Top &#8593;</a>
                </div>
            </Container>
        </>
    )
}

export default Bio