import "./header.css";

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Welcome to</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img src="assets/nature.jpg" alt="" className="headerImg" />
        </div>
    )
}
