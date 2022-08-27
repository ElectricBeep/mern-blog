import "./contact.css";

export default function Contact() {
    return (
        <div className="contact">
            <div className="contactWrapper">
                <div className="contactLeft">
                    <span className="contactTitle">Contact Us</span>
                    <p className="contactText">
                        Want to get in touch with us?
                        Either fill out the form with your inquiry or find the
                        department email you'd like to contact below.
                    </p>
                    <div className="contactEmailContainer">
                        <div className="contactEmailTitle">Support</div>
                        <div className="contactEmail">support@gmail.com</div>
                        <div className="contactEmailTitle">Marketing</div>
                        <div className="contactEmail">marketing@gmail.com</div>
                        <div className="contactEmailTitle">Management</div>
                        <div className="contactEmail">management@gmail.com</div>
                    </div>
                </div>
                <div className="contactRight">
                    <form className="contactForm">
                        <label>Name</label>
                        <input type="text" className="contactInput" />
                        <label>Email</label>
                        <input type="email" className="contactInput" />
                        <label>What can we help you with?</label>
                        <textarea className="contactInput writeText"></textarea>
                    </form>
                    <button className="contactButton">Submit</button>
                </div>
            </div>
        </div>
    )
}
