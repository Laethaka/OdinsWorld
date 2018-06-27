import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import "./Registration.css";

const Registration = () => (
    <Row>
        <Col size="md-7">
            <div className="mx-auto lokiImage">
            <img src="https://cdn.discordapp.com/attachments/446103300069392385/461416265479618580/image_copia.png" width="600px" alt="transparent raven" className="img-responsive"/>
            </div>
        </Col>
        <Col size="md-4">
            <form className="text-light registrationStyling bg-dark rounded">

                {/* email address form */}
                <div className="form-group col-sm-12">
                    <label for="userRegEmail">Email address</label>
                    <input id="userRegEmail" type="email" className="form-control" aria-describedby="emailHelp" placeholder="lokitricks99@asgard.com"/>
                    <small id="emailHelp" className="form-text text-light">ex: lokitricks99@asgard.com</small>
                </div>

                {/* username form */}
                <div className="form-group col-sm-12">
                    <label className="registrationText" for="userRegName">Username</label>
                    <input id="userRegName" type="text" className="form-control" placeholder="Hulk_Smasher85"/>
                    <small id="userHelp" className="form-text text-light">This will be displayed to other players</small>
                </div>

                {/* password form */}
                <div className="form-group form-row col-sm-12 pr-2">
                    <div className="col">
                        <label for="userRegPassword">Password</label>
                        <input id="userRegPassword" type="password" className="form-control" placeholder="Password"/>
                        <small id="userHelp" className="form-text text-light">This will be displayed to other players</small>
                    </div>
                    <div className="col">
                        {/* password validation match */}
                        <label for="userRegPassword"> </label>
                        <input id="userRegPassword" type="password" className="form-control mt-2" placeholder="Password"/>
                        <small id="userHelp" className="form-text text-light">Match your password</small>
                    </div>
                </div>
                <button id="userRegSubmit" type="submit" className="btn btn-secondary ml-3 pl-4 pr-4 float-left">Submit</button>
            </form>
        </Col>
        <Col size="md-1">
           
        </Col>
    </Row>
    
);

export default Registration;
