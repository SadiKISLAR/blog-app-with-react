import { useEffect, useState } from "react";
import { Avatar, Button, Box, Typography } from "@mui/material";
import { useAuthContext } from "../contexts/AuthProvider";
import defaultAvatar from "../assets/blank-profile-picture-973460_1280.png";
import ProfileModal from "../components/modals/ProfileModal";
import useBlogCalls from "../hooks/useBlogCalls";
import ProfileBlogCard from "../components/cards/ProfileBlogCard";
import BookIcon from "@mui/icons-material/Book";
import { useNavigate } from "react-router";

const Profile = () => {
    const { currentUser } = useAuthContext();
    const { getUsersBlogs } = useBlogCalls();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [usersBlogs, setUsersBlogs] = useState([]);

    const [updatedUser, setUpdatedUser] = useState({
        display_name: currentUser.display_name,
        avatar: currentUser.avatar,
        bio: currentUser.bio,
        user_id: currentUser.id,
    });

    useEffect(() => {
        getUsersBlogs(setUsersBlogs);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        flexGrow: 1,
                        mt: 5,
                    }}
                >
                    <Avatar
                        alt={currentUser?.first_name}
                        src={currentUser.avatar || defaultAvatar}
                        sx={{ width: 150, height: 150, mb: 2 }}
                    />
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        {currentUser?.first_name} {currentUser?.last_name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        {currentUser?.email}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        {currentUser?.display_name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        {currentUser?.bio}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{ mb: 2 }}
                    >
                        Update Infos
                    </Button>

                    <ProfileModal
                        open={open}
                        setOpen={setOpen}
                        updatedUser={updatedUser}
                        setUpdatedUser={setUpdatedUser}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        flexGrow: 1,
                        gap: 1,
                        mt: 5,
                    }}
                >
                    <Typography variant="h5">My Blogs</Typography>
                    {usersBlogs.length === 0 ? (
                        <Typography variant="body1" my={3}>
                            You Have No Blogs Yet...
                        </Typography>
                    ) : (
                        usersBlogs?.map((blog) => (
                            <ProfileBlogCard key={blog.id} blog={blog} />
                        ))
                    )}
                    <Button
                        color="secondary"
                        sx={{ mt: "2rem" }}
                        variant="contained"
                        endIcon={<BookIcon />}
                        onClick={() => navigate("/newblog")}
                    >
                        New Blog
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Profile;
