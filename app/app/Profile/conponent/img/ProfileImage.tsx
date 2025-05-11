"use client"
import ImgBox from "./imgbox";

export default function ProfileImage() {
    //const { url } = useParams<{ url: string }>();

    return (
        <div className="flex flex-wrap gap-1 w-full">
            <ImgBox url="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80" ></ImgBox>
            <ImgBox url="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80" ></ImgBox>
            <ImgBox url="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80" ></ImgBox>
            <ImgBox url="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80" ></ImgBox>
            <ImgBox url="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80" ></ImgBox>
            <ImgBox url="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80" ></ImgBox>
            <ImgBox url="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80" ></ImgBox>
        </div>
    )
}