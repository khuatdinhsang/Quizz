import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "@styles/base/pages/page-misc.scss";
import themeConfig from "@src/configs/themeConfig";

const Error = () => {
    const illustration = "forgot-password-v2.svg",
        source = require(`@src/assets/images/pages/${illustration}`).default
    return (
        <div className="misc-wrapper">
            <Link className="brand-logo" to="/news/list">
                <img src={themeConfig.app.appLogoImage} alt="logo" />
            </Link>
            <div className="misc-inner p-2 p-sm-3">
                <div className="w-100 text-center">
                    <h2 className="mb-1">404 - Page Not Found 🕵🏻‍♀️</h2>
                    <p className="mb-2">
                        Oops! 😖 Có vẻ như đường dẫn bạn vừa truy cập không tồn tại hoặc đã bị hỏng!.<br/>
                        Xin lỗi vì sự bất tiện này
                    </p>
                    <Button
                        tag={Link}
                        to="/"
                        color="primary"
                        className="btn-sm-block mb-2"
                    >
                        Về trang chủ
                    </Button>
                    <img
                        className="img-fluid"
                        src={source}
                        alt="Not authorized page"
                    />
                </div>
            </div>
        </div>
    );
};
export default Error;
