import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loadingActions from "../../../../actions/loadingActions";
import * as usersActions from "../../../../actions/usersActions";
import { updateUser } from "../../../../api/users";
import { uploadFile, saveSingleFile } from "../../../../api/files";
import Layout from "../../../../components/layout";
import ProfileForm from "./components/profileForm";
import FileForm from "./components/fileForm";
class EditAccount extends Component {
  static propTypes = {
    /**
     * redux function to fetch single user and set it as `user` in store variables
     */
    getAsyncSingleUserAction: PropTypes.func.isRequired,
    /**
     * redux function to set the loading boolean
     */
    setLoading: PropTypes.func.isRequired,
    /**
     * redux boolean to check loading is active
     */
    loading: PropTypes.bool.isRequired,
    /**
     * redux object of fetched user by id (current user)
     */
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      companyname: PropTypes.string,
      companyphone: PropTypes.string,
      contactname: PropTypes.string,
      w9_url: PropTypes.string,
      merchant_registration_url: PropTypes.string,
      corporation_certificate_url: PropTypes.string
    }).isRequired
  };
  constructor(props) {
    super(props);

    const {
      id,
      name,
      lastname,
      email,
      companyname,
      companyphone,
      contactname,
      w9_url,
      merchant_registration_url,
      corporation_certificate_url
    } = props.user;

    this.state = {
      user: {
        id,
        name: name || "",
        lastname: lastname || "",
        email: email || "",
        companyname: companyname || "",
        companyphone: companyphone || "",
        contactname: contactname || "",
        w9_url: w9_url || "",
        merchant_registration_url: merchant_registration_url || "",
        corporation_certificate_url: corporation_certificate_url || ""
      },
      disable: true,
      uploadingFile: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.fileInputChange = this.fileInputChange.bind(this);
    this.changeFile = this.changeFile.bind(this);
  }
  componentDidMount() {
    console.log(this.state.user);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    let user = { ...this.state.user };

    user[name] = value;

    this.setState({ user });

    if (user.name !== "" && user.lastname !== "" && user.email !== "") {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  }

  async saveProfile(e) {
    e.preventDefault();
    this.props.setLoading(true);
    try {
      await updateUser(this.state.user);
      toastr["success"]("Perfil editado.");
    } catch (err) {
      if (err.response && err.response.data)
        console.error("Error: ", err.response.data);
      console.error("Error: ", err);
      toastr["error"](
        "Hubo un error. Intente de nuevo o verifíque consola para más información."
      );
    }
    this.props.setLoading(false);
  }

  async fileInputChange(type: Number) {
    const { setLoading, user, getAsyncSingleUserAction } = this.props;
    const selector = jQuery(`#file${type}`);
    const file = selector[0].files[0];
    if (!file) return;
    setLoading(true);
    this.setState({ uploadingFile: true });
    try {
      const uploadResponse = await uploadFile(file);
      const saveResponse = await saveSingleFile(
        uploadResponse.data,
        user.id,
        type
      );
      const userObject = {
        id: user.id,
        w9_id: type === 1 ? saveResponse.data.id : null,
        merchant_registration_id: type === 2 ? saveResponse.data.id : null,
        corporation_certificate_id: type === 3 ? saveResponse.data.id : null
      };
      await updateUser(userObject);
      await getAsyncSingleUserAction(user.id);
      toastr["success"]("Archivo subido y guardado correctamente.");
    } catch (err) {
      toastr["error"](
        "Ha habido un error. Verificar consola o contactar soporte."
      );
      console.error(err);
    }
    setLoading(false);
    this.setState({ uploadingFile: false });
  }
  changeFile(type: Number) {
    const selector = jQuery(`#file${type}`);
    selector.click();
  }

  render() {
    const { user, uploadingFile, disable } = this.state;
    const { loading } = this.props;
    return (
      <Layout title="Editar perfil">
        <div className="container">
          <div className="row" style={{ marginTop: 25 }}>
            <div className="col-12">
              <h1>Editar perfil</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="card">
                <ProfileForm
                  user={user}
                  saveProfile={this.saveProfile}
                  loading={loading}
                  handleInputChange={this.handleInputChange}
                  disable={disable}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="card">
                <FileForm
                  loading={loading}
                  changeFile={this.changeFile}
                  fileInputChange={this.fileInputChange}
                  uploadingFile={uploadingFile}
                  user={this.props.user}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...loadingActions, ...usersActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
