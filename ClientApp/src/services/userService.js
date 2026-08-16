import userApi from "../Api/userApi";


const userService = {


    getUsers: async () => {

        try {
            console.log("UserService - getUsers called");
            const response = await userApi.getUsers();
            console.log(" from UserService - getUsers response:", response.Data);
            return response;

        }
        catch (error) {

            throw error;

        }

    },


    getUserById: async (id) => {

        try {

            const response =
                await userApi.getById(id);

            return response;

        }
        catch (error) {

            throw error;

        }

    },


    createUser: async (user) => {

        try {

            const response =
                await userApi.create(user);

            return response;

        }
        catch (error) {

            throw error;

        }

    },


    updateUser: async (id, user) => {

        try {

            const response =
                await userApi.update(id, user);

            return response;

        }
        catch (error) {

            throw error;

        }

    },


    blockUser: async (userId, device) => {

        try {

            const response =
                await userApi.BlockUser(userId,device);

            return response;

        }
        catch (error) {

            throw error;

        }

    },
    unblockUser: async (id,startDate,endDate,device) => {

        try {
            console.log("UserService - unblockUser called with id:", id, "startDate:", startDate, "endDate:", endDate, "device:", device);
            const response =
                await userApi.UnblockUser(id, startDate,endDate,device);

            return response;

        }
        catch (error) {

            throw error;

        }


    },

    deleteUserFromDevice: async (id, device) => {

        try {

            const response =
                await userApi.DeleteUserFromDevice(id, device);

            return response;

        }
        catch (error) {

            throw error;

        }

    },
};




export default userService;