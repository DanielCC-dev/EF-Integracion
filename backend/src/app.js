const express = require('express');
const connectDB = require('./database/db');
const categoriaRoutes = require('./routes/categoria.routes');
const ordenRoutes = require('./routes/orden.routes');
const meseroRoutes = require('./routes/mesero.routes');
const clienteRoutes = require('./routes/cliente.routes');
const platoRoutes = require('./routes/plato.routes');
const meseroC = require('./controllers/meseroC')
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const http = require('http');
const app = express();
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.static(__dirname));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Rutas
app.use(categoriaRoutes);
app.use(ordenRoutes);
app.use(meseroRoutes);
app.use(clienteRoutes);
app.use(platoRoutes);

// Conexión de Socket.io
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });

    socket.on('chatMessage', (payload) => {
        console.log(`Mensaje de ${payload.userName}: ${payload.message}`);
        io.emit('chatMessage', payload);
    });

});

meseroC.agregarMeseroPrueba();

// Iniciar servidor
const PORT = process.env.PORT || 2500;
server.listen(PORT, () => console.log(`Server running on port ${PORT}, http://localhost:2500`));