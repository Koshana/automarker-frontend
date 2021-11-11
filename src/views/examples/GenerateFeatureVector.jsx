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
import axios from 'axios'
// core components
import UserHeader from "components/Headers/UserHeader.js";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

const code = "var Singleton = (function() { \n var privateVariable = 1 \this.publicMethod = function()    {…};\function privateMethod() {…};\})();"

class GenerateFeatureVector extends React.Component {
    constructor(props) {
        super(props);
        // const data = props.location.state

        this.state = {
            data: ""
        }

        this.OnSubmit = this.OnSubmit.bind(this)
    }

    OnSubmit(e) {
        axios.get('https://auto-grading-system.herokuapp.com/generate_vector').then(resp => {
            console.log(resp.data);
            this.setState({
                data: resp.data.feature_vector
            })
        });
        // this.props.history.push('/admin/generate-marks');
    }

    render() {
        return (
            <>
                <UserHeader />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="6">
                        </Col>
                        <Col className="order-xl-1" xl="6">
                            <Card className="bg-secondary shadow">
                                <CardBody>
                                    <div ref={el => (this.componentRef = el)}>
                                        <Card className="card-profile shadow">
                                            <CardBody className="pt-0 pt-md-4">
                                                <div className="text-left">
                                                    <h3>
                                                        Generate Feature Vector
                                                    </h3>
                                                    <FormGroup>
                                                        <p>{this.state.data}</p>
                                                    </FormGroup>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </CardBody>
                            </Card>
                            <br></br>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <ReactToPrint content={() => this.componentRef} pageStyle="@media print {
                     @page { size: auto !important; }
                        }">
                                            <PrintContextConsumer>
                                                {({ handlePrint }) => (
                                                    <Button
                                                        color="info"
                                                        href="#pablo"
                                                        onClick={this.OnSubmit}
                                                    >
                                                        Generate Feature Vector
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

export default GenerateFeatureVector;
