import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader/HomeHeader";
class HomePage extends Component {
  render() {

    return (
      <div className="home-page-container">
        <HomeHeader />
        
            <div className="home-page-title">
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
