import React, { useState } from 'react'
import Link from 'next/link'
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Button } from 'reactstrap'

export default function Header({ theme, themeToggler }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div id="top" style={{ marginBottom: "-16px" }}>
            <Navbar expand="md" className="mb-0 py-0 px-0">
                <NavbarBrand className="mt-0 pt-0 mb-3">
                    <h1 className="display-1 font-weight-bold d-none d-lg-block">
                        <Link href="/">
                            <a>Tim Gentry</a>
                        </Link>
                    </h1>
                    <h1 className="display-2 font-weight-bold d-none d-md-block d-lg-none">
                        <Link href="/">
                            <a>Tim Gentry</a>
                        </Link>
                    </h1>
                    <h1 className="font-weight-bold d-md-none d-lg-none pt-3 mb-0">
                        <Link href="/">
                            <a>Tim Gentry</a>
                        </Link>
                    </h1>
                </NavbarBrand>
                <NavbarToggler className="toggler border p-2" onClick={toggle}>&#x2630;</NavbarToggler>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto mt-4" navbar>
                        <NavItem>
                            <ul>
                                <div className="d-none d-md-block d-lg-block">
                                    <li>
                                        <h5 className="font-weight-bold">Full Stack Developer</h5>
                                    </li>
                                    <li>
                                        <h5 className="font-weight-bold">Mail@Timgentry.dev</h5>
                                    </li>
                                    <li>
                                        <h5 className="font-weight-bold"><a href="https://www.linkedin.com/in/timhgentry/" alt="LinkedIn">LinkedIn</a>&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;
                                    <a href="https://github.com/ScubaTim" alt="Github">Github</a></h5>
                                    </li>
                                </div>
                                <div className="d-md-none d-lg-none mb-4 p-3 border rounded">
                                    <li>
                                        <h5 className="font-weight-bolder" >Full Stack Developer</h5>
                                    </li>
                                    <li>
                                        <h6>Mail@Timgentry.dev</h6>
                                    </li>
                                    <li>
                                        <h6 ><a href="https://www.linkedin.com/in/timhgentry/" alt="LinkedIn">LinkedIn</a>&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;
                                    <a href="https://github.com/ScubaTim" alt="Github">Github</a></h6>
                                    </li>
                                </div>
                                <li>
                                    <Button color="link" outline onClick={() => themeToggler()} className="font-weight-bold mt-3 darkToggle" style={{ width: "100%" }} >{theme === 'dark' ? <div className="d-flex justify-content-around align-items-center" style={{ margin: "-8px 0" }}>LIGHT&nbsp; MODE <span role="img" aria-label="sun" style={{ fontSize: "32px" }}>☀</span></div> : <div className="d-flex justify-content-around align-items-center" style={{ margin: "-8px 0" }}>DARK&nbsp; MODE<span role="img" aria-label="moon" style={{ fontSize: "32px" }}>☽</span></div>}</Button>
                                </li>
                            </ul>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}