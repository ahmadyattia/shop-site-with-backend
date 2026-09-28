import styles from "@/styles/Login.module.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ShowPassword from "@/components/ShowPassword";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const passwordInputType = showPassword ? "text" : "password";

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    setMessage("");
    setIsSubmitting(true);

    try {
      await login(email, password);

      setMessage(`Successfully signed in as: ${email}`);
      setEmail("");
      setPassword("");

      // if redirected from a certain location, redirect there
      const redirectPath = location.state?.from?.pathname || "/home";
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.loginHead}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <span className={styles.passwordSpan}>
            <input
              id="password"
              type={passwordInputType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <ShowPassword
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </span>
        </div>
        <div>
          <button
            className={styles.loginBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </button>
        </div>
      </form>
      {message && (
        <p
          style={{ color: message.includes("Successfully") ? "green" : "red" }}
        >
          {message}
        </p>
      )}
      <p className={styles.signupP}>
        Don't have an account?{" "}
        <Link to={"/signup"} state={{ from: location.state?.from }}>
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
