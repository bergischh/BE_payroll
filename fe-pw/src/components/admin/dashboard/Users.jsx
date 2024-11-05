import {
    Card,
    Typography,
    Button,
    CardBody,
    CardFooter,
    IconButton,
  } from "@material-tailwind/react";
  import { Icon } from "@iconify/react/dist/iconify.js";
  import { useEffect, useState } from "react";
  import axios from "axios";
  
  const TABLE_HEAD = ["No", "Username", "Role", "Email", "Action"];
  
  const Users = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      // Fetch data from the API
      axios.get("api/user/") // Ganti URL_API_ANDA dengan URL endpoint API Anda
        .then((response) => {
          console.log("API Response:", response.data); // Log the response
          setUsers(response.data.data || []); // Default to empty array if data is undefined
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  
    return (
      <>
        <h1 className="text-gray-500 mt-5">Users</h1>
        <Card className="h-full w-full">
          <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="rounded-lg">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-y bg-[#967DB8] p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  users.map(({ id, username, role, email }, index) => {
                    const isLast = index === users.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
  
                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {index + 1} {/* Incremental number */}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {username}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {role}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {email}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <IconButton variant="text">
                            <Icon icon="basil:other-1-outline" className="w-4 h-4" />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="text-center p-4">
                      <Typography variant="small" color="blue-gray">
                        No users found.
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <IconButton variant="outlined" size="sm">
                1
              </IconButton>
              <IconButton variant="text" size="sm">
                2
              </IconButton>
              <IconButton variant="text" size="sm">
                3
              </IconButton>
              <IconButton variant="text" size="sm">
                ...
              </IconButton>
              <IconButton variant="text" size="sm">
                8
              </IconButton>
              <IconButton variant="text" size="sm">
                9
              </IconButton>
              <IconButton variant="text" size="sm">
                10
              </IconButton>
            </div>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  };
  
  export default Users;