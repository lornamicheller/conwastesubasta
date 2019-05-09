import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import demoString from "./demoReducer";
import kittens from "./kittensReducer";
import isAuthenticated from "./authReducer";
import requestsList from "./requestsListReducer";
import loading from "./loadingReducer";
import regions from "./regionsReducer";
import projects from "./projectsReducer";
import currentUser from "./currentUserReducer";
import users from "./usersReducer";
import request from "./requestReducer";
import requestSuppliers from "./suppliersReducer";
import supplierRequests from "./supplierRequestsReducer";
import user from "./userReducer";
import { bid, bidders } from "./bidReducer";
import { subscribers } from "./subscribersReducer";

export default combineReducers({
  form: formReducer,
  demoString,
  kittens,
  isAuthenticated,
  requestsList,
  loading,
  regions,
  projects,
  currentUser,
  users,
  request,
  requestSuppliers,
  supplierRequests,
  user,
  bid,
  bidders,
  subscribers
});
