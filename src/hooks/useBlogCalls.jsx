import axios from "axios";
import { useAuthContext } from "../contexts/AuthProvider";
import { toastError, toastSuccess } from "../helpers/toastify";

const useBlogCalls = () => {
    const BASE_URL = "https://sadikislar2.pythonanywhere.com/";
    const { currentUser } = useAuthContext();

    const getBlogs = async (setState) => {
        try {
            if (currentUser) {
                const { data } = await axios.get(`${BASE_URL}api/blog/`, {
                    headers: { Authorization: `Token ${currentUser?.key}` },
                });
                setState(data);
            } else {
                const { data } = await axios.get(`${BASE_URL}api/blog/`);
                setState(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUsersBlogs = async (setState) => {
        try {
            const { data } = await axios.get(`${BASE_URL}api/blog/ownblogs/`, {
                headers: { Authorization: `Token ${currentUser?.key}` },
            });
            setState(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getBlogDetail = async (id, setBlogDetailInfo) => {
        try {
            const { data } = await axios.get(`${BASE_URL}api/blog/${id}`, {
                headers: { Authorization: `Token ${currentUser?.key}` },
            });
            setBlogDetailInfo(data);
        } catch (error) {
            console.log(error);
        }
    };

    const like = async (id) => {
        try {
            await axios.post(
                `${BASE_URL}api/like/`,
                { blog_id: id },
                {
                    headers: { Authorization: `Token ${currentUser?.key}` },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const postComment = async (commentData) => {
        try {
            await axios.post(`${BASE_URL}api/comment/`, commentData, {
                headers: { Authorization: `Token ${currentUser?.key}` },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const postBlog = async (info) => {
        try {
            await axios.post(`${BASE_URL}api/blog/create/`, info, {
                headers: { Authorization: `Token ${currentUser?.key}` },
            });
            toastSuccess("Blog Posted");
        } catch (error) {
            console.log(error);
            toastError("Something went wrong!");
        }
    };

    const updateBlog = async (blogDetailInfo) => {
        try {
            await axios.put(
                `${BASE_URL}api/blog/update/${blogDetailInfo.id}/`,
                blogDetailInfo,
                {
                    headers: { Authorization: `Token ${currentUser?.key}` },
                }
            );
            toastSuccess("Blog Updated");
        } catch (error) {
            console.log(error);
            toastError("Something went wrong!");
        }
    };

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`${BASE_URL}api/blog/delete/${id}/`, {
                headers: { Authorization: `Token ${currentUser?.key}` },
            });
            toastSuccess("Blog Deleted");
        } catch (error) {
            console.log(error);
            toastError("Something went wrong!");
        }
    };

    const deleteComment = async (id) => {
        try {
            await axios.delete(`${BASE_URL}api/comment/${id}/`, {
                headers: { Authorization: `Token ${currentUser?.key}` },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        getBlogs,
        getUsersBlogs,
        getBlogDetail,
        like,
        postComment,
        postBlog,
        updateBlog,
        deleteBlog,
        deleteComment,
    };
};

export default useBlogCalls;
