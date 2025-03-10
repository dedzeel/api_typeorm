import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345",
    database: "node-mysql-crud-api",
    synchronize: true,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
});

// Initialize the database connection
AppDataSource.initialize()
    .then(() => {
        console.log("✅ Database connected successfully!");
    })
    .catch((error) => {
        console.error("❌ Database initialization failed:", error);
    });
