import {
  Datagrid,
  EmailField,
  List,
  TextField,
  TextInput,
  ReferenceField,
} from "react-admin";

const UserList = () => {
  const userFilters = [
    <TextInput key="search-filter" source="q" label="Search" alwaysOn />,
  ];

  return (
    <List filters={userFilters} title="List of Users">
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" label="Name title" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="address.street" />
        <TextField source="phone" />
        <TextField source="website" />
        <TextField source="company.name" />
        <ReferenceField source="id" reference="users" />
      </Datagrid>
    </List>
  );
};
export default UserList;
