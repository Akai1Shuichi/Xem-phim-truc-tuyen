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
   `id_movie` varchar(255) not null unique,
   `id_user` int(11),
   `name_movie` varchar(255) default null,
   `poster` varchar(255) default null,
   primary key (`id_movie`),
   FOREIGN KEY (`id_user`)
    REFERENCES `user`(`id`)
);

select *  from `movie` where id_user = 2

-- insert into `movie` values(2,1,'t','t','t','t');

 