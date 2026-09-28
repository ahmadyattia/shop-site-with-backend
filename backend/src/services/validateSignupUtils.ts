interface PasswordValidationResult {
  isValidPassword: boolean;
  errorsString: string;
  errors: string[];
}

/*
Validates whether a password meets security strength requirements.
 */
export function validatePasswordStrength(
  password: string,
): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[@$!%*?&]/.test(password)) {
    errors.push(
      "Password must contain at least one special character (@, $, !, %, *, ?, &).",
    );
  }

  const errorsString = errors.join(" ");

  return {
    isValidPassword: errors.length === 0,
    errorsString,
    errors,
  };
}

/*
Validates whether a string is a properly formatted email address.
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;

  // HTML5 Specification Email Regex Pattern
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email.trim());
}
