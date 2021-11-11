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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import axios from 'axios'
import AddAlert from "@material-ui/icons/AddAlert";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Snackbar from "components/Snackbar/Snackbar";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      email: '',
      password: '',
      user: ''
    };

    this.OnChangeEmail = this.OnChangeEmail.bind(this)
    this.OnChangePassword = this.OnChangePassword.bind(this)
    this.OnLogin = this.OnLogin.bind(this)
  }

  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function () {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  OnChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  OnChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  OnLogin(e) {
    e.preventDefault()
    const obj = {
      email: this.state.email,
      passwrd: this.state.password
    };
    console.log("@@ ", obj);
    // axios.post('http://localhost:5000/login/loginUser', obj).then(res => {
    //   if(!res.data.message){
    //   sessionStorage.setItem("userId", res.data.userId);
    //   sessionStorage.setItem("token", res.data.token);
    //   sessionStorage.setItem("userRole", res.data.typeOfEmp)
    //   sessionStorage.setItem("email", res.data.email)
    //   this.props.history.push('/admin/index');
    //   }else{
    //     throw new Error('User Login Error.');
    //   }
    // })
    // .catch(err => {
    //   this.showNotification("tr")
    // })
    if (this.state.email == '' || this.state.password == '') {
      this.showNotification("tr")
    } else {
      var name = this.state.email.substring(0, this.state.email.lastIndexOf("@"));
      var user = this.state.email.substring(this.state.email.lastIndexOf("@") + 1, this.state.email.lastIndexOf("."));

      if (user == "lec") {
        sessionStorage.setItem("key", "lecturer");
      } else if (user == "stu") {
        sessionStorage.setItem("key", "student");
      }

      sessionStorage.setItem("user", user);
      sessionStorage.setItem("name", name);
      this.showNotification("tc")
      this.props.history.push('/admin/index');
    }
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/icons/common/github.svg")
                          .default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/icons/common/google.svg")
                          .default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      value={this.state.email}
                      onChange={this.OnChangeEmail}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      value={this.state.password}
                      onChange={this.OnChangePassword}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={this.OnLogin}>
                    Sign in
                  </Button>
                </div>
                <Snackbar
                  place="tc"
                  color="danger"
                  icon={ErrorOutlineIcon}
                  message="Error In User Login"
                  open={this.state.tr}
                  closeNotification={() => this.setState({ tr: false })}
                  close
                />
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
