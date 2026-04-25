import { useState, useRef } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import "../../styles/auth.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [timer, setTimer] = useState(60);

  const inputsRef = useRef([]);

  const otpValue = otp.join("");

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const startTimer = () => {
    let count = 60;
    setTimer(count);

    const interval = setInterval(() => {
      count--;
      setTimer(count);

      if (count === 0) clearInterval(interval);
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!email) return toast.error("Please enter email");

    setLoading(true);

    try {
      const res = await api.post("/auth/send-otp", { email });

      toast.success(res.data.message);
      setOtpSent(true);
      startTimer();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpValue.length < 6) return toast.error("Enter full OTP");

    setLoading(true);

    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp: otpValue,
      });

      toast.success(res.data.message);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("Fill all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/reset-password", {
        email,
        password,
      });

      toast.success(res.data.message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box fade-in">
        {step === 1 && (
          <>
            <h2>Forgot Password 🔐</h2>
            <p className="auth-subtitle">Verify your email</p>

            <div className="auth-form">
              <div className="input-field">
                <input
                  type="email"
                  required
                  placeholder=" "
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email Address</label>
              </div>

              {!otpSent ? (
                <button onClick={handleSendOtp} disabled={loading}>
                  {loading ? "Send OTP..." : "Send OTP"}
                </button>
              ) : (
                <>
                  <div className="otp-container">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength="1"
                        value={digit}
                        ref={(el) => (inputsRef.current[i] = el)}
                        onChange={(e) =>
                          handleOtpChange(e.target.value, i)
                        }
                        onKeyDown={(e) => handleKeyDown(e, i)}
                      />
                    ))}
                  </div>

                  <div className="resend">
                    {timer > 0 ? (
                      <span>Resend in {timer}s</span>
                    ) : (
                      <button onClick={handleSendOtp}>
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <button onClick={handleVerifyOtp} disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Set New Password 🔑</h2>
            <p className="auth-subtitle">Create a new password</p>

            <form className="auth-form" onSubmit={handleResetPassword}>
              <div className="input-field">
                <input
                  type="password"
                  required
                  placeholder=" "
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>New Password</label>
              </div>

              <div className="input-field">
                <input
                  type="password"
                  required
                  placeholder=" "
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label>Confirm Password</label>
              </div>

              <button disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;