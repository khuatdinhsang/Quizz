import axios from "axios";
const root = process.env.REACT_APP_ROOT_ACCOUNT
const accessToken = localStorage.getItem("accessToken");
// export const getAllAccount = (companyId) => {
//     return axios.get(`${root}/ext/users/by-company?companyId=${companyId}`, {
//         headers: { authorization: `Bearer ${accessToken}` }
//     });
// }
export const getAllDepartment = (companyId) => {
    return axios.get(`${root}/int/company/departments?companyId=${companyId}`, {
        headers: { "X-api-key": "1" },
    });
};
export const getStaffByDepartmentId = (departmentId) => {
    return axios.get(
        `${root}/ext/users/by-department?departmentId=${departmentId}`,
        {
            Authorization: `Bearer ${accessToken}`,
        }
    );
};
