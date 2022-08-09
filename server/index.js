// Папка Server для BackEnd
// Затем создаем корневой файл Index.js
// Затем проинициализируем проект yarn init
// После чего устонавливаем зависимости:
// Фрэймворк - Express,
// Система управления базами данных - Postgres(2 модуля: pg и pg-hstore),
// ORM - Sequelize,
// Для обращения с браузера к серверу понадобится - cors,
// Для создания переменных окружения - dotenv
// yarn add express pg pg-hstore sequelize cors dotenv
// Устонавливаем зависимость для разработки: -D nodemon,
// Служит для автоматического перезапуска сервера

// Создаем структуру приложения 
const express = require('express'); // импортируем библиотеку express
// Импортирую объект сделанный в файле db
const sequelize = require('./db.js')

const models = require('./models/models.js')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const router = require('./routes/index.js')


const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

// Для возможности считывания файлов ENV, импортируем конфиг из модуля 
require ('dotenv').config()

//Конфигурацию выносим из переменной окружения!!!
const PORT = process.env.PORT || 5000 // Объявляем порт

const app = express(); // Создаем объект
app.use(cors())
app.use(express.json()) 
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router) 
// Обработка ошибок, последний Middleware
app.use(errorHandler)
 
// Вызываю функцию для подключения к базе данных:
// Создаю функцию старт, делаю ее асинхронной так как все операции с db -
// являются асинхронными
const startApp = async  () => {
  // Оборачиваю в блок TRY CATCH, для отлавливания потенциально возможные -
  // ошибки, и приложение не падало!!!
    try {
  //Вызываю у импортированного объекта функцию authenticate c её помощью
  //будет устонавливаться подключение к базе данных со схемой данных
              await sequelize.authenticate()
  // Вызываю функцию sync она сверяет состояние базы данных
              await sequelize.sync()
              // Просушиваем нужный нам порт и передаем collback function
              app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
      
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  } 
  // Вызываем функцию дя запуска сервера
  startApp()


