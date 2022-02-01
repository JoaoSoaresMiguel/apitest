-- MySQL Workbench Synchronization
-- Generated: 2022-01-11 19:05
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: JSM

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `servicov_ecommerce` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `servicov_ecommerce`.`produtos` (
  `id_produto` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `preco` FLOAT(11) NOT NULL,
  PRIMARY KEY (`id_produto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `servicov_ecommerce`.`pedidos` (
  `id_pedido` INT(11) NOT NULL,
  `id_produto` INT(11) NOT NULL,
  `quantidade` SMALLINT(6) NOT NULL,
  PRIMARY KEY (`id_pedido`),
  INDEX `fk_pedidos_produtos_idx` (`id_produto` ASC) ,
  CONSTRAINT `fk_pedidos_produtos`
    FOREIGN KEY (`id_produto`)
    REFERENCES `servicov_ecommerce`.`produtos` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `servicov_ecommerce`.`produtos` (`nome`, `preco`) VALUES ('Harry Potter', '99.60');

ALTER TABLE `servicov_ecommerce`.`pedidos` 
CHANGE COLUMN `id_pedido` `id_pedido` INT(11) NOT NULL AUTO_INCREMENT ;


INSERT INTO `servicov_ecommerce`.`pedidos` (`id_produto`, `quantidade`) VALUES ('9', '1');


describe produtos;

alter table produtos
add columN imagem_produto VARCHAR(500);

ALTER TABLE `ecommerce`.`produtos` 
ADD COLUMN `dataentrada` DATE NULL DEFAULT now() AFTER `imagem_produto`;



CREATE TABLE usuarios (
	id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR (100),
    senha VARCHAR (100)
);

alter table usuarios add UNIQUE (email);
alter table usuarios Modify column email varchar(100) not null;
alter table usuarios Modify column senha varchar(120) not null;

alter table usuarios ADD COLUMN `datacadastro` DATE not NULL DEFAULT now() AFTER `senha`;





/* "env" : {
        "MYSQL_USER" : "servicov_root",
        "MYSQL_PASSWORD" : "King2010,.",
        "MYSQL_DATABASE" : "servicov_ecommerce",
        "MYSQL_HOST" : "servicovil.co.ao",
        "MYSQL_PORT" : 3306
    }*/