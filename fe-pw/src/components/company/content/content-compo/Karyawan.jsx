import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";

  const Karyawan = (props) => {
    const { img, name } = props;
    return (
      <>
        <Card className="w-64 h-72 mx-8">
          <CardHeader floated={false} className="h-36 w-36 rounded-full mx-auto">
            <img src={img} alt="profile-picture" />
          </CardHeader>
          <CardBody className="text-center mt-8">
            {name && (
              <Typography variant="h4" color="blue-gray" className="">
                {name}
              </Typography>
            )}
          </CardBody>
        </Card>
      </>
    );
  };

export default Karyawan