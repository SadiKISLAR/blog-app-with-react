import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthProvider";
import { toastError, toastSuccess } from "../helpers/toastify";

const useAuthCalls = () => {
    const BASE_URL = "https://sadikislar2.pythonanywhere.com/";
    const navigate = useNavigate();
    const { setCurrentUser, currentUser } = useAuthContext();

    const getProfile = async (id, token) => {
        const { data } = await axios.get(`${BASE_URL}users/profile/${id}/`, {
            headers: { Authorization: `Token ${token}` },
        });

        return data;
    };

    const register = async (registerData) => {
        try {
            const { data } = await axios.post(
                `${BASE_URL}users/register/`,
                registerData
            );
            const profileData = await getProfile(data.id, data.key);
            setCurrentUser({
                ...data,
                display_name: profileData.display_name,
                avatar: profileData.avatar,
                bio: profileData.bio,
            });
            localStorage.setItem(
                "USER",
                JSON.stringify({
                    ...data,
                    display_name: profileData.display_name,
                    avatar: profileData.avatar,
                    bio: profileData.bio,
                })
            );
            navigate("/");
            toastSuccess("You have Registered...");
        } catch (error) {
            console.log(error);
            toastError("Something went wrong!");
        }
    };

    const login = async (loginData) => {
        try {
            const { data } = await axios.post(
                `${BASE_URL}users/auth/login/`,
                loginData
            );
            const profileData = await getProfile(data.user.id, data.key);
            setCurrentUser({
                ...data.user,
                key: data.key,
                display_name: profileData.display_name,
                avatar: profileData.avatar,
                bio: profileData.bio,
            });
            localStorage.setItem(
                "USER",
                JSON.stringify({
                    ...data.user,
                    key: data.key,
                    display_name: profileData.display_name,
                    avatar: profileData.avatar,
                    bio: profileData.bio,
                })
            );
            toastSuccess(`Welcome Back ${data.user.first_name}`);
            navigate("/");
        } catch (error) {
            console.log(error);
            toastError("Something went wrong!");
        }
    };

    const updateProfile = async (updatedUser) => {
        try {
            const { data } = await axios.put(
                `${BASE_URL}users/profile/${updatedUser.user_id}/`,
                updatedUser,
                {
                    headers: { Authorization: `Token ${currentUser.key}` },
                }
            );

            setCurrentUser({
                ...currentUser,
                display_name: data.display_name,
                avatar: data.avatar,
                bio: data.bio,
            });

            localStorage.setItem(
                "USER",
                JSON.stringify({
                    ...currentUser,
                    display_name: data.display_name,
                    avatar: data.avatar,
                    bio: data.bio,
                })
            );
            toastSuccess(`Successfully Updated`);
        } catch (error) {
            console.log(error);
            toastError("Something went wrong!");
        }
    };

    const logout = async (data) => {
        try {
            await axios.post(`${BASE_URL}users/auth/logout/`, null, {
                headers: { Authorization: `Token ${data.key}` },
            });

            localStorage.removeItem("USER");
            setCurrentUser("");
            navigate("/login");
            toastSuccess(`Logged Out`);
        } catch (error) {
            console.log(error);
            toastError("Something went wrong!");
        }
    };

    return { register, login, getProfile, updateProfile, logout };
};

export default useAuthCalls;
