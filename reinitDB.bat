@echo off
mysql --default-character-set=utf8 -u root -e "DROP SCHEMA library;"
mysql --default-character-set=utf8 -u root < .\scripts\schema\all-tables.sql
mysql --default-character-set=utf8 -u root < .\scripts\triggers.sql
mysql --default-character-set=utf8 -u root < .\scripts\procedures.sql
mysql --default-character-set=utf8 -u root < .\scripts\data\user-data.sql
mysql --default-character-set=utf8 -u root < .\scripts\data\book-data.sql
mysql --default-character-set=utf8 -u root < .\scripts\data\common-data.sql
mysql --default-character-set=utf8 -u root < .\scripts\schema\indexes.sql
