import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { languages } from "../../../utils";
import { getDetailInforDoctorApi } from "../../../services/userService";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProFile: {},
    };
  }
  async componentDidMount() {
    let res = await getDetailInforDoctorApi(this.props.doctorId);

    this.setState({
      dataProFile: res.data,
    });
  }
  getInforDoctor = async (id) => {
    let result = [];
    if (id) {
      let res = await getDetailInforDoctorApi(id);
      result = res.data;
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.language !== prevState.language) {
    }
  }
  renderTimeBook = (dataTime) => {
    let { language } = this.props;
    console.log("dataTime", dataTime);
    if (dataTime) {
      let time = dataTime.timeType;

      let date = dataTime.date;

      return (
        <>
          <div className="time-book">
            {time} - {date}
          </div>
          <div>Mien phi dat lich</div>
        </>
      );
    }
    return "";
  };

  render() {
    let { dataProFile } = this.state;
    let { dataTime, isShowDescription } = this.props;
    console.log("dataProFile", dataTime);
    let img64 =
      dataProFile && dataProFile.image ? this.state.dataProFile.image : "";
    let { language } = this.props;
    let nameVi,
      nameEn = "";
    if (dataProFile && dataProFile.positionData) {
      nameVi = `${dataProFile.positionData.value_vi}, ${dataProFile.firstName}, ${dataProFile.lastName} `;
      nameEn = `${dataProFile.positionData.value_en}, ${dataProFile.firstName}, ${dataProFile.lastName} `;
    }
    return (
      <>
        <div className="info-doctor-container">
          <div className="intro-dr">
            <div
              className="content-left-dr "
              style={{
                backgroundImage: `url(${img64})`,
                width: "100px",
                height: "100px",
                marginRight: "15px",
                marginBottom: "15px",
              }}
            ></div>
            <div className="content-right-dr">
              <div className="name-dr">
                {language === languages.VI ? nameVi : nameEn}
              </div>
              <div className="specialty-dr">
                {
                  isShowDescription === true
                  ? dataProFile &&
                    dataProFile.markdown &&
                    dataProFile.markdown.description && (
                      <span>{dataProFile.markdown.description}</span>
                    )
                  :
                  this.renderTimeBook(dataTime)
                }
              </div>
            </div>
          </div>
          <div className="detail-info">
            <div className="price">
              <span className="left">
                <FormattedMessage id="extra-info.price" />
              </span>
              <span className="right">
                {dataProFile &&
                dataProFile.detailDoctor &&
                language === languages.VI ? (
                  <NumberFormat
                    value={dataProFile.detailDoctor.priceData.value_vi}
                    className="currency"
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix=" VND"
                  />
                ) : (
                  ""
                )}
                {dataProFile &&
                dataProFile.detailDoctor &&
                language === languages.EN ? (
                  <NumberFormat
                    value={dataProFile.detailDoctor.priceData.value_en}
                    className="currency"
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix=" USD"
                  />
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="payment">
              <span className="left">
                <FormattedMessage id="extra-info.payment" />
              </span>
              <span className="right">
                {dataProFile &&
                dataProFile.detailDoctor &&
                language === languages.VI
                  ? dataProFile.detailDoctor.paymentData.value_vi
                  : ""}
                {dataProFile &&
                dataProFile.detailDoctor &&
                language === languages.EN
                  ? dataProFile.detailDoctor.paymentData.value_en
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
