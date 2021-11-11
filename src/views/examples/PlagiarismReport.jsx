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

const list = [
  {
    id: 'IT1731XXXX',
    firstname: '10 %',
  },
  {
    id: 'IT1732XXXX',
    firstname: '15 %',
  },
  {
    id: 'IT1733XXXX',
    firstname: '20 %',
  },
];

class PlagiarismReport extends React.Component {
  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="9">
              <div ref={el => (this.componentRef = el)}>
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
                  <br></br>
                  <Row className="align-items-center">
                    <Col xs="2">
                      <h3 className="mb-0">Plagiarism : </h3>
                    </Col>
                    <Col className="text-left" xs="2">
                      <Button
                        color="danger"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="xm"
                      >
                        21 %
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <ul>
                    {list.map(item => (
                      <li key={item.id}>
                        <Row className="align-items-center">
                          <Col xs="2">
                            <div>{item.id}</div>
                          </Col>
                          <Col xs="2">
                            <div>{item.firstname}</div>
                          </Col>
                        </Row>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
              </div>
            </Col>
          </Row>
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
                        Print Plagiarism Report
                      </Button>
                      // <i class="fa fa-fw fa-file-excel-o fa-2x" onClick={handlePrint}></i>
                    )}
                  </PrintContextConsumer>
                </ReactToPrint>
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PlagiarismReport;
