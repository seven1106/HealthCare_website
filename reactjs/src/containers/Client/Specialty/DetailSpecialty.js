import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader/HomeHeader";
import { languages } from "../../../utils";
// import "./DetailSpecialty.scss";
import { getDetailSpecialtyByIdApi } from "../../../services/userService";
import HomeFooter from "../../HomePage/Section/HomeFooter";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailSpecialty: {},
    };
  }
  async componentDidMount() {
    if (this.props.match.params.id) {
      let res = await getDetailSpecialtyByIdApi(this.props.match.params.id);
      if (res && res.errCode === 0) {
        this.setState({
          DetailSpecialty: res.data,
        });
      }
    }
  }
  render() {
    let { DetailSpecialty } = this.state;
    let { language } = this.props;
    console.log("DetailSpecialty", DetailSpecialty);

    let img64 =
      DetailSpecialty && DetailSpecialty.image
        ? this.state.DetailSpecialty.image
        : "";
    let name = `${DetailSpecialty.name}`;
    if (DetailSpecialty && DetailSpecialty.name) {
      name = `${DetailSpecialty.name}`;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="detail-doctor-container">
          <div className="detail-doctor-body">
            <div className="intro-dr">
              <div
                className="content-left-dr"
                style={{
                  backgroundImage: `url(${img64})`,
                  width: "100px",
                  height: "100px",
                  marginRight: "15px",
                  marginBottom: "15px",
                }}
              ></div>
              <div className="content-right-dr">
                <div className="name-dr">{name}</div>
                <div className="specialty-dr">
                  {DetailSpecialty &&
                    DetailSpecialty &&
                    DetailSpecialty.descriptionHTML && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DetailSpecialty.descriptionHTML,
                        }}
                      ></div>
                    )}
                </div>
              </div>
            </div>
            <div className="schedule-dr">
              <div className="content-left"></div>
            </div>
            <div className="detail-dr">
              {DetailSpecialty &&
                DetailSpecialty.markdown &&
                DetailSpecialty.markdown.contentHTML && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DetailSpecialty.markdown.contentHTML,
                    }}
                  ></div>
                )}
            </div>
            <div className="cmt-dr">zxc</div>
          </div>
        </div>
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
