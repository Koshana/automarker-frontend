import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

const code = "var Singleton = (function() { \n var privateVariable = 1 \this.publicMethod = function()    {…};\function privateMethod() {…};\})();"

class Feedback extends React.Component {
  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="6">
              <div ref={el => (this.componentRef = el)}>
                <Card className="card-profile shadow">
                  <CardBody className="pt-0 pt-md-4">
                    <div className="text-left">
                      <h3>
                        Feedback
                      </h3>
                      <FormGroup>
                        <p>"I think it would help me to have more expressive variable names."</p>
                      </FormGroup>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col className="order-xl-1" xl="6">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Module : OOP</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        {sessionStorage.getItem("name")}
                      </label>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="10">
                          <FormGroup>
                            <div>
                            def findPosition(k, n):<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;f1 = 0<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;f2 = 1<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;i =2;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;while i!=0:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f3 = f1 + f2;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f1 = f2;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f2 = f3;<br />

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if f2%k == 0:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return n*i<br />
                            <br></br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i+=1<br />

                            &nbsp;&nbsp;&nbsp;&nbsp;return
                            </div>
                            {/* <p><b>{code}</b></p> */}
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                  </Form>
                </CardBody>
              </Card>
              <br></br>
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <ReactToPrint content={() => this.componentRef} pageStyle="@media print {
                     @page { size: auto !important; }
                        }">
                      <PrintContextConsumer>
                        {({ handlePrint }) => (
                          <Button
                            color="info"
                            href="#pablo"
                            onClick={handlePrint}
                          >
                            Print Feedback
                          </Button>
                          // <i class="fa fa-fw fa-file-excel-o fa-2x" onClick={handlePrint}></i>
                        )}
                      </PrintContextConsumer>
                    </ReactToPrint>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Feedback;
