DROP DATABASE IF EXISTS BOOKSTORE;
CREATE DATABASE IF NOT EXISTS BOOKSTORE DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

USE BOOKSTORE;

SET FOREIGN_KEY_CHECKS=0;

/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019/1/18 17:26:04                           */
/*==============================================================*/


drop table if exists BookInfo;

drop table if exists PurchaseItem;

drop index Index_usrNme on UserInfo;

drop table if exists UserInfo;

drop table if exists UserOrder;

/*==============================================================*/
/* Table: BookInfo                                              */
/*==============================================================*/
create table BookInfo
(
   BOOK_ID              decimal(12) not null,
   BOOK_NAME            varchar(50),
   AUTHOR               varchar(50),
   PUBLISH_DATE         date,
   PUBLISHER            varchar(50),
   ORIGIN_PRICE         decimal(10,2),
   ISBN                 varchar(20),
   primary key (BOOK_ID)
);

/*==============================================================*/
/* Table: PurchaseItem                                          */
/*==============================================================*/
create table PurchaseItem
(
   ITEM_ID              decimal(12) not null,
   BOOK_ID              decimal(12),
   ORDER_ID             decimal(12),
   USER_ID              decimal(12),
   BOOK_NAME            varchar(50),
   QUANTITY             int,
   PRICE                decimal(10,2),
   AMOUNT               decimal(16,2),
   primary key (ITEM_ID)
);

alter table PurchaseItem comment '购买项，订单ID为空时意味着处于购物车，生成订单后将从购物车移除';

/*==============================================================*/
/* Table: UserInfo                                              */
/*==============================================================*/
create table UserInfo
(
   USER_ID              decimal(12) not null,
   ACCOUNT_NAME         varchar(50),
   PASSWD               varchar(20),
   USER_NAME            varchar(50),
   SEX                  char(1),
   BIRTHDAY             date,
   AGE                  int,
   REG_DATE             timestamp,
   primary key (USER_ID)
);

alter table UserInfo comment 'System User''s Information';

/*==============================================================*/
/* Index: Index_usrNme                                          */
/*==============================================================*/
create index Index_usrNme on UserInfo
(
   ACCOUNT_NAME
);

/*==============================================================*/
/* Table: UserOrder                                             */
/*==============================================================*/
create table UserOrder
(
   ORDER_ID             decimal(12) not null,
   ORDER_NO             varchar(50),
   USER_ID              decimal(12),
   GEN_TIME             timestamp,
   TOT_AMOUNT           decimal(16,2),
   STATUS               char(1),
   primary key (ORDER_ID)
);

alter table PurchaseItem add constraint FK_Reference_Book foreign key (BOOK_ID)
      references BookInfo (BOOK_ID) on delete restrict on update restrict;

alter table PurchaseItem add constraint FK_Reference_Order foreign key (ORDER_ID)
      references UserOrder (ORDER_ID) on delete restrict on update restrict;

alter table PurchaseItem add constraint FK_Reference_User_PurItem foreign key (USER_ID)
      references UserInfo (USER_ID) on delete restrict on update restrict;

alter table UserOrder add constraint FK_Reference_User foreign key (USER_ID)
      references UserInfo (USER_ID) on delete restrict on update restrict;

