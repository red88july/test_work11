import mongoose from "mongoose";
import crypto from "crypto";
import connectToDB from "./connectToDB";
import User from "./models/User";
import Product from "./models/Product";


const dropColletction = async (db: mongoose.Connection, collectionsName: string) => {
    try {
        await db.dropCollection(collectionsName);
    } catch (e) {
        console.log(`Collection ${collectionsName} was missing, skipping drop...`)
    }
}

const run = async () => {
    await mongoose.connect(connectToDB.db);
    const db = mongoose.connection;

    const collections = ['users', 'products'];

    for (const collectionsName of collections) {
        await dropColletction(db, collectionsName);
    }

    const user = await User.create([
        {
            username: 'Petrov',
            password: 'Petrov_123#',
            name: 'Petrov Aleksej',
            phone: '+996 702555123',
            token: crypto.randomUUID(),

        }, {
            username: 'Ivanov',
            password: 'Ivanov_123#',
            name: 'Ivanov Sergej',
            phone: '+996 702555666',
            token: crypto.randomUUID(),
        },
    ]);

    await Product.create([
        {
            user: user[0]._id,
            title: 'MSI GeForce Gaming RTX3080',
            description: 'Мощнейшая видеокарта, создана специально дял геймеров!',
            price: '450',
            category: 'GPUs',
            image: 'fixtures/gpu.jpg'
        }, {
            user: user[0]._id,
            title: 'Samsung SSD980 500Gb',
            description: 'Совершенное новое ощущение от скорости передачи данных!',
            price: '150',
            category: 'SSDs',
            image: 'fixtures/ssd.jpg'
        }, {
            user: user[1]._id,
            title: 'Canon MF3050',
            description: 'Создан для больших, современных компаний',
            price: '350',
            category: 'Printers',
            image: 'fixtures/printer.jpg'
        }, {
            user: user[1]._id,
            title: 'Asus ROG Strix gaming LM302',
            description: 'Создан соверешенным для гейминга',
            price: '500',
            category: 'Monitors',
            image: 'fixtures/monitor.jpg'
        },

    ]);


    await db.close();
};

void run();