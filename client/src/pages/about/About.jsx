import "./about.css";

const About = () => {
    return (
        <div className="about">
            <div className="aboutTitle">About</div>
            <div className="aboutWrapper">
                <div className="aboutLeft">
                    <h1 className="aboutLeftTitle">
                        Welcome to our Blog. We're glad and grateful you're here.
                    </h1>
                    <h4 className="aboutLeftDesc">
                        Our Blog exists to provide a trusted learning and entertainment
                        ecosystem for everyone. We are hored to provide learning
                        opportunities for folks at all stages of their lifes. Here you can
                        obtain new skills, learn about recent developments in various fields
                        and get all that while having fun. Wheather your an aspiring cheaf,
                        sports fan, student or housewife, we're here for you.
                    </h4>
                    <p className="aboutLeftMessage">
                        Feel free to register and start sharing
                        your thoughts and knowledge with world!
                    </p>
                </div>
                <div className="aboutRight">
                    <img src="assets/teamwork.jpg" alt="" className="aboutRightImg" />
                </div>
            </div>
        </div>
    )
}

export default About