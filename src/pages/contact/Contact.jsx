import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Card from "../card/Card";
import styles from "./Contact.module.scss";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        `${process.env.REACT_APP_SERVICE_ID}`,
        `${process.env.REACT_APP_TEMPLATE_ID}`,
        form.current,
        `${process.env.REACT_APP_EMAIL_PUBLIC_KEY}`
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
          console.log(result.text);
        },
        (error) => {
          toast.error(error.text);
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact</h2>
        <div className={styles.section}>
          <form
            ref={form}
            onSubmit={(e) => {
              sendEmail(e);
            }}
          >
            <Card cardClass={styles.card}>
              <label>Name:</label>
              <input
                required
                type="text"
                name="user_name"
                placeholder="Full Name"
              />
              <label>Email</label>
              <input
                required
                type="text"
                name="user_email"
                placeholder="Your Email"
              />
              <label>Subject</label>
              <input
                required
                type="text"
                name="subject"
                placeholder="Subject"
              />
              <label>Your Message</label>
              <textarea name="message" id="" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>
                Fill the form or contact us via other channels listed bellow
              </p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p> 537 000 00 00</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p> support@example.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p> Turkey, Sinop</p>
                </span>
                <span>
                  <FaTwitter />
                  <p> @test</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
