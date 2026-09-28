import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "@/Styles/Navbar/Settings/NavbarSettings.module.css";
import useClickOutside from "@/hooks/useClickOutside";
import settingsIcon from "@/assets/images/icons/settings.svg";
import logoutIcon from "@/assets/images/icons/logout_black.svg";
import deleteAccIcon from "@/assets/images/icons/delete_black.svg";

const NavbarSettings = () => {
  const { user, logout, deleteAccount } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const settingsRef = useRef(null);

  // close menu when clicking away from it
  useClickOutside(setIsOpen, settingsRef);

  function handleToggle() {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  return (
    <div
      className={styles.settingsContainer}
      onClick={handleToggle}
      ref={settingsRef}
    >
      <div
        className={styles.settingsIconContainer}
        title="Settings"
        onClick={handleToggle}
      >
        <img className={styles.settingsIcon} src={settingsIcon} alt="" />
      </div>
      {isOpen && user && (
        <div className={styles.settingsDropdown}>
          <h2 id={styles.settingsHead}>Settings</h2>
          <ul>
            <div className={styles.liContainer}>
              <li>
                <button className={styles.flexContainer} onClick={logout}>
                  <img
                    className={styles.logoutIcon}
                    src={logoutIcon}
                    alt=""
                    aria-hidden="true"
                  />
                  <span>Logout</span>
                </button>
              </li>
            </div>
            <hr />

            <div className={styles.liContainer}>
              <li>
                <button
                  className={styles.flexContainer}
                  onClick={deleteAccount}
                >
                  <img
                    className={styles.deleteAccIcon}
                    src={deleteAccIcon}
                    alt=""
                    aria-hidden="true"
                  />
                  <span>Delete Account</span>
                </button>
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarSettings;
