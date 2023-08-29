import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
// import camera from "../../assets/camera";
// setImageList, imageList
// https://cloudinary.com/documentation/upload_widget?utm_content=upload_widget_react&utm_medium=video&utm_source=youtube&utm_campaign=devhints#how_to_set_up_and_integrate_the_upload_widget_into_your_site_or_app

function UploadWidget({ setImage }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    console.log(window.cloudinary);
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dug4rmcqv",
        uploadPreset: "petPhotography",
      },
      function (error, result) {
        if (result.event == "success") {
          console.log(result);
          console.log(result.info.url);
          setImage(result.info.public_id);
        } else {
          console.log(result);
        }
      }
    );
  }, []);

  return (
    <div>
      <Button className="" onClick={() => widgetRef.current.open()}>
        Upload Image
      </Button>
    </div>
  );
}

export default UploadWidget;
