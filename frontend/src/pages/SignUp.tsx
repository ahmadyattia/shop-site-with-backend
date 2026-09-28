import React, { useState } from "react";
import styles from "@/styles/SignUp.module.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import ShowPassword from "@/components/ShowPassword";
import { useAuth } from "@/context/AuthContext";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // throttle submit clicks
  const location = useLocation();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const passwordInputType = showPassword ? "text" : "password";

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (isSubmitting) return;

    setMessage("");
    setIsSubmitting(true);

    try {
      await signup(firstName, lastName, email, password);

      setMessage(
        `Account created successfully for ${email}! Welcome, ${firstName}.`,
      );

      setFirstName("");
      setLastName("");
      setPassword("");
      setEmail("");

      const redirectPath = location.state?.from?.pathname || "/login";
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.registerForm}>
      <h2 className={styles.signUpHead}>Sign Up</h2>
      <form onSubmit={handleSubmit} action="">
        <div>
          <label htmlFor="fName">First Name</label>
          <input
            id="fName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lName">Last Name</label>
          <input
            id="lName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
            className={styles.submitBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </div>
      </form>
      {message && (
        <p
          className={styles.message}
          style={{
            color: message.includes("successfully") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
      <p className={styles.loginP}>
        Already have an account?{" "}
        <Link to={"/login"} state={location.state?.from}>
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
