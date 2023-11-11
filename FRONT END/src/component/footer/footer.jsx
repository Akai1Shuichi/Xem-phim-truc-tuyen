import React from "react";
import './footer.css'
import Line from "../UI/line/line";
const Footer = () => {

    return (
        <div className="footer_container">
            <Line h={5}/>
            <p className="footer_title">Questions ? Call 0867 - 057 - 221</p>

            <div className="footer_content_list">
                <ul className="footer_content">
                 <li className="footer_item">Câu hỏi thường gặp</li>
                 <li className="footer_item">Quan hệ với nhà đầu tư</li>
                 <li className="footer_item">Quyền riêng tư</li>
                 <li className="footer_item">Kiểm tra tốc độ</li>
                </ul>

                <ul className="footer_content">
                 <li className="footer_item">Trung tâm trợ giúp</li>
                 <li className="footer_item">Việc làm</li>
                 <li className="footer_item">Tùy chọn cookie</li>
                 <li className="footer_item">Thông báo pháp lý</li>
                </ul>

                <ul className="footer_content">
                 <li className="footer_item">Tài khoản</li>
                 <li className="footer_item">Các cách xem</li>
                 <li className="footer_item">Thông tin doanh nghiệp</li>
                 <li className="footer_item">Chỉ có trên GVBT</li>
                </ul>

                <ul className="footer_content">
                 <li className="footer_item">Trung tâm đa phương tiện</li>
                 <li className="footer_item">Điều khoản sử dụng</li>
                 <li className="footer_item">Liên hệ với chúng tôi</li>
                </ul>
            </div>
           

        </div>
    )
}

export default Footer