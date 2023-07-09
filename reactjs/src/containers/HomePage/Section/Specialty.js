import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";

import Slider from "react-slick";

class Specialty extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div className="section-share specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">Chuyên khoa phổ biến</span>
            <button className="section-button">
              <FormattedMessage id="homepage.see-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-item">
                <div className="bg-image specialty" />
                <div className="item-title">Co xung khop</div>
              </div>
              <div className="section-item">
                <div className="bg-image specialty" />
                <div className="item-title">Co xung khop</div>
              </div>
              <div className="section-item">
                <div className="bg-image specialty" />
                <div className="item-title">Co xung khop</div>
              </div>
              <div className="section-item">
                <div className="bg-image specialty" />
                <div className="item-title">Co xung khop</div>
              </div>
              <div className="section-item">
                <div className="bg-image specialty" />
                <div className="item-title">Co xung khop</div>
              </div>
              <div className="section-item">
                <div className="bg-image specialty" />
                <div className="item-title">Co xung khop</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
