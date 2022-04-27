import React from "react";
import './banner.scss';
import BannerImg from '../../Asserts/images/backGround/banner_3.jpg'
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";
import { UserCheck } from 'react-feather'
import FontAwesome from "react-fontawesome";
const Banner = () => {

    return (
        <section>
            <div className="banner_img">
                <div className="con_banner">
                    <div className="container-fluid p-0">
                        <img className="ban_img" src={BannerImg} alt="BannerImg" />
                        <div class="content1">
                            <h2>We Are </h2>
                            <h1>Boost Digital Company.</h1>
                            <p>i don't need therapy, i just need my boat...</p>
                            <button>Our Services</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container-fluid">
                <Row>
                    <Col xl='4' md='2' lg='2' md='6'>
                        <Card className="card_back" style={{ background: "transparent", border: 0 }}>
                            <CardBody>
                                <div className="font_icon">
                                    <FontAwesome className="fa-user-secret font_style" style={{ fontSize: "125px", color: "#303030" }} />
                                </div>
                                <CardTitle> Client Management </CardTitle>
                                <CardText className="cart_text"> The golden half light of dusk was giving way to the deepening,
                                    velveteen shadows of the night when the orange firelight appeared like trees</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl='4' md='2' lg='2' md='6'>
                        <Card className="card_back" style={{ background: "transparent", border: 0 }}>
                            <CardBody>
                                <div className="font_icon">
                                    <FontAwesome className="fa-user-secret font_style" style={{ fontSize: "125px", color: "#303030" }} />
                                    {/* <FontAwesome className="fa-piggy-bank" style={{ fontSize: "125px", color: "#303030" }} /> */}
                                </div>
                                <CardTitle> Investment Planning </CardTitle>
                                <CardText className="cart_text"> The golden half light of dusk was giving way to the deepening,
                                    velveteen shadows of the night when the orange firelight appeared like trees</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl='4' md='2' lg='2' md='6'>
                        <Card className="card_back" style={{ background: "transparent", border: 0 }}>
                            <CardBody>
                                <div className="font_icon">
                                    <FontAwesome className="fa-user-secret font_style" style={{ fontSize: "125px", color: "#303030" }} />
                                    {/* <FontAwesome className="fa-chart-bar" style={{ fontSize: "125px", color: "#303030" }} /> */}
                                </div>
                                <CardTitle> Bussiness Solution </CardTitle>
                                <CardText className="cart_text"> The golden half light of dusk was giving way to the deepening,
                                    velveteen shadows of the night when the orange firelight appeared like trees</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default Banner;