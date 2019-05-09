import React, { Component, PropTypes } from "react";
class List extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        regionname: PropTypes.string.isRequired,
        projectname: PropTypes.string.isRequired,
        articlename: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        supervisorname: PropTypes.string.isRequired,
        supervisorlastname: PropTypes.string.isRequired,
        supervisoremail: PropTypes.string.isRequired,
        note: PropTypes.string.isRequired,
        workorder: PropTypes.string.isRequired,
        createdbyname: PropTypes.string.isRequired,
        createdbylastname: PropTypes.string.isRequired,
        createdat: PropTypes.string.isRequired,
        createdbyemail: PropTypes.string.isRequired
      })
    ).isRequired,
    type: PropTypes.oneOf([
      "pending",
      "declined",
      "accepted",
      "completed",
      "winner selected"
    ]).isRequired,
    updateRequestStatus: PropTypes.func,
    loading: PropTypes.bool,
    toggleModal: PropTypes.func
  };
  render() {
    const {
      list,
      type,
      updateRequestStatus,
      loading,
      toggleModal
    } = this.props;
    const classType = () => {
      if (type === "pending") {
        return "";
      } else if (type === "declined") {
        return "text-white danger-color-dark";
      } else if (type === "accepted") {
        return "text-white green";
      } else if (type === "completed") {
        return "text-white blue";
      } else if (type === "winner selected") {
        return "text-white green blue-gradient";
      }
    };
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="list-group">
            {list.map((req, index) => (
              <a
                key={index}
                className={
                  `list-group-item list-group-item-action flex-column align-items-start ${classType()}`
                }
                style={{ cursor: "default" }}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {req.articlename}<br />
                    <span style={{ fontWeight: 300, fontSize: "small" }}>
                      Creado por:{" "}
                      {req.createdbyname}
                      {" "}
                      {req.createdbylastname}
                      {" "}(
                      {req.createdbyemail}
                      )
                    </span>
                  </h5>
                  <small>{req.createdat}</small>
                </div>
                <div className="row" style={{ width: "100%" }}>
                  <div className="col-6 col-sm-3">
                    <p className="">
                      Región:<br />
                      <small>{req.regionname}</small>
                    </p>
                  </div>
                  <div className="col-6 col-sm-3">
                    <p className="">
                      Proyecto:<br />
                      <small>{req.projectname}</small>
                    </p>
                  </div>
                  <div className="col-6 col-sm-3">
                    <p className="">
                      Cantidad:<br />
                      <small>{req.quantity}</small>
                    </p>
                  </div>
                  <div className="col-6 col-sm-3">
                    <p className="">
                      Supervisor:<br />
                      <small>
                        {req.supervisorname} {req.supervisorlastname}
                      </small>
                    </p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <p>
                      Nota:<br />
                      <small>{req.note}</small>
                    </p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <p>
                      Work Order:<br />
                      <small>{req.workorder}</small>
                    </p>
                  </div>
                  {type === "declined" &&
                    <div className="col-12">
                      <p>
                        Nota de porqué se declinó:<br />
                        <span style={{ fontSize: "small" }}>
                          {req.decline_note}
                        </span>
                      </p>
                    </div>}
                </div>
                {type === "pending" &&
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-sm-6">
                      <button
                        className="btn btn-primary waves-effect blue-gradient"
                        style={{ width: "100%" }}
                        onClick={() => updateRequestStatus(req.id, 2)}
                        disabled={loading}
                      >
                        Aprovar
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <button
                        className="btn btn-danger waves-effect"
                        style={{ width: "100%" }}
                        onClick={() => toggleModal("", "", req.id)}
                        disabled={loading}
                      >
                        Declinar
                      </button>
                    </div>
                  </div>}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default List;
