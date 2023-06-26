import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeApi } from "../../../services/userService";
import * as actions from "../../../store/actions";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    // try {
    //   let res = await getAllCodeApi("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }
  //  componentDidUpdate
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
  }

  render() {
    let genders = this.state.genderArr;
    return (
      <div className="userRedux-container">
        <div className="title">Manage products</div>
        <div className="userRedux-body">
          <div className="container">
            <div className="row">
                <form class="row g-3 needs-validation" novalidate>
                  <div class="col-md-4">
                    <label for="validationCustom01" class="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom01"
                      value="Mark"
                      required
                    />
                    <div class="valid-feedback">Looks good!</div>
                  </div>
                  <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom02"
                      value="Otto"
                      required
                    />
                    <div class="valid-feedback">Looks good!</div>
                  </div>
                  <div class="col-md-4">
                    <label for="validationCustomUsername" class="form-label">
                      Phone number
                    </label>
                    <div class="input-group has-validation">
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustomUsername"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <div class="invalid-feedback">
                        Please choose a username.
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label for="validationCustom03" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="validationCustom03"
                      placeholder="name@example.com"
                      required
                    />
                    <div class="invalid-feedback">Please provide a email.</div>
                  </div>
                  <div class="col-md-6">
                    <label for="validationCustom03" class="form-label">
                      Avatar
                    </label>
                    <input class="form-control" type="file" id="formFile" />
                    <div class="invalid-feedback">
                      Please provide a valid city.
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label for="validationCustom03" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="inputPassword6"
                      class="form-control"
                      aria-labelledby="passwordHelpInline"
                      placeholder="Must be 8-20 characters long"
                    />

                    <div class="invalid-feedback">
                      Please provide a valid city.
                    </div>
                  </div>
                  <div class="col-md-3">
                    <label for="validationCustom04" class="form-label">
                      Position
                    </label>
                    <select
                      class="form-select"
                      id="validationCustom04"
                      required
                      // onChange={(e) => {
                      //   this.setState({ roleId: e.target.value });
                      //   console.log("role", this.state.role);
                      // }}
                    >
                      <option selected disabled value="">
                        Choose position...
                      </option>
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {item.value_en}
                            </option>
                          );
                        })}
                    </select>
                    <div class="invalid-feedback">
                      Please select a valid position.
                    </div>
                  </div>
                  <div class="col-md-3">
                    <label for="validationCustom04" class="form-label">
                      Role
                    </label>
                    <select
                      class="form-select"
                      id="validationCustom04"
                      required
                      // onChange={(e) => {
                      //   this.setState({ roleId: e.target.value });
                      //   console.log("role", this.state.role);
                      // }}
                    >
                      <option selected disabled value="">
                        Choose role...
                      </option>
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {item.value_en}
                            </option>
                          );
                        })}
                    </select>
                    <div class="invalid-feedback">
                      Please select a valid role.
                    </div>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary  btn-lg p-2" type="submit">
                      Submit form
                    </button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
