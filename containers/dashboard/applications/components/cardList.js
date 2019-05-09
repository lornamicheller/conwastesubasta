import React, { Component, PropTypes } from "react";
import Link from "next/link";
class CardList extends Component {
  static propTypes = {
    req: PropTypes.shape({
      id: PropTypes.number.isRequired,
      articlename: PropTypes.string.isRequired,
      decline_note: PropTypes.string,
      note: PropTypes.string.isRequired,
      projectname: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      regionname: PropTypes.string.isRequired,
      workorder: PropTypes.string.isRequired
    }).isRequired,
    seeMore: PropTypes.bool.isRequired
  };
  render() {
    const { req, seeMore } = this.props;
    const {
      id,
      articlename,
      decline_note,
      note,
      projectname,
      quantity,
      regionname,
      workorder
    } = req;
    return (
      <div className="card">
        <div className="card-block">
          <div className="row">
            <div className="col-sm-12">
              <h4 className="card-title">{articlename}</h4>
              <hr />
            </div>
            <div className="col-sm-6">
              <h5>
                <span className="font-weight-bold">Región: </span>{regionname}
              </h5>
            </div>
            <div className="col-sm-6">
              <h5>
                <span className="font-weight-bold">Proyecto: </span>
                {projectname}
              </h5>
            </div>
            <div className="col-sm-6">
              <h5>
                <span className="font-weight-bold">Cantidad: </span>{quantity}
              </h5>
            </div>
            <div className="col-sm-6">
              <h5>
                <span className="font-weight-bold">Workorder: </span>{workorder}
              </h5>
            </div>
            <div className="col-sm-12">
              <p className="card-text">
                <span className="font-weight-bold">Nota: </span>{note}
              </p>
            </div>
            {seeMore &&
              <div className="col-sm-12">
                <Link href={`/dashboard/applications/detail?id=${id}`}>
                  <a className="black-text d-flex flex-row-reverse">
                    <h5 className="waves-effect p-2">
                      Ver más <i className="fa fa-chevron-right" />
                    </h5>
                  </a>
                </Link>
              </div>}
          </div>
        </div>
      </div>
    );
  }
}
export default CardList;
