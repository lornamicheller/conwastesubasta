import { GET_PROJECTS_BY_REGION } from "../actions/projectsActions";

export default function projects(state: Object[] = [], action: Object) {
  switch (action.type) {
    case GET_PROJECTS_BY_REGION:
      return Object.assign([], ...state, action.projects);
    default:
      return state;
  }
}
