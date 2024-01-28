import { Server } from 'socket.io';
import Logger from './logger';
import moment from 'moment';
import { UserDTO } from '../models/user/user.interface';
import { checkAuth } from '../middlewares/authentication';
// import { messageAPI } from '../apis/message';
// import { chatbot } from '../middlewares/chatbot';

const initWsServer = (server: any) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    let user: UserDTO = {} as UserDTO;

    socket.on('userToken', async (data) => {
      try {
        const token = data;
        user = await checkAuth(token) as UserDTO;
        const userId = user.id;

        if (!userId) {
          socket.emit('chat', [{
            from: 'System',
            message: 'El token no es valido'
          }])
        } else socket.emit('chat', [{
          from: 'System',
          message: 'Te damos la bienvenida'
        }])

        // const messages = await messageAPI.getMessages(userId);
        // socket.emit('chat', messages);
      } catch (error: any) {
        Logger.error(error);
        socket.emit('chat', [{
          from: 'System',
          message: 'El token no es valido'
        }]);
      }
    })

    socket.on('chatbot', async (data) => {
      const userId = user.id;
      if (!userId) {
        socket.emit('chat', [{
          from: 'System',
          message: 'El token no es valido'
        }])
      } else {
        try {
          const newMessage = {
            userId: JSON.stringify(userId),
            from: 'User',
            message: data.message,
            time: moment().format('DD-MMM-YYYY HH:mm:ss')
          };

          // await messageAPI.addMessage(newMessage.userId, newMessage.from, newMessage.message, newMessage.time);

          socket.emit('chat', [newMessage]);

          // const response = await chatbot(userId, newMessage);

          // await messageAPI.addMessage(response.userId, response.from, response.message, response.time);

          // return socket.emit('chat', [response]);
        } catch (error: any) {
          Logger.error(error.message);
          socket.emit('chat', [{
            from: 'System',
            message: 'Hubo un problema con el chatbot'
          }]);
        };
      };
    });
  })

  return io;
  
}

export default initWsServer;