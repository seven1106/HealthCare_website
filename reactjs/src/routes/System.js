import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import DoctorManage from "../containers/System/Admin/DoctorManage";
import Header from "../containers/Header/Header";
import ScheduleManage from "../containers/System/Doctor/ScheduleManage";

class System extends Component {
  render() {
    const { systemMenuPath } = this.props;
    return (
      <React.Fragment>
        {this.props.isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/doctor-manage" component={DoctorManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route
                path="/system/schedule-manage"
                component={ScheduleManage}
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
