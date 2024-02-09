-- AlterTable
CREATE SEQUENCE relatory_id_seq;
ALTER TABLE "Relatory" ALTER COLUMN "id" SET DEFAULT nextval('relatory_id_seq');
ALTER SEQUENCE relatory_id_seq OWNED BY "Relatory"."id";
