import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useBlogCalls from "../hooks/useBlogCalls";
import DetailCard from "../components/cards/DetailCard";
import { Container } from "@mui/material";

const Details = () => {
    const { id } = useParams();
    const { getBlogDetail } = useBlogCalls();
    const [blogDetailInfo, setBlogDetailInfo] = useState("");

    useEffect(() => {
        getBlogDetail(id, setBlogDetailInfo);
        console.log("render detail");
        // eslint-disable-next-line
    }, []);
    console.log("render detail open");
    console.log(blogDetailInfo);

    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {blogDetailInfo && (
                    <DetailCard
                        blogDetailInfo={blogDetailInfo}
                        setBlogDetailInfo={setBlogDetailInfo}
                    />
                )}
            </Container>
        </>
    );
};

export default Details;
