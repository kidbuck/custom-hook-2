import React, { useState } from "react";
import "./UserList.scss";

interface UserListProps {
  users: { id: number; name: string }[];
  deleteUser: (userId: number) => void;
  editUser: (userId: number, newName: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, deleteUser, editUser }) => {
  const [editedNames, setEditedNames] = useState<{ [userId: number]: string }>(
    {}
  );
  const [isEditing, setIsEditing] = useState<{ [userId: number]: boolean }>({});

  const handleEdit = (userId: number, currentName: string) => {
    setEditedNames((prevState) => ({ ...prevState, [userId]: currentName }));
    setIsEditing((prevState) => ({ ...prevState, [userId]: true }));
  };

  const handleSaveEdit = (userId: number) => {
    const editedName = editedNames[userId];
    if (editedName !== undefined && editedName.trim() !== "") {
      editUser(userId, editedName);
      setIsEditing((prevState) => ({ ...prevState, [userId]: false }));
    }
  };

  const handleCancelEdit = (userId: number) => {
    setIsEditing((prevState) => ({ ...prevState, [userId]: false }));
  };

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>
          {isEditing[user.id] && editedNames[user.id] !== undefined ? (
            <>
              <input
                type="text"
                value={editedNames[user.id]}
                onChange={(e) =>
                  setEditedNames((prevState) => ({
                    ...prevState,
                    [user.id]: e.target.value,
                  }))
                }
              />
              <button onClick={() => handleSaveEdit(user.id)}>Save</button>
              <button onClick={() => handleCancelEdit(user.id)}>Cancel</button>
            </>
          ) : (
            <>
              {user.name}
              <button onClick={() => handleEdit(user.id, user.name)}>
                Edit
              </button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
