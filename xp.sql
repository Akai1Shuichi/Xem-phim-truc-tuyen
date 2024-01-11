CREATE DATABASE xem_phim;
use xem_phim;


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

SET FOREIGN_KEY_CHECKS=0;
SET FOREIGN_KEY_CHECKS=1;
