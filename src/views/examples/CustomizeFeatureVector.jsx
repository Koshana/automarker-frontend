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
import ToggleSwitch from "variables/ToggleSwitch";
import Switch from '@mui/material/Switch';
import { StyledEngineProvider } from '@mui/material/styles';

class CustomizeFeatureVector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      status: "Exactly Similar"
    }

    this.OnSubmit = this.OnSubmit.bind(this)
    this.OnhandleChange = this.OnhandleChange.bind(this)
  }

  OnhandleChange = (e) => {
    if (e.target.checked) {
      this.setState({
        checked: e.target.checked,
        status: "Similar Logic"
      }, () => {
        console.log("-- ", this.state.status);
      })
    } else if (!e.target.checked) {
      this.setState({
        checked: e.target.checked,
        status: "Exactly Similar"
      }, () => {
        console.log("-- ", this.state.status);
      })
    }
  };

  OnSubmit(e) {
    this.props.history.push('/admin/generate-marks');
  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="10">
              <Card className="bg-secondary shadow">
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Customize Feature Vector
                    </h6>
                    <div className="pl-lg-4">
                      <Col lg="6">
                        <FormGroup>
                          <Row>
                            {/* <ToggleSwitch label=" " /> */}
                              <lable className="form-control-label">Exactly Similar</lable>
                              <Switch
                                checked={this.state.checked}
                                onChange={this.OnhandleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                              <lable className="form-control-label">Similar Logic</lable>
                          </Row>
                        </FormGroup>
                      </Col>
                      <Row>
                        <Col lg="1.5">
                          <FormGroup>
                            <Button
                              color="success"
                              href="#pablo"
                              onClick={this.OnSubmit}
                            >
                              Submit
                            </Button>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <Button
                              color="info"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Generate Customize Feature Vector
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default CustomizeFeatureVector;
