create database first_piano;
use first_piano;
CREATE TABLE `first_piano`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE);
CREATE TABLE `first_piano`.`tracks` (
  `track_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `tracks` JSON NULL,
  PRIMARY KEY (`track_id`),
  UNIQUE INDEX `track_id_UNIQUE` (`track_id` ASC) VISIBLE,
  INDEX `fk_tracks_userid_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_tracks_userid`
    FOREIGN KEY (`user_id`)
    REFERENCES `first_piano`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
create user first_piano_user identified by '4536251';
grant select on first_piano.* to 'first_piano_user';
grant insert on first_piano.* to 'first_piano_user';
grant update(password) on first_piano.users to 'first_piano_user';
grant update(tracks) on first_piano.tracks to 'first_piano_user';