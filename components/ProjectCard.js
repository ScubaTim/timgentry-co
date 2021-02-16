import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Row, Col, Button, Collapse } from 'reactstrap'

const ProjectCard = ({ title, shortDesc, imageLg, smImages, markdown, link, tech, cardId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div id={cardId} className="border-dashed border rounded p-3 mb-5">
            <Row>
                <Col xs="8">
                    <span className="font-weight-bold">{title}</span>
                    &nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;
                    <span>{shortDesc}</span>
                </Col>
                <Col xs="auto" className="ml-auto">
                    <Button size="sm" className="font-weight-bold" outline onClick={toggle}>{isOpen ? 'LESS' : 'MORE'}</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Collapse isOpen={isOpen}>
                        <div className="mt-3">
                            <hr className="card-hr" />
                            <Row className="d-flex align-items-center my-3 py-3">
                                <Col className="my-2" xs="auto">
                                    {markdown}
                                </Col>
                                <Col className="mt-3 mb-2" xs="auto">
                                    <Link href={link}>
                                        <Button outline alt="site" className="text-uppercase font-weight-bold">Visit {title}</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                        <hr className="card-hr" />
                        <Col className="px-0 mx-0" xs="auto">
                            <div className="pt-3 mt-4">
                                <h5>Technologies Used</h5>
                                <Col xs="auto" lg="6">
                                    <ul className=" pt-3" style={{ columns: "2" }}>
                                        {tech.map((el, i) => {
                                            return (<li className="font-weight-bold font-italic" style={{ listStyle: "circle" }} key={i}>{el}</li>)
                                        })}
                                    </ul>
                                </Col>
                            </div>
                        </Col>
                    </Collapse>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center m-0 p-0 pt-2" >
                <Col xs="12" className={`d-flex justify-content-center align-items-center imgContainer mt-1 mx-3 mb-3 px-3  py-4`}>
                    <Image width="875" height="504" src={imageLg} alt={title} />
                </Col>
                {smImages.map((el, i) => (
                    <Col className={`d-flex justify-content-center align-items-center imgContainer px-3 py-4 ${i === 0 ? `mr-3` : ``} `} key={i} >
                        <Image width="212" height="428" src={el} alt={title} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default ProjectCard