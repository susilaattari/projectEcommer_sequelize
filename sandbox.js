//* rubah nama database jadi : PerabotDia
//* sequelize db:create

//! Table Create
//* sequelize model:create --name User --attributes email:string,password:string,roles:string

//* sequelize model:create --name Profile --attributes fullName:string,email:string,dateOfBirth:date,UserId:integer

//* sequelize model:create --name Category --attributes name:string

//* sequelize model:create --name Product --attributes name:string,price:integer,stock:integer,imageUrl:string,description:string,CategoryId:integer

//* sequelize model:create --name Carts --attributes status:string

//* sequelize migration:generate --name add-column-UserId-to-Cart

//* sequelize migration:generate --name add-column-ProductId-to-Cart

//! Seeding
//* sequelize seed:generate --name Category-Seed
//* sequelize seed:generate --name Product-Seed
//* sequelize seed:generate --name Users-Seed
//* sequelize seed:generate --name Profile-Seed
//* sequelize seed:generate --name Cart-Seed

//! sequelize db:migrate
//! sequelize db:seed:all

