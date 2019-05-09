// @flow
/**
 * verify the permisions of the user to check if it can enter the route or not
 * this code is being executed in the layout component, it will redirect to /dashboard if the user
 * is not allowed in the route.
 * @param route
 * @param roleid
 * @return {boolean}
 */
export default function verifyRoutePermision(route: string, roleid: number) {
  if (route === "/dashboard") {
    return true;
  } else if (route === '/register') {
    return true;
  } else if (
    (route === "/dashboard/buy-request" && roleid === 4) || roleid === 5
  ) {
    return true;
  } else if (
    (route === "/dashboard/request-list" && roleid === 1) ||
    roleid === 5 ||
    roleid === 6
  ) {
    return true;
  } else if (
    (route === "/dashboard/suppliers" && roleid === 3) ||
    roleid === 5 ||
    roleid === 6
  ) {
    return true;
  } else if (
    (route === "/dashboard/applications" && roleid === 2) ||
    roleid === 5 ||
    roleid === 6
  ) {
    return true;
  } else if (
    (route === "/dashboard/applications/detail" && roleid === 2) ||
    roleid === 5 ||
    roleid === 6
  ) {
    return true;
  } else if (route === "/dashboard/admin" && roleid === 5) {
    return true;
  } else if (route === "/dashboard/admin/users/new" && roleid === 5) {
    return true;
  } else if (
    (route === "/dashboard/applications/create-supplier" && roleid === 2) ||
    roleid === 5
  ) {
    return true;
  } else if ((route === "/dashboard/reports/subastas" && roleid === 5) || roleid === 6) {
    return true;
  } else if ((route === "/dashboard/reports/subastas/detail" && roleid === 5) || roleid === 6) {
    return true;
  } else if (route === "/dashboard/account/edit-account") {
    return true;
  } else if (route === "/dashboard/account/set-password") {
    return true;
  } else {
    return false;
  }
}
