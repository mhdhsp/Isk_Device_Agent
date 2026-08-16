import axiosClient from "./axiosClient";


const BASE_URL = "/User";


const userApi = {


    // GET ALL USERS
    getUsers() {
        console.log("userApi - getUsers called");
        return axiosClient.get(
            `${BASE_URL}/GetAllUsers`
        );
    },


    getById(id) {

        return axiosClient.get(
            `${BASE_URL}/${id}`
        );

    },


    create(user) {

        return axiosClient.post(
            `${BASE_URL}/NewUser`,
            user
        );

    },


    update(id, user) {

        return axiosClient.put(
            `${BASE_URL}/${id}`,
            user
        );

    },


    delete(id) {

        return axiosClient.delete(
            `${BASE_URL}/${id}`
        );

    },


    renewMembership(data) {

        return axiosClient.post(
            `${BASE_URL}/RenewMembership`,
            data
        );

    },


    enableUser(data) {

        return axiosClient.post(
            `${BASE_URL}/Enable`,
            data
        );

    },


    BlockUser(id, device) {

        return axiosClient.post(
            `${BASE_URL}/BlockUser/${id}/${device}`,
        );

    },

    UnblockUser(id, startDate, endDate, device) {
        console.log("userApi - UnblockUser called with id:", id, "startDate:", startDate, "endDate:", endDate, "device:", device);
        return axiosClient.post(
            `${BASE_URL}/UnblockUser/${id}/${device}`,
            {
                startDate,
                endDate
            }
        );

    },

    DeleteUserFromDevice(id, device) {

        return axiosClient.post(
            `${BASE_URL}/DeleteUserFromDevice/${id}/${device}`
        );

    },
    downloadFace(userId) {

        return axiosClient.get(
            `${BASE_URL}/${userId}/DownloadFace`,
            {
                responseType: "blob"
            }
        );

    },


    uploadFace(formData) {

        return axiosClient.post(
            `${BASE_URL}/UploadFace`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

    },


    getAttendance(userId) {

        return axiosClient.get(
            `${BASE_URL}/${userId}/Attendance`
        );

    },


    getMembershipHistory(userId) {

        return axiosClient.get(
            `${BASE_URL}/${userId}/MembershipHistory`
        );

    }

};


export default userApi;