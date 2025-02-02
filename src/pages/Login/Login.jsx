import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // Fixed: Correct import for Link
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext); // Destructure login and googleLogin from context
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // Redirect to the previous page or default to homepage

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password); // Call login function from context
      Swal.fire({
        title: "Successfully Logged In",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      navigate(from, { replace: true }); // Redirect to the previous page
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong Email or Password",
        footer: "Please enter correct Email or Password",
      });
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await googleLogin(); // Call googleLogin function from context
      Swal.fire({
        title: "Successfully Logged In with Google",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      navigate(from, { replace: true }); // Redirect to the previous page
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error logging in with Google",
        footer: "Please try again later",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Login Card */}
      <div className="w-full max-w-md p-8 rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Login to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D1A054] focus:border-transparent"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D1A054] focus:border-transparent"
              required
            />
            <div className="mt-2 text-right">
              <Link
                to="/forgot-password" // Add a route for forgot password
                className="text-sm text-[#D1A054] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#D1A054] text-white rounded-lg hover:bg-[#b18441] transition-colors"
            >
              Login
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <div>
          <button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-2 bg-[#4285F4] text-white rounded-lg hover:bg-[#357ae8] transition-colors flex items-center justify-center"
          >
            <FcGoogle className="mr-2 text-2xl" /> {/* Google icon */}
            Login with Google
          </button>
        </div>

        {/* Registration Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-[#D1A054] hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;