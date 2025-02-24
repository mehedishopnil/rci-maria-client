import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

const UserControl = () => {
  const { allUsersData, updateUser } = useContext(AuthContext);
  const [uniqueUsers, setUniqueUsers] = useState([]);

  useEffect(() => {
    const removeDuplicateEmails = (users) => {
      const uniqueEmails = new Set();
      return users.filter((user) => {
        if (uniqueEmails.has(user.email)) {
          return false;
        } else {
          uniqueEmails.add(user.email);
          return true;
        }
      });
    };

    const usersArray = Array.isArray(allUsersData) ? allUsersData : [allUsersData];
    const uniqueUsersArray = removeDuplicateEmails(usersArray);

    setUniqueUsers(uniqueUsersArray);
  }, [allUsersData]);

  const handleRoleToggle = (email, isAdmin) => {
    updateUser(email, !isAdmin);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          All Users ({uniqueUsers.length})
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueUsers.map((user, index) => {
            const { photoURL, name, email, isAdmin } = user;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={photoURL}
                    alt={name}
                    className="w-14 h-14 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{name}</h2>
                    <p className="text-sm text-gray-600 truncate">{email}</p>
                    <p
                      className={`mt-2 text-sm font-semibold ${
                        isAdmin ? 'text-green-600' : 'text-blue-600'
                      }`}
                    >
                      {isAdmin ? 'Admin' : 'User'}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end ">
                  <button
                    className={`btn btn-sm ${
                      isAdmin ? 'btn-warning' : 'btn-primary'
                    } border border-gray-400 rounded px-2`}
                    onClick={() => handleRoleToggle(email, isAdmin)}
                  >
                    {isAdmin ? 'Make User' : 'Make Admin'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserControl;