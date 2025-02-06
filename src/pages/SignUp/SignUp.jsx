import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

const SignUp = () => {
  const [membership, setMembership] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { createUser, googleLogin, updateUserProfile } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const membership = form.membership.value;

    try {
      const result = await createUser(email, password);
      const loggedUser = result.user;

      // Update user profile with name and membership
      await updateUserProfile(name);

      // Send additional user info to the backend (optional)
      const userInfo = { name, email, membership };
      await fetch(`${import.meta.env.VITE_API_Link}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });

      console.log(loggedUser);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have signed up successfully!",
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error during SignUp:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Error during SignUp",
        footer: "Please try again later",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      // Save user info to the database if needed
      const userInfo = { name: user.displayName, email: user.email, membership: "Google User" };
      await fetch(`${import.meta.env.VITE_API_Link}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });

      console.log(user);
      Swal.fire({
        title: "Successfully Logged In with Google",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error logging in with Google",
        footer: "Please try again later",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Image or Illustration */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 p-10">
          <h2 className="text-white text-3xl font-bold mb-4">Welcome to Our Community!</h2>
          <p className="text-white text-lg">
            Join us to explore exclusive features and benefits tailored just for you.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Register Now
          </h1>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder="Input your name"
                  name="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Membership</label>
                <select
                  name="membership"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={membership}
                  onChange={(e) => setMembership(e.target.value)}
                  required
                >
                  <option value="" disabled>Select membership</option>
                  <option value="Member">Wyndham Member</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FcGoogle className="mr-2 text-2xl" />
                Register with Google
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
