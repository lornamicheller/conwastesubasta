// @flow
import React, { Component } from "react";
type Bids = {
  id: number,
  companyname: string,
  bidamount: number,
  requestid: number,
  accepted: boolean,
  acceptedby?: number
};
// Todo: check why flowtype in props don't alert when proptype is different than expected
type Props = {
  bids: Array<Bids>,
  loading: boolean,
  disableWinners: boolean,
  /**
   * set bidder winner and change request to completed
   */
  setWinner: (supplierid: number) => any
};
class SuppliersList extends Component {
  props: Props;

  render() {
    const { bids, loading, disableWinners, setWinner } = this.props;
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apuesta</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{bid.companyname}</td>
                <td>${bid.bidamount}</td>
                <td>
                  {!bid.accepted &&
                    !disableWinners &&
                    <button
                      disabled={loading || disableWinners}
                      className="btn btn-outline-primary btn-sm waves-effect"
                      style={{ margin: 0 }}
                      onClick={() => setWinner(bid.id)}
                    >
                      Seleccionar como Ganador
                    </button>}
                  {bid.accepted &&
                    <button
                      disabled={loading || disableWinners}
                      className="btn btn-outline-success btn-sm waves-effect"
                      style={{ margin: 0 }}
                    >
                      <i className="fa fa-check" /> Ganador
                    </button>}
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    );
  }
}
export default SuppliersList;
