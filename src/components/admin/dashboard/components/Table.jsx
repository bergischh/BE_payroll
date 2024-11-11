// import { Typography, IconButton } from "@material-tailwind/react";
// import { Icon } from "@iconify/react";

// const Table = ({users, TABLE_HEAD}) => {
//     return (
//         <table className="w-full min-w-max table-auto text-left">
//             <thead className="rounded-lg">
//                 <tr className="bg-[#967DB8] rounded-lg">
//                     {TABLE_HEAD.map((head) => (
//                         <th key={head} className="border-y p-4">
//                             <Typography variant="small" color="white" className="font-normal leading-none">
//                                 {head}
//                             </Typography>
//                         </th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody className="my-4 drop-shadow-md">
//                 {Array.isArray(users) && users.length > 0 ? (
//                     users.map(({ id, username, role, email }, index) => (
//                         <tr key={id}>
//                             <td className="p-4 border-b border-blue-gray-50">
//                                 <Typography variant="small" color="blue-gray" className="font-bold">
//                                     {index + 1}
//                                 </Typography>
//                             </td>
//                             <td className="p-4 border-b border-blue-gray-50">
//                                 <Typography variant="small" color="blue-gray" className="font-normal">
//                                     {username}
//                                 </Typography>
//                             </td>
//                             <td className="p-4 border-b border-blue-gray-50">
//                                 <Typography variant="small" color="blue-gray" className="font-normal">
//                                     {role}
//                                 </Typography>
//                             </td>
//                             <td className="p-4 border-b border-blue-gray-50">
//                                 <Typography variant="small" color="blue-gray" className="font-normal">
//                                     {email}
//                                 </Typography>
//                             </td>
//                             <td className="p-4 border-b border-blue-gray-50">
//                                 <IconButton variant="text">
//                                     <Icon icon="basil:other-1-outline" className="w-4 h-4"/>
//                                 </IconButton>
//                             </td>
//                         </tr>
//                     ))
//                 ) : (
//                     <tr>
//                         <td colSpan={TABLE_HEAD.length} className="text-center p-4">
//                             <Typography variant="small" color="blue-gray">
//                                 No users found.
//                             </Typography>
//                         </td>
//                     </tr>
//                 )}
//             </tbody>
//         </table>
//     )
// }

// export default Table