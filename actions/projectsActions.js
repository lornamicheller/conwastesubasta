import { getProjectsByRegion } from "../api/projects";
export const GET_PROJECTS_BY_REGION = "GET_PROJECTS_BY_REGION";

export function setProjectsAction(projects: Object[]) {
  return {
    type: GET_PROJECTS_BY_REGION,
    projects
  };
}

export function getAsyncProjectsByRegionAction(regionId: number) {
  return async dispatch => {
    try {
      console.log("AM I?");
      const projectsResponse = await getProjectsByRegion(regionId);
      const projects = projectsResponse.data;
      await dispatch(setProjectsAction(projects));
    } catch (err) {
      if (err.response && err.response.data)
        console.error("Error: ", err.response.data);
      console.error(err);
      await dispatch(setProjectsAction([]));
    }
  };
}
