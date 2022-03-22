import Image from "next/image";

const Footer = () => {
    return (
        <footer>
            Connect with me! <br />
            <a
                href="https://github.com/BestVersion7"
                target="_blank"
                rel="noopener noreferrer"
                title="Github"
            >
                <Image
                    height="66%"
                    width="66%"
                    // layout="responsive"
                    src="https://res.cloudinary.com/crimson-flamingo/image/upload/v1556071829/230419%20Icons/github.png"
                    alt="github"
                />
            </a>
            <a
                href="https://www.linkedin.com/in/hunterkfan"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
            >
                <Image
                    height="66%"
                    width="66%"
                    // layout="fill"
                    src="https://res.cloudinary.com/crimson-flamingo/image/upload/v1603470384/230419%20Icons/logo-linkedin.png"
                    alt="linkedin"
                />
            </a>
            <br />
            2022
        </footer>
    );
};

export default Footer;
